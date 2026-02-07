'use client';

import { useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Njeri',
      location: 'Nairobi, Kenya',
      rating: 5,
      text: 'The Mount Kilimanjaro trek was absolutely incredible! The guides were professional, knowledgeable, and made sure everyone in our group felt safe and supported. This was truly a once-in-a-lifetime experience.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
    },
    {
      id: 2,
      name: 'Michael Kiprono',
      location: 'Nairobi, Kenya',
      rating: 5,
      text: 'RNK Adventures exceeded all expectations! From planning to execution, everything was perfect. The safari experience was magical, and I got to see wildlife I had only dreamed of.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
    },
    {
      id: 3,
      name: 'Emma Kerubo',
      location: 'Nairobi, Kenya',
      rating: 5,
      text: 'Best adventure company I have ever traveled with! The attention to detail, the personalized service, and the breathtaking destinations made this trip unforgettable. Already planning my next adventure with them!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
            What Adventurers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from real adventurers who explored with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-cream rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-orange">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div>
                  <p className="font-bold text-brand-dark text-xl">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-brand-orange hover:bg-brand-rust text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-brand-orange w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-brand-orange hover:bg-brand-rust text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
