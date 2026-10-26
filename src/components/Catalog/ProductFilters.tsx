import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { BRANDS, FINISHES, USAGES } from '../../data/products';
import { formatCurrency } from '../../utils/constants';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const currentCategory = CATEGORIES.find(c => c.id === filters.category);

  const toggleBrand = (b: string) => {
    const brands = filters.brand.includes(b)
      ? filters.brand.filter(item => item !== b)
      : [...filters.brand, b];
    onFilterChange({ ...filters, brand: brands });
  };

  const toggleFinish = (f: string) => {
    const finishes = filters.finish.includes(f)
      ? filters.finish.filter(item => item !== f)
      : [...filters.finish, f];
    onFilterChange({ ...filters, finish: finishes });
  };

  const toggleUsage = (u: string) => {
    const usages = filters.usage.includes(u)
      ? filters.usage.filter(item => item !== u)
      : [...filters.usage, u];
    onFilterChange({ ...filters, usage: usages });
  };

  const content = (
    <div className="space-y-6">
      
      {/* Header / Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filtros KAZAM</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-amber-600 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Limpar</span>
        </button>
      </div>

      {/* Categories & Subcategories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Departamentos
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ ...filters, category: null, subcategory: null })}
            className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
              !filters.category ? 'bg-amber-500/10 text-amber-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Todos os Departamentos</span>
          </button>
          {CATEGORIES.map(cat => (
            <div key={cat.id}>
              <button
                onClick={() => onFilterChange({ ...filters, category: cat.id, subcategory: null })}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  filters.category === cat.id ? 'bg-amber-500/10 text-amber-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
              </button>

              {/* Subcategories if category selected */}
              {filters.category === cat.id && (
                <div className="pl-4 pt-1 space-y-1">
                  {cat.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => onFilterChange({ ...filters, subcategory: filters.subcategory === sub ? null : sub })}
                      className={`w-full text-left text-[11px] px-2 py-1 rounded transition-colors ${
                        filters.subcategory === sub ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Faixa de Preço
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={1000}
            step={20}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-amber-500"
          />
          <div className="flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Até {formatCurrency(filters.maxPrice)}</span>
            <button
              onClick={() => onFilterChange({ ...filters, maxPrice: 1000 })}
              className="text-[10px] text-amber-600 hover:underline"
            >
              Resetar
            </button>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Marcas em Destaque
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Finishes */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Acabamento
        </h4>
        <div className="space-y-1.5">
          {FINISHES.map(finish => (
            <label key={finish} className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.finish.includes(finish)}
                onChange={() => toggleFinish(finish)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>{finish}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Usages */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Indicação de Uso
        </h4>
        <div className="space-y-1.5">
          {USAGES.map(usage => (
            <label key={usage} className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.usage.includes(usage)}
                onChange={() => toggleUsage(usage)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>{usage}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange({ ...filters, onlyInStock: e.target.checked })}
            className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
          />
          <span>Apenas produtos com pronta entrega</span>
        </label>
      </div>

    </div>
  );

  // Mobile Drawer Wrap
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onCloseMobile} />
        <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <span className="font-bold text-slate-900 text-sm">Filtros</span>
            <button onClick={onCloseMobile} className="p-1 text-slate-500 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={onCloseMobile}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 shrink-0 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs h-fit sticky top-28 hidden lg:block">
      {content}
    </aside>
  );
};
