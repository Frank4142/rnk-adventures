'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase';
import Image from 'next/image';

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesSnapshot = await getDocs(collection(db, 'gallery'));
      const imagesData = imagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imagesData.sort((a, b) => b.uploadedAt?.seconds - a.uploadedAt?.seconds));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Helper: upload file via API route
  const uploadFileToServer = (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return reject(new Error('User not authenticated'));

        const token = await user.getIdToken();
        const formData = new FormData();
        formData.append('file', file);

        const resp = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!resp.ok) {
          const body = await resp.json();
          return reject(new Error(body.error || 'Upload failed'));
        }

        const data = await resp.json(); // { url, path }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setUploading(true);

    try {
      for (const file of selectedFiles) {
        const { url, path } = await uploadFileToServer(file);

        // Add metadata to Firestore "gallery" collection
        await addDoc(collection(db, 'gallery'), {
          imageUrl: url,
          fileName: path, // exact Supabase path for deletion
          caption: caption || file.name,
          uploadedAt: serverTimestamp()
        });
      }

      setSelectedFiles([]);
      setCaption('');
      e.target.reset();
      fetchImages();
      alert(`Successfully uploaded ${selectedFiles.length} image(s)!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert(error.message || 'Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'gallery', image.id));

      // Delete from Supabase Storage using stored fileName
      if (image.fileName) {
        const resp = await fetch('/api/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: image.fileName }),
        });
        if (!resp.ok) {
          const body = await resp.json();
          console.log('Could not delete from storage:', body.error);
        }
      }

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  return (
    <div>
      {/* Upload Form */}
      <div className="bg-brand-cream p-6 rounded-xl mb-6">
        <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">
          Upload New Images
        </h3>

        <form onSubmit={handleUpload}>
          <div className="mb-6">
            <label className="block text-brand-dark font-semibold mb-2">
              Select Images *
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            {selectedFiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {selectedFiles.length} file(s) selected
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-brand-dark font-semibold mb-2">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              placeholder="Adventure moment at..."
            />
            <p className="text-sm text-gray-600 mt-1">
              Leave empty to use filename as caption
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : `Upload ${selectedFiles.length || ''} Image(s)`}
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div>
        <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">
          Gallery Images ({images.length})
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange mx-auto"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">No images uploaded yet. Upload your first adventure photo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(image)}
                      className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <p className="text-white text-sm font-semibold truncate">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
