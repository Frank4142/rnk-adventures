'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Explore Beyond Limits',
      subtitle: 'Discover the world\'s most breathtaking adventures',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80'
    },
    {
      title: 'Conquer New Heights',
      subtitle: 'Epic mountain expeditions await',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
    },
    {
      title: 'Create Lasting Memories',
      subtitle: 'Adventures that transform lives',
      image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&q=80'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-brand-cream mb-8">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#tours" className="btn-primary">
                  Explore Tours
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-brand-orange w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
