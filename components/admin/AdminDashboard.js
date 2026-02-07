'use client';

import { useState } from 'react';
import TourManager from './TourManager';
import GalleryManager from './GalleryManager';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('tours');

  return (
    <div className="container-custom section-padding">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-dark">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage your adventure content</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('tours')}
              className={`px-8 py-4 font-semibold transition-colors ${
                activeTab === 'tours'
                  ? 'text-brand-orange border-b-2 border-brand-orange bg-brand-cream'
                  : 'text-gray-600 hover:text-brand-dark'
              }`}
            >
              Manage Tours
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-8 py-4 font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'text-brand-orange border-b-2 border-brand-orange bg-brand-cream'
                  : 'text-gray-600 hover:text-brand-dark'
              }`}
            >
              Manage Gallery
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'tours' && <TourManager />}
          {activeTab === 'gallery' && <GalleryManager />}
        </div>
      </div>
    </div>
  );
}
