import React, { useState } from 'react';
import { toggleFavorite, isFavorite } from '../services/favoritesService';

const ProductCard = ({ product, onFavoriteToggle, viewMode = 'grid', onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    onFavoriteToggle();
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getDiscountPercentage = (price) => {
    if (price > 100) {
      return Math.floor((price - 100) / price * 100);
    }
    return 0;
  };

  const isDiscounted = product.price > 100;

  // Vista de lista
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 cursor-pointer product-card-hover">
        <div className="flex">
          {/* Imagen del producto */}
          <div className="relative w-48 h-48 bg-gray-200 overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Badge de categoría */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Badge de descuento */}
            {isDiscounted && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full badge-animate">
                  -{getDiscountPercentage(product.price)}%
                </span>
              </div>
            )}

            {/* Botón de favorito */}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-3 ${isDiscounted ? 'right-16' : 'right-3'} p-2 rounded-full transition-all duration-200 ${
                isFavorite(product.id)
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
              }`}
              aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <svg className="w-4 h-4" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite(product.id) ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Contenido de la tarjeta */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Nombre del producto */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description || 'Descripción del producto no disponible.'}
                </p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Información adicional */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      product.isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={product.isAvailable ? 'text-green-600' : 'text-red-600'}>
                      {product.isAvailable ? 'En stock' : 'Agotado'}
                    </span>
                  </div>
                  {product.weight && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <span>{product.weight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Precio y botón */}
              <div className="flex flex-col items-end space-y-4 ml-6">
                {/* Precio */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {isDiscounted && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price + (product.price * getDiscountPercentage(product.price) / 100))}
                    </div>
                  )}
                </div>

                {/* Botón de acción */}
                <button 
                  onClick={handleViewDetailsClick}
                  className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de cuadrícula (original)
  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 cursor-pointer product-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-gray-200 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Badge de descuento */}
        {isDiscounted && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full badge-animate">
              -{getDiscountPercentage(product.price)}%
            </span>
          </div>
        )}

        {/* Botón de favorito - posicionado para no superponerse con descuento */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 ${isDiscounted ? 'right-16' : 'right-3'} p-2 rounded-full transition-all duration-200 ${
            isFavorite(product.id)
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
          }`}
          aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg className="w-4 h-4" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite(product.id) ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Precio */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {isDiscounted && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price + (product.price * getDiscountPercentage(product.price) / 100))}
            </span>
          )}
        </div>

        {/* Estado de disponibilidad */}
        <div className="flex items-center space-x-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${
            product.isAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`text-sm ${
            product.isAvailable ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.isAvailable ? 'En stock' : 'Agotado'}
          </span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Botón de acción */}
        <button 
          onClick={handleViewDetailsClick}
          className="w-full mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 