'use client';

import Image from 'next/image';

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={tour.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
          alt={tour.title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-brand-orange text-white px-4 py-2 rounded-full font-semibold">
          Ksh. {tour.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">
          {tour.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{tour.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {tour.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          
          <button className="bg-brand-dark hover:bg-brand-orange text-white px-6 py-2 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
