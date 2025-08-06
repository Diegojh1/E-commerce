const FAVORITES_KEY = 'ecommerce_favorites';

// Obtener favoritos del localStorage
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }
};

// Guardar favoritos en localStorage
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error al guardar favoritos:', error);
  }
};

// Agregar producto a favoritos
export const addToFavorites = (productId) => {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    const newFavorites = [...favorites, productId];
    saveFavorites(newFavorites);
    return true;
  }
  return false;
};

// Remover producto de favoritos
export const removeFromFavorites = (productId) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(id => id !== productId);
  saveFavorites(newFavorites);
  return true;
};

// Verificar si un producto está en favoritos
export const isFavorite = (productId) => {
  const favorites = getFavorites();
  return favorites.includes(productId);
};

// Toggle favorito (agregar/quitar)
export const toggleFavorite = (productId) => {
  if (isFavorite(productId)) {
    return removeFromFavorites(productId);
  } else {
    return addToFavorites(productId);
  }
}; 