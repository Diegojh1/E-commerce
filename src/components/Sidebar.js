import React from 'react';

const Sidebar = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedPriceRange,
  setSelectedPriceRange,
  selectedAvailability,
  setSelectedAvailability,
  selectedTags,
  toggleTag,
  categories, 
  totalProducts,
  onClearFilters,
  allProducts // Agregar todos los productos para calcular contadores reales
}) => {
  // Calcular contadores reales basados en los productos
  const getCategoryCount = (category) => {
    if (category === 'all') return allProducts.length;
    return allProducts.filter(product => product.category === category).length;
  };

  const getPriceRangeCount = (range) => {
    switch (range) {
      case 'free':
        return allProducts.filter(product => product.price === 0).length;
      case '0-50':
        return allProducts.filter(product => product.price > 0 && product.price <= 50).length;
      case '50-200':
        return allProducts.filter(product => product.price > 50 && product.price <= 200).length;
      case '200+':
        return allProducts.filter(product => product.price > 200).length;
      default:
        return allProducts.length;
    }
  };

  const getAvailabilityCount = (availability) => {
    switch (availability) {
      case 'in_stock':
        return allProducts.filter(product => product.isAvailable).length;
      case 'out_of_stock':
        return allProducts.filter(product => !product.isAvailable).length;
      default:
        return allProducts.length;
    }
  };

  const getTagCount = (tag) => {
    return allProducts.filter(product => 
      product.tags && product.tags.includes(tag)
    ).length;
  };

  const popularTags = ['popular', 'eco', 'new', 'sale'];

  return (
    <aside className="sidebar-fixed sidebar">
      <div className="p-6">
        {/* Header del sidebar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Filtros</h2>
          <p className="text-sm text-gray-600">
            {totalProducts} productos encontrados
          </p>
        </div>

        {/* Botón limpiar filtros */}
        {(selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedAvailability !== 'all' || selectedTags.length > 0) && (
          <button
            onClick={onClearFilters}
            className="w-full mb-6 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            Limpiar filtros
          </button>
        )}

        {/* Filtro por categoría */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Categorías</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Todas las categorías</span>
                <span className="text-xs text-gray-500">{getCategoryCount('all')}</span>
              </div>
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-xs text-gray-500">{getCategoryCount(category)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de precio */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Precio</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedPriceRange('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPriceRange === 'all'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Todos los precios</span>
                <span className="text-xs text-gray-500">{getPriceRangeCount('all')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedPriceRange('free')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPriceRange === 'free'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Gratis</span>
                <span className="text-xs text-gray-500">{getPriceRangeCount('free')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedPriceRange('0-50')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPriceRange === '0-50'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>$0 - $50</span>
                <span className="text-xs text-gray-500">{getPriceRangeCount('0-50')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedPriceRange('50-200')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPriceRange === '50-200'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>$50 - $200</span>
                <span className="text-xs text-gray-500">{getPriceRangeCount('50-200')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedPriceRange('200+')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPriceRange === '200+'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>$200+</span>
                <span className="text-xs text-gray-500">{getPriceRangeCount('200+')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Filtros de disponibilidad */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Disponibilidad</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedAvailability('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedAvailability === 'all'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Todos</span>
                <span className="text-xs text-gray-500">{getAvailabilityCount('all')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedAvailability('in_stock')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedAvailability === 'in_stock'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>En stock</span>
                <span className="text-xs text-gray-500">{getAvailabilityCount('in_stock')}</span>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedAvailability('out_of_stock')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedAvailability === 'out_of_stock'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Agotado</span>
                <span className="text-xs text-gray-500">{getAvailabilityCount('out_of_stock')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tags populares */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Tags populares</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => {
              const count = getTagCount(tag);
              if (count === 0) return null; // No mostrar tags sin productos
              
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 