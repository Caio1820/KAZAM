import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../Catalog/ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  tag?: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onViewAll?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  tag = 'OPORTUNIDADE KAZAM',
  products,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 mr-2"
              >
                <span>Ver catálogo completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-xl bg-white border border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
                aria-label="Rolar para esquerda"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-xl bg-white border border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
                aria-label="Rolar para direita"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
