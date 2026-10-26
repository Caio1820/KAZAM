import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  ChevronDown, 
  Layers, 
  Paintbrush, 
  Lightbulb, 
  Zap, 
  Droplet, 
  Bath, 
  Wrench, 
  DoorOpen, 
  Flame, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { CategoryItem } from '../../types';

interface MegamenuProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null, subcategory?: string | null) => void;
  onOpenFastQuote: () => void;
}

export const Megamenu: React.FC<MegamenuProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenFastQuote,
}) => {
  const [activeMegamenu, setActiveMegamenu] = useState<CategoryItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close megamenu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMegamenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 shrink-0 text-amber-600" };
    switch (iconName) {
      case 'Layers': return <Layers {...props} />;
      case 'Paintbrush': return <Paintbrush {...props} />;
      case 'Lightbulb': return <Lightbulb {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Droplet': return <Droplet {...props} />;
      case 'Bath': return <Bath {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'DoorOpen': return <DoorOpen {...props} />;
      default: return <Layers {...props} />;
    }
  };

  const handleCategoryClick = (cat: CategoryItem) => {
    onSelectCategory(cat.id);
    setActiveMegamenu(null);
  };

  const handleSubcategoryClick = (catId: string, sub: string) => {
    onSelectCategory(catId, sub);
    setActiveMegamenu(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav ref={menuRef} className="bg-white border-b border-slate-200 text-slate-800 relative z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 text-xs">
          
          {/* "Departamentos" Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Departamentos</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Desktop Category Navigation Bar (Monte & Cia Inspired) */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const isHovered = activeMegamenu?.id === cat.id;

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setActiveMegamenu(cat)}
                >
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-50 text-amber-800 font-bold'
                        : isHovered
                        ? 'text-amber-800 bg-amber-50/60'
                        : 'text-slate-700 hover:text-amber-800 hover:bg-slate-50'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                    <span>{cat.name}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isHovered ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Special Quick Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onSelectCategory(null)}
              className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-bold transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Ofertas</span>
            </button>

            <button
              onClick={onOpenFastQuote}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
              title="Solicitar orçamento de lista no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Orçamento WhatsApp</span>
            </button>
          </div>

        </div>
      </div>

      {/* Desktop Hover / Active Megamenu Overlay (Crisp Light Background) */}
      {activeMegamenu && (
        <div
          onMouseLeave={() => setActiveMegamenu(null)}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            <div className="grid grid-cols-12 gap-8">
              
              {/* Category Info & Subcategories */}
              <div className="col-span-8">
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                      {getCategoryIcon(activeMegamenu.iconName)}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{activeMegamenu.name}</h4>
                      <p className="text-xs text-slate-500">{activeMegamenu.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCategoryClick(activeMegamenu)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
                  >
                    Ver todos em {activeMegamenu.name}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                  {activeMegamenu.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubcategoryClick(activeMegamenu.id, sub)}
                      className="text-left text-xs text-slate-600 hover:text-amber-800 hover:translate-x-1 transition-all py-1 font-medium flex items-center justify-between group"
                    >
                      <span>{sub}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Banner in Megamenu (Light) */}
              <div className="col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                {activeMegamenu.image && (
                  <img
                    src={activeMegamenu.image}
                    alt={activeMegamenu.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                )}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Destaque KAZAM
                  </span>
                  <h5 className="text-sm font-bold text-slate-900 mt-1">
                    Qualidade e pronta entrega para {activeMegamenu.name}
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Trabalhamos com as marcas mais recomendadas por engenheiros e mestres de obras.
                  </p>
                </div>
                <div className="relative z-10 pt-4">
                  <button
                    onClick={() => handleCategoryClick(activeMegamenu)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors text-center shadow-xs"
                  >
                    Explorar Produtos
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Mobile Departments Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 max-h-[70vh] overflow-y-auto shadow-xl">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Categorias KAZAM</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                Fechar
              </button>
            </div>

            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-b border-slate-100 pb-3">
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full flex items-center justify-between text-left font-bold text-slate-800 py-1 hover:text-amber-700"
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(cat.iconName)}
                    <span>{cat.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                
                <div className="pl-6 pt-2 space-y-1.5 grid grid-cols-1">
                  {cat.subcategories.slice(0, 4).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubcategoryClick(cat.id, sub)}
                      className="text-left text-xs text-slate-500 hover:text-amber-700 py-0.5"
                    >
                      {sub}
                    </button>
                  ))}
                  {cat.subcategories.length > 4 && (
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className="text-left text-xs font-bold text-amber-700 py-0.5"
                    >
                      + Ver todos de {cat.name}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </nav>
  );
};
