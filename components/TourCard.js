'use client';

import { useState } from 'react';
import Image from 'next/image';
import TourDetailsModal from './TourDetailsModal';

export default function TourCard({ tour }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-64">
          <Image
            src={tour.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
            alt={tour.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-brand-orange text-white px-4 py-2 rounded-full font-bold shadow-lg">
            Kes. {tour.price?.toLocaleString()}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-brand-dark mb-3">
            {tour.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {tour.description}
          </p>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center mr-4">
              <svg className="w-4 h-4 mr-1 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tour.location}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.duration}
            </span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-brand-dark hover:bg-brand-rust text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      <TourDetailsModal 
        tour={tour} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}