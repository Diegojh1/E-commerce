import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onPreviousPage, 
  onNextPage,
  hasPreviousPage,
  hasNextPage 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si hay 7 o menos
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas alrededor de la página actual
      const start = Math.max(1, currentPage - 3);
      const end = Math.min(totalPages, currentPage + 3);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      {/* Información de páginas */}
      <div className="flex items-center text-sm text-gray-700">
        <span>
          Página <span className="font-medium">{currentPage}</span> de{' '}
          <span className="font-medium">{totalPages}</span>
        </span>
      </div>

      {/* Navegación */}
      <div className="flex items-center space-x-1">
        {/* Botón Primera página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          aria-label="Primera página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Botón Anterior */}
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            hasPreviousPage
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Página anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Números de página */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    page === currentPage
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label={`Ir a página ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            hasNextPage
              ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Página siguiente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón Última página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          aria-label="Última página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Información adicional */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Mostrando 12 productos por página</span>
      </div>
    </div>
  );
};

export default Pagination; 