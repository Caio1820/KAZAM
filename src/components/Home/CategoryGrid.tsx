import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Departamentos KAZAM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Categorias em Destaque
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Navegue pelos setores mais procurados da nossa loja física e encontre tudo para sua obra.
            </p>
          </div>
        </div>

        {/* Categories Grid (Clean White Card Design) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between h-60 sm:h-64 hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100" />
                )}
                
                {/* Subtle tag overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-white/95 px-2 py-0.5 rounded-md shadow-2xs border border-slate-200/80">
                    {cat.subcategories.length} Linhas
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-700 group-hover:text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center shadow-xs transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {cat.subcategories.slice(0, 3).join(' · ')}
                  </p>
                </div>

                <div className="mt-2 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Ver produtos</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
