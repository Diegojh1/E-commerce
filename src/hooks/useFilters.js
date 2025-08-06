import { useState, useCallback } from 'react';

export const useFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

  // Función para limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedAvailability('all');
    setSelectedTags([]);
  }, []);

  // Función para aplicar filtros a los productos
  const applyFilters = useCallback((products) => {
    let filteredProducts = [...products];

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filtro por rango de precio
    if (selectedPriceRange !== 'all') {
      switch (selectedPriceRange) {
        case 'free':
          filteredProducts = filteredProducts.filter(product => product.price === 0);
          break;
        case '0-50':
          filteredProducts = filteredProducts.filter(product => product.price > 0 && product.price <= 50);
          break;
        case '50-200':
          filteredProducts = filteredProducts.filter(product => product.price > 50 && product.price <= 200);
          break;
        case '200+':
          filteredProducts = filteredProducts.filter(product => product.price > 200);
          break;
        default:
          break;
      }
    }

    // Filtro por disponibilidad
    if (selectedAvailability !== 'all') {
      switch (selectedAvailability) {
        case 'in_stock':
          filteredProducts = filteredProducts.filter(product => product.isAvailable);
          break;
        case 'out_of_stock':
          filteredProducts = filteredProducts.filter(product => !product.isAvailable);
          break;
        default:
          break;
      }
    }

    // Filtro por tags
    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    return filteredProducts;
  }, [selectedCategory, selectedPriceRange, selectedAvailability, selectedTags]);

  // Función para toggle de tags
  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  // Función para cambiar modo de vista
  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  return {
    // Estado de filtros
    selectedCategory,
    selectedPriceRange,
    selectedAvailability,
    selectedTags,
    viewMode,

    // Funciones
    setSelectedCategory,
    setSelectedPriceRange,
    setSelectedAvailability,
    toggleTag,
    toggleViewMode,
    clearAllFilters,
    applyFilters
  };
}; 