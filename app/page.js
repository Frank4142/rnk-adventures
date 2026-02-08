'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import TourCard from '@/components/TourCard';
import GallerySection from '@/components/GallerySection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  // HARDCODED TOURS
  const tours = [
    {
      id: '1',
      title: 'Lake Naivasha Adventure',
      description: 'Explore the stunning freshwater lake surrounded by acacia forests. Experience boat rides, bird watching, and visit Crescent Island for an unforgettable walking safari among giraffes and zebras.',
      location: 'Lake Naivasha, Kenya',
      duration: '2 days',
      price: 450,
      totalPrice: 5000,
      currency: 'KSH',
      imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
      included: ['Transport', 'Photography', 'Tour Guide', 'Entrance Fees'],
      excluded: ['Food & Beverages', 'Accommodation', 'Personal Expenses']
    },
    {
      id: '2',
      title: 'Lake Victoria Expedition',
      description: 'Discover Africa\'s largest lake with fishing villages, beautiful sunsets, and rich cultural experiences. Visit local fishing communities and enjoy fresh tilapia by the shores.',
      location: 'Lake Victoria, Kenya',
      duration: '3 days',
      totalPrice: 7500,
      currency: 'KSH',
      price: 600,
      imageUrl: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=80',
      included: ['Transport', 'Photography', 'Tour Guide', 'Boat Rides'],
      excluded: ['Food & Beverages', 'Accommodation', 'Personal Expenses']
    }
  ];

  // HARDCODED GALLERY
  const gallery = [
    { id: 1, url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', caption: 'Lake Naivasha Sunset' },
    { id: 2, url: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=80', caption: 'Lake Victoria Shores' },
    { id: 3, url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', caption: 'Wildlife at Naivasha' },
    { id: 4, url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', caption: 'Boat Ride Experience' },
    { id: 5, url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80', caption: 'Crescent Island' },
    { id: 6, url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80', caption: 'Fishing Village' },
  ];

  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <main>
      <Hero />
      
      {/* Featured Tours Section */}
      <section className="section-padding bg-white" id="tours">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
              Featured Adventures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of thrilling expeditions designed for the adventurous spirit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tours.map(tour => (
              <TourCardWithModal key={tour.id} tour={tour} onViewDetails={setSelectedTour} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
            Why Adventure With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Expert Guides</h3>
              <p className="text-gray-300">Professional and experienced guides ensuring your safety and maximum enjoyment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Unique Destinations</h3>
              <p className="text-gray-300">Access to exclusive locations and hidden gems off the beaten path</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Memorable Experiences</h3>
              <p className="text-gray-300">Creating lifelong memories with carefully crafted adventure packages</p>
            </div>
          </div>
        </div>
      </section>

      <GallerySection images={gallery} loading={false} />
      
      <Testimonials />
      
      <ContactSection />

      {/* Tour Details Modal */}
      {selectedTour && (
        <TourDetailsModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
      )}
    </main>
  );
}

// Tour Card Component with View Details Button
function TourCardWithModal({ tour, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-brand-orange text-white px-4 py-2 rounded-full font-semibold">
          {tour.totalPrice} {tour.currency}
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
          
          <button 
            onClick={() => onViewDetails(tour)}
            className="bg-brand-dark hover:bg-brand-orange text-white px-6 py-2 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Tour Details Modal Component
function TourDetailsModal({ tour, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-display font-bold text-brand-dark mb-2">
            {tour.title}
          </h2>
          
          <div className="flex items-center text-gray-600 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{tour.location}</span>
            <span className="mx-3">•</span>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>

          <p className="text-gray-700 mb-6">
            {tour.description}
          </p>

          {/* Price Breakdown */}
          <div className="bg-brand-cream rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-display font-bold text-brand-dark">Total Price</h3>
              <div className="text-3xl font-bold text-brand-orange">
                {tour.totalPrice} {tour.currency}
              </div>
            </div>
            <p className="text-sm text-gray-600">Per person • {tour.duration}</p>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="text-xl font-display font-bold text-brand-dark mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What's Included
            </h3>
            <ul className="space-y-2">
              {tour.included.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What's NOT Included */}
          <div className="mb-6">
            <h3 className="text-xl font-display font-bold text-brand-dark mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Additional Fees (Not Included)
            </h3>
            <ul className="space-y-2">
              {tour.excluded.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-bold text-yellow-800 mb-1">Important Note</h4>
                <p className="text-yellow-700 text-sm">
                  Food, accommodation, and personal expenses are NOT included in the tour price. 
                  Please make your own reservations for meals and lodging at the planned destinations.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 btn-primary">
              Book Now
            </button>
            <a href="#contact" className="flex-1 btn-secondary text-center" onClick={onClose}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}