'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GallerySection({ images, loading }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Fallback images if database is empty
  const fallbackImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Mountain Peak' },
    { id: 2, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Summit View' },
    { id: 3, url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80', caption: 'Adventure Trail' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80', caption: 'Camping Under Stars' },
    { id: 5, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', caption: 'Lake Sunset' },
    { id: 6, url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80', caption: 'Forest Path' },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <>
      <section className="section-padding bg-brand-cream" id="gallery">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
              Adventure Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Captured moments from our recent expeditions and adventures
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative h-64 overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.url || image.imageUrl}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white text-sm font-semibold">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-brand-orange"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage.url || selectedImage.imageUrl}
              alt={selectedImage.caption || 'Gallery image'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
