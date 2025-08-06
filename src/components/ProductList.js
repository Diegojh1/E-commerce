import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Pagination from './Pagination';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import Header from './Header';
import Sidebar from './Sidebar';
import { useProducts } from '../hooks/useProducts';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    selectedPriceRange,
    selectedAvailability,
    selectedTags,
    viewMode,
    setSelectedCategory,
    setSelectedPriceRange,
    setSelectedAvailability,
    toggleTag,
    toggleViewMode,
    currentPage,
    totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    loadProducts,
    updateFavorites,
    categories,
    totalProducts,
    hasNextPage,
    hasPreviousPage,
    handleClearFilters,
    showOnlyFavorites,
    toggleFavorites,
    allProducts
  } = useProducts();

  const handleFavoriteToggle = () => {
    updateFavorites();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // La búsqueda se actualiza automáticamente con el useEffect
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadProducts} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onToggleFavorites={toggleFavorites}
        showOnlyFavorites={showOnlyFavorites}
      />

      {/* Layout principal */}
      <div className="layout-container">
        {/* Sidebar */}
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          categories={categories}
          totalProducts={totalProducts}
          onClearFilters={handleClearFilters}
          allProducts={allProducts}
        />

        {/* Contenido principal */}
        <main className="main-content p-6">
          {/* Breadcrumb y controles */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                        Inicio
                      </a>
                    </li>
                    <li>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </li>
                    <li>
                      <span className="text-gray-900 text-sm font-medium">
                        {showOnlyFavorites ? 'Favoritos' : 'Productos'}
                      </span>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                  {showOnlyFavorites ? 'Mis Favoritos' : 'Catálogo de Productos'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {totalProducts} productos encontrados
                </p>
              </div>

              {/* Controles de vista */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Vista:</span>
                  <button 
                    onClick={toggleViewMode}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'list' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Vista de lista"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={toggleViewMode}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'grid' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Vista de cuadrícula"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          {products.length > 0 ? (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'list' 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
              }`}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onFavoriteToggle={handleFavoriteToggle}
                    viewMode={viewMode}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Paginación */}
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onPreviousPage={goToPreviousPage}
                  onNextPage={goToNextPage}
                  hasPreviousPage={hasPreviousPage}
                  hasNextPage={hasNextPage}
                />
              </div>
            </>
          ) : (
            /* Estado sin resultados */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {showOnlyFavorites ? 'No tienes favoritos' : 'No se encontraron productos'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {showOnlyFavorites 
                  ? 'Agrega productos a tus favoritos para verlos aquí.'
                  : 'Intenta ajustar los filtros o términos de búsqueda para encontrar lo que buscas.'
                }
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {showOnlyFavorites ? 'Ver todos los productos' : 'Limpiar filtros'}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal de detalles del producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

export default ProductList; 