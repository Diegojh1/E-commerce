import React from 'react';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="ml-2 w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout skeleton */}
      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen">
          <div className="p-6">
            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-6"></div>
            
            {/* Filtros skeleton */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-6">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-full h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contenido principal skeleton */}
        <main className="flex-1 p-6">
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de productos skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Imagen skeleton */}
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                
                {/* Contenido skeleton */}
                <div className="p-4">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-full h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-1">
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoadingState; 