import { useState, useEffect, useCallback } from 'react';
import { getProducts, searchProductsByName, getUniqueCategories } from '../services/productService';
import { getFavorites } from '../services/favoritesService';
import { useFilters } from './useFilters';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const ITEMS_PER_PAGE = 12;

  // Usar el hook de filtros
  const {
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
    clearAllFilters,
    applyFilters
  } = useFilters();

  // Cargar productos
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const normalizedProducts = await getProducts();
      setProducts(normalizedProducts);
      setCategories(getUniqueCategories(normalizedProducts));
    } catch (err) {
      setError(err.message || 'Error al cargar los productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar favoritos
  const loadFavorites = useCallback(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  // Actualizar favoritos
  const updateFavorites = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Toggle para mostrar solo favoritos
  const toggleFavorites = useCallback(() => {
    setShowOnlyFavorites(prev => !prev);
    setCurrentPage(1); // Resetear a la primera página
  }, []);

  // Aplicar filtros y búsqueda
  const filterProducts = useCallback(() => {
    let filtered = [...products];

    // Aplicar filtro de favoritos primero
    if (showOnlyFavorites) {
      const favoriteIds = getFavorites();
      filtered = filtered.filter(product => favoriteIds.includes(product.id));
    }

    // Aplicar búsqueda por texto
    if (searchTerm.trim()) {
      filtered = searchProductsByName(filtered, searchTerm);
    }

    // Aplicar filtros avanzados
    filtered = applyFilters(filtered);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
  }, [products, searchTerm, applyFilters, showOnlyFavorites]);

  // Efectos
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Limpiar todos los filtros
  const handleClearFilters = useCallback(() => {
    clearAllFilters();
    setSearchTerm('');
    setShowOnlyFavorites(false);
  }, [clearAllFilters]);

  return {
    // Estado de productos
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    loading,
    error,
    
    // Búsqueda
    searchTerm,
    setSearchTerm,
    
    // Filtros
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
    
    // Favoritos
    showOnlyFavorites,
    toggleFavorites,
    
    // Paginación
    currentPage,
    totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    hasPreviousPage,
    hasNextPage,
    
    // Favoritos
    favorites,
    updateFavorites,
    
    // Categorías
    categories,
    
    // Funciones
    loadProducts,
    handleClearFilters,
    
    // Todos los productos para calcular contadores
    allProducts: products
  };
}; 