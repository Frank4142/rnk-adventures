'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-dark shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-full p-1">
              <div className="w-full h-full bg-brand-dark rounded-full flex items-center justify-center">
                <span className="text-brand-orange font-display font-bold text-xl">RNK</span>
              </div>
            </div>
            <span className="text-white font-display font-bold text-xl hidden sm:block">
              RNK Adventures
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#tours" className="text-white hover:text-brand-orange transition-colors">
              Tours
            </Link>
            <Link href="/#gallery" className="text-white hover:text-brand-orange transition-colors">
              Gallery
            </Link>
            <Link href="/#testimonials" className="text-white hover:text-brand-orange transition-colors">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-white hover:text-brand-orange transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="btn-primary">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-dark py-4 border-t border-brand-orange">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#tours"
                className="text-white hover:text-brand-orange transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <Link
                href="/#gallery"
                className="text-white hover:text-brand-orange transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/#testimonials"
                className="text-white hover:text-brand-orange transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                className="text-white hover:text-brand-orange transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="text-white hover:text-brand-orange transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
