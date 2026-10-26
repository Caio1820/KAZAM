import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, X } from 'lucide-react';
import { Product, FilterState } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { CATEGORIES } from '../../data/categories';

interface CatalogViewProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onOpenFastQuote: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectProduct,
  onAddToCart,
  onOpenFastQuote,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter products logic
  const filteredProducts = products.filter(product => {
    // Category match
    if (filters.category && product.category !== filters.category) return false;
    // Subcategory match
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
    // Brand match
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    // Finish match
    if (filters.finish.length > 0 && (!product.finish || !filters.finish.includes(product.finish))) return false;
    // Usage match
    if (filters.usage.length > 0 && (!product.usage || !filters.usage.includes(product.usage))) return false;
    // Price match
    if (product.pixPrice > filters.maxPrice) return false;
    // In stock
    if (filters.onlyInStock && !product.inStock) return false;
    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      const matchSub = product.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchSku && !matchSub) return false;
    }
    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': return a.pixPrice - b.pixPrice;
      case 'price-desc': return b.pixPrice - a.pixPrice;
      case 'rating': return b.rating - a.rating;
      case 'discount': return (b.price - b.pixPrice) - (a.price - a.pixPrice);
      case 'alphabetical': return a.name.localeCompare(b.name);
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });

  const activeCategory = CATEGORIES.find(c => c.id === filters.category);

  return (
    <div className="bg-slate-50 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Section Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span>Catálogo</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-semibold">{activeCategory.name}</span>
              </>
            )}
            {filters.subcategory && (
              <>
                <span>/</span>
                <span className="text-amber-600 font-bold">{filters.subcategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeCategory ? activeCategory.name : 'Todos os Produtos KAZAM'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {filteredProducts.length} materiais encontrados com estoque em Macapá
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex-1 py-2.5 px-4 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>Filtrar ({filters.brand.length + (filters.category ? 1 : 0)})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Row (if any) */}
        {(filters.category || filters.subcategory || filters.brand.length > 0 || filters.finish.length > 0 || filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500">Filtros ativos:</span>

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                Busca: "{filters.searchQuery}"
                <button onClick={() => onFilterChange({ ...filters, searchQuery: '' })}>
                  <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                </button>
              </span>
            )}

            {filters.subcategory && (
              <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-medium">
                Subcategoria: {filters.subcategory}
                <button onClick={() => onFilterChange({ ...filters, subcategory: null })}>
                  <X className="w-3 h-3 text-amber-600 hover:text-amber-900" />
                </button>
              </span>
            )}

            {filters.brand.map(b => (
              <span key={b} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                Marca: {b}
                <button onClick={() => onFilterChange({ ...filters, brand: filters.brand.filter(item => item !== b) })}>
                  <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                </button>
              </span>
            ))}

            <button
              onClick={onResetFilters}
              className="text-xs text-amber-600 hover:underline font-semibold ml-auto"
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Catalog Main Layout: Sidebar Filters + Products Grid */}
        <div className="flex items-start gap-8">
          
          {/* Left Sidebar Filters */}
          <ProductFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            isMobileOpen={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* Right Main Content */}
          <div className="flex-1">
            
            {/* Top Toolbar: Sorting & Count */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-medium hidden sm:inline">
                Mostrando <strong className="text-slate-900 font-mono">{sortedProducts.length}</strong> produtos
              </span>

              {/* Sorting Select */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-slate-500 font-medium">Ordenar por:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
                  className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">Destaques Kazam</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="discount">Maior Desconto PIX</option>
                  <option value="rating">Mais Bem Avaliados</option>
                  <option value="alphabetical">Nome (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Nenhum material encontrado com esses filtros
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Tente ajustar a faixa de preço, desmarcar marcas selecionadas ou pesquisar por outro termo.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={onResetFilters}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                  >
                    Limpar Filtros
                  </button>
                  <button
                    onClick={onOpenFastQuote}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Consultar Estoque no WhatsApp
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
