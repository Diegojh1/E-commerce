import React from 'react';
import { toggleFavorite, isFavorite } from '../services/favoritesService';

const ProductModal = ({ product, isOpen, onClose, onFavoriteToggle }) => {
  if (!isOpen || !product) return null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    onFavoriteToggle();
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay modal-backdrop flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-dialog modal-content">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Detalles del Producto</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                    {product.category}
                  </span>
                </div>

                {isDiscounted && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-sm font-medium bg-red-500 text-white rounded-full badge-animate">
                      -{getDiscountPercentage(product.price)}%
                    </span>
                  </div>
                )}

                {/* Botón de favorito */}
                <button
                  onClick={handleFavoriteClick}
                  className={`absolute top-4 ${isDiscounted ? 'right-20' : 'right-4'} p-3 rounded-full transition-all duration-200 ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
                  }`}
                  aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <svg className="w-5 h-5" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite(product.id) ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              {/* Nombre y precio */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {isDiscounted && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price + (product.price * getDiscountPercentage(product.price) / 100))}
                    </span>
                  )}
                </div>
              </div>

              {/* Estado de disponibilidad */}
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  product.isAvailable ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-lg font-medium ${
                  product.isAvailable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.isAvailable ? 'En stock' : 'Agotado'}
                </span>
              </div>

              {/* Descripción */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h4>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'Descripción detallada del producto no disponible.'}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Información Adicional</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Peso */}
                  {product.weight && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Peso</p>
                        <p className="font-medium text-gray-900">{product.weight}</p>
                      </div>
                    </div>
                  )}

                  {/* Dimensiones */}
                  {product.dimensions && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Dimensiones</p>
                        <p className="font-medium text-gray-900">
                          {product.dimensions.width !== 'N/A' ? `${product.dimensions.width}cm` : 'N/A'} × 
                          {product.dimensions.height !== 'N/A' ? `${product.dimensions.height}cm` : 'N/A'} × 
                          {product.dimensions.depth !== 'N/A' ? `${product.dimensions.depth}cm` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Categoría */}
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Categoría</p>
                      <p className="font-medium text-gray-900">{product.category}</p>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Estado</p>
                      <p className="font-medium text-gray-900">{product.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  Agregar al carrito
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 