import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, X, ChevronRight } from 'lucide-react';
import { KazamLogo } from '../Common/KazamLogo';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/constants';

interface MainHeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
  onSearch: (query: string) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenAccount,
  onSelectProduct,
  onNavigateHome,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Predictive search filtered items
  const searchResults = searchTerm.trim().length > 1
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setIsFocused(false);
    }
  };

  const handleSelectResult = (p: Product) => {
    onSelectProduct(p);
    setIsFocused(false);
    setSearchTerm('');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* 1. Brand Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1 transition-opacity hover:opacity-95"
            aria-label="Ir para a página inicial da Kazam"
          >
            <KazamLogo size="md" />
          </button>

          {/* 2. Central Predictive Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="O que você procura? (ex: porcelanato, tinta branca, pendente LED, lorenzetti...)"
                className="w-full pl-11 pr-24 py-2.5 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs"
              >
                Buscar
              </button>
            </form>

            {/* Predictive Results Dropdown (Clean White) */}
            {isFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100">
                <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 flex items-center justify-between">
                  <span>Produtos encontrados</span>
                  <span className="text-xs text-amber-700 font-bold">{searchResults.length} sugestões</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectResult(product)}
                      className="w-full px-4 py-3 flex items-center gap-3.5 hover:bg-amber-50/50 transition-colors text-left group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-amber-700 font-bold">
                          {product.brand} · {product.subcategory}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 truncate group-hover:text-amber-700 transition-colors">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-emerald-700">
                            {formatCurrency(product.pixPrice)} <span className="text-[10px] font-normal text-emerald-600">no PIX</span>
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      onSearch(searchTerm);
                      setIsFocused(false);
                    }}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
                  >
                    Ver todos os resultados para "{searchTerm}"
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Customer Hub & Cart Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Account / Orders */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors group text-left"
              title="Central do Cliente Kazam"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-amber-600 group-hover:border-amber-400 transition-colors">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="text-[11px] text-slate-500 leading-tight">Olá, cliente</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                  Minha Conta / Pedidos
                </span>
              </div>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm hover:shadow-md active:scale-95 group"
              aria-label={`Carrinho com ${cartCount} itens`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-950 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900/80 leading-none">
                  Meu Carrinho
                </span>
                <span className="text-xs font-bold text-slate-950 leading-tight mt-0.5">
                  {cartCount > 0 ? formatCurrency(cartSubtotal) : 'R$ 0,00'}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar materiais, porcelanatos, tintas..."
              className="w-full pl-9 pr-16 py-2.5 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-[11px] rounded-lg transition-colors"
            >
              OK
            </button>
          </form>
        </div>

      </div>
    </header>
  );
};
