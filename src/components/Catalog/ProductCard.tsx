import React from 'react';
import { Star, ShoppingCart, MessageSquare, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency, buildProductWhatsAppLink } from '../../utils/constants';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const whatsappUrl = buildProductWhatsAppLink(product.name, product.sku, product.pixPrice);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Media & Badges */}
      <div className="relative pt-[78%] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-amber-400 shadow-2xs">
              Destaque Kazam
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-2xs">
              Mais Vendido
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-amber-700 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Ver detalhes e calculadora"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Brand & Category - Clean unboxed natural text */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5 flex-wrap">
            <span className="text-amber-700 font-bold uppercase tracking-wide text-[11px]">
              {product.brand}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600">{product.subcategory}</span>
            {product.dimensions && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-[11px] text-slate-500">{product.dimensions}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">
              ({product.reviewsCount})
            </span>
            {product.coveragePerBox && (
              <span className="ml-auto text-[11px] font-semibold text-slate-500">
                {product.coveragePerBox} m²/cx
              </span>
            )}
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              -10% PIX
            </span>
          </div>

          {/* PIX Price */}
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {formatCurrency(product.pixPrice)}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              no PIX
            </span>
            <span className="text-xs text-slate-500 font-medium">
              /{product.unit}
            </span>
          </div>

          {/* Installments */}
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            ou {product.installments.max}x de <span className="font-bold text-slate-800">{formatCurrency(product.installments.value)}</span> sem juros
          </p>
        </div>

        {/* Action Buttons: Add to Cart + WhatsApp */}
        <div className="mt-4 pt-3 grid grid-cols-2 gap-2">
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            title="Adicionar ao carrinho"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Comprar</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            title="Comprar direto via WhatsApp Kazam"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
