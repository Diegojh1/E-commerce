import React, { useState } from 'react';
import { getFavorites } from '../services/favoritesService';

const Header = ({ searchTerm, setSearchTerm, onSearchSubmit, onToggleFavorites, showOnlyFavorites }) => {
  const favorites = getFavorites();

  const handleFavoriteClick = () => {
    onToggleFavorites();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">E-Commerce</h1>
            </div>
          </div>

          {/* Búsqueda central */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={onSearchSubmit} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar productos..."
                />
              </div>
            </form>
          </div>

          {/* Favoritos */}
          <div className="flex items-center">
            <button 
              onClick={handleFavoriteClick}
              className={`relative p-2 rounded-lg transition-colors duration-200 ${
                showOnlyFavorites 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
              title={showOnlyFavorites ? 'Mostrar todos los productos' : 'Mostrar solo favoritos'}
            >
              <svg className="w-6 h-6" fill={showOnlyFavorites ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 