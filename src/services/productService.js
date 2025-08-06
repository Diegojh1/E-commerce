import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import productsData from '../data/products.json';

// Configurar mock de axios
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Simular API con 10% de errores
mock.onGet('/api/products').reply(() => {
  const shouldError = Math.random() < 0.1; // 10% de probabilidad de error
  
  if (shouldError) {
    return [500, { error: 'Error interno del servidor' }];
  }
  
  return [200, productsData];
});

// Función para normalizar los datos de productos
export const normalizeProduct = (product) => {
  // Normalizar nombre del producto
  const name = product.productName || product.title || product.name || 'Producto sin nombre';
  
  // Normalizar precio
  let price = 0;
  if (product.price !== null && product.price !== undefined) {
    price = product.price === 'free' ? 0 : parseFloat(product.price);
  } else if (product.value !== null && product.value !== undefined) {
    price = product.value === 'free' ? 0 : parseFloat(product.value);
  } else if (product.cost !== null && product.cost !== undefined) {
    price = product.cost === 'free' ? 0 : parseFloat(product.cost);
  }
  
  // Normalizar disponibilidad
  const isAvailable = product.isAvailable === true || product.isAvailable === 'yes';
  
  // Normalizar fecha
  let createdAt = new Date();
  if (product.created_at) {
    if (typeof product.created_at === 'number') {
      createdAt = new Date(product.created_at * 1000);
    } else if (typeof product.created_at === 'string') {
      if (product.created_at === 'invalid_date') {
        createdAt = new Date();
      } else {
        createdAt = new Date(product.created_at);
      }
    }
  }
  
  // Normalizar tags (filtrar valores null)
  const tags = (product.metadata?.tags || []).filter(tag => tag !== null);
  
  // Normalizar dimensiones
  const dimensions = {
    width: product.details?.dimensions?.width || 'N/A',
    height: product.details?.dimensions?.height || 'N/A',
    depth: product.details?.dimensions?.depth || 'N/A'
  };
  
  return {
    id: product.metadata?.id || Math.random().toString(36).substr(2, 9),
    name,
    price,
    category: product.category || 'Sin categoría',
    description: product.details?.description || 'Sin descripción',
    weight: product.details?.weight || 'N/A',
    dimensions,
    createdAt,
    isAvailable,
    status: product.status || 'unknown',
    tags,
    originalData: product // Mantener datos originales para referencia
  };
};

// Función para obtener productos
export const getProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    const rawProducts = response.data;
    
    // Verificar que los datos son un array
    if (!Array.isArray(rawProducts)) {
      throw new Error('Los datos recibidos no son un array válido');
    }
    
    // Normalizar todos los productos
    const normalizedProducts = rawProducts.map(normalizeProduct);
    
    return normalizedProducts;
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw new Error(error.response?.data?.error || 'Error al cargar los productos');
  }
};

// Función para filtrar productos por categoría
export const filterProductsByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Función para buscar productos por nombre
export const searchProductsByName = (products, searchTerm) => {
  if (!searchTerm) return products;
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
};

// Función para obtener categorías únicas
export const getUniqueCategories = (products) => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)].sort();
}; 