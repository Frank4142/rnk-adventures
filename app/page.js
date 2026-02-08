'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Hero from '@/components/Hero';
import TourCard from '@/components/TourCard';
import GallerySection from '@/components/GallerySection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch featured tours
      const toursQuery = query(
        collection(db, 'tours'),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      const toursSnapshot = await getDocs(toursQuery);
      const toursData = toursSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTours(toursData);

      // Fetch gallery images
      const galleryQuery = query(
        collection(db, 'gallery'),
        orderBy('uploadedAt', 'desc'),
        limit(12)
      );
      const gallerySnapshot = await getDocs(galleryQuery);
      const galleryData = gallerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGallery(galleryData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
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

      <GallerySection images={gallery} loading={loading} />
      
      <Testimonials />
      
      <ContactSection />
    </main>
  );
}
