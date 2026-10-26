import React from 'react';
import { Home, Grid, Search, ShoppingBag, MessageSquare } from 'lucide-react';
import { KAZAM_INFO } from '../../utils/constants';

interface MobileBottomNavProps {
  currentView: 'home' | 'catalog';
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateCategories: () => void;
  onTriggerSearch: () => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  cartCount,
  onNavigateHome,
  onNavigateCategories,
  onTriggerSearch,
  onOpenCart,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 backdrop-blur-md px-2 py-1.5 shadow-xl">
      <div className="grid grid-cols-5 items-center text-center">
        
        {/* 1. Home */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentView === 'home' ? 'text-amber-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 leading-none">Início</span>
        </button>

        {/* 2. Categorias */}
        <button
          onClick={onNavigateCategories}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentView === 'catalog' ? 'text-amber-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 leading-none">Departamentos</span>
        </button>

        {/* 3. Buscar */}
        <button
          onClick={onTriggerSearch}
          className="flex flex-col items-center py-1 text-slate-500 hover:text-amber-700 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 leading-none">Buscar</span>
        </button>

        {/* 4. Carrinho com Badge */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center py-1 text-slate-500 hover:text-amber-700 transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 leading-none">Carrinho</span>
        </button>

        {/* 5. WhatsApp Kazam */}
        <a
          href={KAZAM_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 leading-none font-bold">WhatsApp</span>
        </a>

      </div>
    </nav>
  );
};
