'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase';

export default function TourManager() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    price: '',
    imageUrl: '',
    fileName: ''
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const toursSnapshot = await getDocs(collection(db, 'tours'));
      const toursData = toursSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTours(toursData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setLoading(false);
    }
  };

  const uploadFileToServer = (file, onProgress) => {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return reject(new Error('User not authenticated'));

        const token = await user.getIdToken();
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload', true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const pct = Math.round((event.loaded / event.total) * 100);
            onProgress?.(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const resp = JSON.parse(xhr.responseText);
              resolve(resp); // { url, path }
            } catch (err) {
              reject(new Error('Invalid JSON response from upload endpoint'));
            }
          } else {
            let errMsg = `Upload failed with status ${xhr.status}`;
            try {
              const body = JSON.parse(xhr.responseText);
              errMsg = body.error || errMsg;
            } catch (e) {}
            reject(new Error(errMsg));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(formData);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = formData.imageUrl;
      let fileName = formData.fileName;

      if (imageFile) {
        const { url, path } = await uploadFileToServer(imageFile, setUploadProgress);
        imageUrl = url;
        fileName = path;
      }

      const tourData = {
        ...formData,
        imageUrl,
        fileName,
        price: Number(formData.price),
        updatedAt: serverTimestamp()
      };

      if (editingTour) {
        await updateDoc(doc(db, 'tours', editingTour.id), tourData);
      } else {
        await addDoc(collection(db, 'tours'), {
          ...tourData,
          createdAt: serverTimestamp()
        });
      }

      setFormData({
        title: '',
        description: '',
        location: '',
        duration: '',
        price: '',
        imageUrl: '',
        fileName: ''
      });
      setImageFile(null);
      setEditingTour(null);
      setShowForm(false);
      fetchTours();
    } catch (error) {
      console.error('Error saving tour:', error);
      alert(error.message || 'Error saving tour. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      location: tour.location,
      duration: tour.duration,
      price: tour.price,
      imageUrl: tour.imageUrl,
      fileName: tour.fileName || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (tour) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await deleteDoc(doc(db, 'tours', tour.id));

        if (tour.fileName) {
          const auth = getAuth();
          const user = auth.currentUser;
          const token = user ? await user.getIdToken() : null;

          const resp = await fetch('/api/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ path: tour.fileName }),
          });

          if (!resp.ok) {
            const body = await resp.json();
            console.log('Could not delete from storage:', body.error);
          }
        }

        fetchTours();
      } catch (error) {
        console.error('Error deleting tour:', error);
        alert('Error deleting tour. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTour(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      duration: '',
      price: '',
      imageUrl: '',
      fileName: ''
    });
    setImageFile(null);
  };


  return (
    <div>
      {/* Add Tour Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary mb-6 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Tour
        </button>
      )}

      {/* Tour Form */}
      {showForm && (
        <div className="bg-brand-cream p-6 rounded-xl mb-6">
          <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">
            {editingTour ? 'Edit Tour' : 'Add New Tour'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-brand-dark font-semibold mb-2">
                  Tour Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Mount Kilimanjaro Trek"
                />
              </div>

              <div>
                <label className="block text-brand-dark font-semibold mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Tanzania"
                />
              </div>

              <div>
                <label className="block text-brand-dark font-semibold mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="7 days"
                />
              </div>

              <div>
                <label className="block text-brand-dark font-semibold mb-2">
                  Price (KES) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="1500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-brand-dark font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                  placeholder="Describe the tour experience..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-brand-dark font-semibold mb-2">
                  Tour Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                {formData.imageUrl && !imageFile && (
                  <div className="mt-2">
                    <img src={formData.imageUrl} alt="Current" className="h-32 rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={uploading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Saving...' : (editingTour ? 'Update Tour' : 'Add Tour')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tours List */}
      <div>
        <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">
          Existing Tours ({tours.length})
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange mx-auto"></div>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">No tours added yet. Click "Add New Tour" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <img
                    src={tour.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-brand-orange text-white px-3 py-1 rounded-full font-semibold">
                    ${tour.price}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-display font-bold text-lg text-brand-dark mb-2">
                    {tour.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="mr-4">📍 {tour.location}</span>
                    <span>⏱️ {tour.duration}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tour)}
                      className="flex-1 bg-brand-orange hover:bg-brand-rust text-white py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
