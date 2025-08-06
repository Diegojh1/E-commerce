import React from 'react';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        {/* Icono de error */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        {/* Mensaje de error */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Error de conexión
          </h3>
          <p className="text-gray-600 mb-4">
            {error || 'No pudimos cargar los productos. Verifica tu conexión a internet e intenta de nuevo.'}
          </p>
          
          {/* Código de error */}
          {error && (
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 font-mono">
                Error: {error}
              </p>
            </div>
          )}
        </div>
        
        {/* Acciones */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reintentar
            </button>
          )}
          
          <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Volver al inicio
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Si el problema persiste, contacta con soporte técnico
          </p>
          <div className="mt-2 flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>•</span>
            <span>Verifica tu conexión</span>
            <span>•</span>
            <span>Actualiza la página</span>
            <span>•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState; 