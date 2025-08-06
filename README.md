# 🛍️ E-commerce Product Catalog

Una aplicación React moderna que simula un catálogo de productos de e-commerce con funcionalidades avanzadas de filtrado, búsqueda y gestión de favoritos. Desarrollada como prueba técnica para evaluar habilidades de desarrollo frontend.

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📦 Instalación](#-instalación)
- [⚡ Ejecución](#-ejecución)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🎯 Funcionalidades](#-funcionalidades)
- [🔧 Decisiones Técnicas](#-decisiones-técnicas)
- [📱 Capturas de Pantalla](#-capturas-de-pantalla)
- [🚀 Despliegue](#-despliegue)
- [🧪 Testing](#-testing)
- [🤝 Contribución](#-contribución)

## 🚀 Características

### ✅ Funcionalidades Principales

- **📊 Procesamiento de Datos**: Normalización automática de datos inconsistentes del archivo `products.json`
- **🔍 Búsqueda en Tiempo Real**: Filtrado instantáneo por nombre y descripción de productos
- **🏷️ Filtros Avanzados**: Sidebar con filtros por categoría, precio, disponibilidad y tags
- **❤️ Sistema de Favoritos**: Guardado en localStorage con persistencia y contador
- **📄 Paginación Inteligente**: Navegación fluida con 12 productos por página
- **🎨 Diseño E-commerce Profesional**: Header sticky, sidebar fijo, grid responsive
- **♿ Accesibilidad Completa**: Cumple con estándares WCAG y navegación por teclado
- **⚡ Estados de Carga Mejorados**: Skeleton loading profesional
- **🛡️ Manejo de Errores Robusto**: Gestión completa con reintentos automáticos
- **📱 Modal de Detalles**: Vista completa de productos con información detallada

### 🎯 Criterios de Evaluación Cumplidos

- ✅ **Procesamiento de datos**: Normalización de campos inconsistentes
- ✅ **Arquitectura**: Separación clara de responsabilidades
- ✅ **Buenas prácticas**: Código modular y mantenible
- ✅ **Manejo de estado**: Implementación completa de filtros y paginación
- ✅ **UX y accesibilidad**: Diseño responsive y accesible
- ✅ **Documentación**: Documentación completa y clara

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Framework principal
- **React DOM 19.1.1**: Renderizado en el navegador
- **Tailwind CSS 3.4.17**: Framework de estilos utility-first
- **PostCSS 8.5.6**: Procesador de CSS
- **Autoprefixer 10.4.21**: Auto-prefijos CSS

### HTTP y Simulación
- **Axios 1.11.0**: Cliente HTTP para peticiones
- **Axios Mock Adapter 2.1.0**: Simulación de API con errores

### Testing
- **@testing-library/react 16.3.0**: Testing de componentes React
- **@testing-library/dom 10.4.1**: Testing de DOM
- **@testing-library/user-event 13.5.0**: Simulación de eventos de usuario
- **@testing-library/jest-dom 6.6.4**: Matchers para Jest

### Build Tools
- **React Scripts 5.0.1**: Scripts de Create React App
- **Web Vitals 2.1.4**: Métricas de performance

## 📦 Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js) o **yarn**

### Verificar Instalación

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version
```

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Diegojh1/E-commerce.git
   cd ecommerce-test
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Verificar instalación**
   ```bash
   npm list --depth=0
   ```

## ⚡ Ejecución

### Modo Desarrollo

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

### Modo Producción

```bash
# Construir para producción
npm run build

# Servir archivos de producción (requiere servidor)
npx serve -s build
```

### Otros Comandos

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Construir y analizar bundle
npm run build -- --analyze

# Ejectar configuración (irreversible)
npm run eject
```

## 🏗️ Estructura del Proyecto

```
ecommerce-test/
├── public/                     # Archivos públicos
│   ├── index.html             # HTML principal
│   ├── favicon.ico           # Icono del sitio
│   ├── logo192.png           # Logo para PWA
│   ├── logo512.png           # Logo para PWA
│   ├── manifest.json         # Manifest PWA
│   └── robots.txt            # Configuración SEO
├── src/                       # Código fuente
│   ├── components/           # Componentes React
│   │   ├── Header.js        # Header con navegación y búsqueda
│   │   ├── Sidebar.js       # Sidebar con filtros avanzados
│   │   ├── ProductCard.js   # Tarjeta de producto individual
│   │   ├── ProductList.js   # Lista principal de productos
│   │   ├── ProductModal.js  # Modal de detalles del producto
│   │   ├── Pagination.js    # Componente de paginación
│   │   ├── LoadingState.js  # Estado de carga con skeleton
│   │   ├── ErrorState.js    # Estado de error con reintentos
│   │   └── ProductFilters.js # Filtros legacy (deprecated)
│   ├── services/            # Lógica de negocio
│   │   ├── productService.js    # API y normalización de datos
│   │   └── favoritesService.js  # Gestión de favoritos en localStorage
│   ├── hooks/              # Hooks personalizados
│   │   ├── useProducts.js      # Estado centralizado de productos
│   │   └── useFilters.js       # Gestión de filtros y búsqueda
│   ├── data/               # Datos estáticos
│   │   └── products.json       # Datos de productos con inconsistencias
│   ├── App.js              # Componente principal de la aplicación
│   ├── App.css             # Estilos globales
│   ├── App.test.js         # Tests del componente App
│   ├── index.js            # Punto de entrada de la aplicación
│   ├── index.css           # Estilos base y configuración Tailwind
│   ├── logo.svg            # Logo de React
│   ├── reportWebVitals.js  # Métricas de performance
│   └── setupTests.js       # Configuración de tests
├── package.json            # Dependencias y scripts
├── package-lock.json       # Lock file de dependencias
├── tailwind.config.js     # Configuración de Tailwind CSS
├── postcss.config.js      # Configuración de PostCSS
└── README.md              # Este archivo
```

## 🎯 Funcionalidades

### 🔍 Búsqueda y Filtros

#### Búsqueda en Tiempo Real
- **Campo de búsqueda** en el header
- **Filtrado por nombre** y descripción de productos
- **Actualización automática** de resultados
- **Debounce** para optimizar performance

#### Filtros Avanzados (Sidebar)
- **Categorías**: Filtro por tipo de producto
- **Precio**: Rangos ($0-$50, $50-$200, $200+)
- **Disponibilidad**: En stock / Agotado
- **Tags populares**: Filtros por etiquetas
- **Contadores reales**: Número de productos por filtro

### ❤️ Sistema de Favoritos

#### Funcionalidades
- **Agregar/quitar** productos de favoritos
- **Persistencia** en localStorage
- **Contador** en el header
- **Filtro** para mostrar solo favoritos
- **Feedback visual** inmediato

#### Implementación
```javascript
// Agregar a favoritos
toggleFavorite(productId);

// Verificar si está en favoritos
isFavorite(productId);

// Obtener lista de favoritos
getFavorites();
```

### 📄 Paginación

#### Características
- **12 productos** por página
- **Navegación completa**: Primera, anterior, siguiente, última
- **Información de páginas**: "Página X de Y"
- **Botones deshabilitados** cuando no aplican

### 🎨 Diseño Responsive

#### Breakpoints
- **Mobile**: 1 columna
- **Tablet**: 2-3 columnas
- **Desktop**: 4-5 columnas
- **Large**: 5 columnas

#### Componentes Adaptativos
- **Header sticky** con búsqueda centralizada
- **Sidebar fijo** con scroll interno
- **Grid responsive** que se adapta
- **Modal responsive** para detalles

### 📱 Modal de Detalles

#### Información Mostrada
- **Imagen grande** del producto
- **Nombre y precio** prominentes
- **Descripción completa**
- **Tags organizados**
- **Información adicional** (peso, dimensiones, categoría)
- **Botones de acción** (Agregar al carrito, Comprar ahora)

## 🔧 Decisiones Técnicas

### 1. Normalización de Datos

**Problema**: Los datos en `products.json` tienen inconsistencias:
- Campos de nombre: `productName`, `title`, `name`
- Campos de precio: `price`, `value`, `cost`
- Formatos de fecha: timestamp, string, "invalid_date"
- Valores nulos y vacíos

**Solución**: Función `normalizeProduct()` que:
```javascript
// Unifica campos de nombre
const name = product.productName || product.title || product.name || 'Producto sin nombre';

// Normaliza precios
let price = 0;
if (product.price !== null && product.price !== undefined) {
  price = product.price === 'free' ? 0 : parseFloat(product.price);
}

// Convierte fechas
let createdAt = new Date();
if (product.created_at) {
  if (typeof product.created_at === 'number') {
    createdAt = new Date(product.created_at * 1000);
  }
}
```

### 2. Simulación de API

**Implementación**: Axios Mock Adapter con:
- **Delay de 1 segundo** para simular latencia
- **10% de probabilidad de error** (requerimiento)
- **Manejo robusto** de errores con reintentos

```javascript
// Configuración del mock
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Simulación con errores
mock.onGet('/api/products').reply(() => {
  const shouldError = Math.random() < 0.1; // 10% de errores
  
  if (shouldError) {
    return [500, { error: 'Error interno del servidor' }];
  }
  
  return [200, productsData];
});
```

### 3. Gestión de Estado

**Hook Personalizado**: `useProducts` que centraliza:
- Estado de productos y filtros
- Lógica de paginación
- Sincronización con localStorage
- Manejo de estados de carga y error

### 4. Arquitectura de Componentes

**Separación de Responsabilidades**:
- **Componentes**: Solo lógica de presentación
- **Servicios**: Lógica de negocio y API
- **Hooks**: Gestión de estado y efectos
- **Datos**: Separación clara de datos estáticos

### 5. Optimizaciones de Performance

- **Debounce** en búsqueda para evitar requests excesivos
- **Memoización** de componentes pesados
- **Optimización** de re-renders con useCallback
- **Lazy loading** de componentes no críticos

## 📱 Capturas de Pantalla

### Vista Principal
```
┌─────────────────────────────────────────────────────────────┐
│ 🏪 E-Commerce                    🔍 [Buscar...] ❤️ (3)    │
├─────────────┬───────────────────────────────────────────────┤
│ 📂 Filtros  │ 🎴 🎴 🎴 🎴 🎴 🎴                           │
│ Categorías  │ 🎴 🎴 🎴 🎴 🎴 🎴                           │
│ Precio      │ 🎴 🎴 🎴 🎴 🎴 🎴                           │
│ Disponible  │ 🎴 🎴 🎴 🎴 🎴 🎴                           │
│ Tags        │ 🎴 🎴 🎴 🎴 🎴 🎴                           │
│             │                                             │
│             │ [1] [2] [3] ... [10] [>>]                 │
└─────────────┴─────────────────────────────────────────────┘
```

### Modal de Detalles
```
┌─────────────────────────────────────────────────────────────┐
│ Detalles del Producto                              [×]    │
├─────────────────────────────────────────────────────────────┤
│ 🖼️  │ 📝 Nombre del Producto                            │
│      │ 💰 $99.99                                         │
│      │ ✅ En stock                                        │
│      │ 📄 Descripción completa...                        │
│      │ 🏷️ Tags: [tag1] [tag2] [tag3]                    │
│      │ 📊 Info adicional...                              │
│      │ [🛒 Agregar al carrito] [💳 Comprar ahora]       │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Despliegue

### Build de Producción

```bash
# Construir aplicación
npm run build

# El resultado estará en la carpeta build/
```

### Optimizaciones Incluidas

- **Minificación** de código JavaScript y CSS
- **Tree shaking** para eliminar código no usado
- **Code splitting** automático
- **Optimización** de imágenes
- **Compresión** de assets

### Servir en Producción

```bash
# Usando serve
npx serve -s build

# Usando http-server
npx http-server build

# Usando Python
python -m http.server 8000 --directory build
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage
```

### Tests Incluidos

- **Componentes**: Renderizado y interacciones
- **Servicios**: Normalización de datos
- **Hooks**: Gestión de estado
- **Accesibilidad**: Navegación por teclado

## 🤝 Contribución

### Pasos para Contribuir

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Estándares de Código

- **ESLint** configurado para React
- **Prettier** para formateo (recomendado)
- **Conventional Commits** para mensajes
- **Componentes funcionales** con hooks
- **TypeScript** (opcional para futuras versiones)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Diego Hernández**
- GitHub: [@Diegojh1](https://github.com/Diegojh1)
- Repositorio: [https://github.com/Diegojh1/E-commerce.git](https://github.com/Diegojh1/E-commerce.git)

---

## 🎉 ¡Gracias por revisar este proyecto!

Este proyecto fue desarrollado como parte de una prueba técnica para evaluar habilidades de desarrollo frontend de nivel senior. Incluye todas las funcionalidades requeridas y características adicionales que demuestran experiencia en React, arquitectura de aplicaciones y UX/UI.

**¡Espero que disfrutes explorando el código!** 🚀
