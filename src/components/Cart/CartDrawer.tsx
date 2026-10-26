import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck, Check } from 'lucide-react';
import { CartItem } from '../../types';
import { formatCurrency } from '../../utils/constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  couponDiscount: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  couponDiscount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((acc, item) => {
    // If it's a box-calculated item, use coverage
    if (item.calculatedBoxes && item.product.coveragePerBox) {
      return acc + (item.calculatedBoxes * item.product.pixPrice * item.product.coveragePerBox);
    }
    return acc + (item.product.pixPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * couponDiscount;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const success = onApplyCoupon(couponCode.trim().toUpperCase());
    if (!success) {
      setCouponError('Cupom inválido. Tente KAZAM10 ou PRIMEIRACOMPRA');
    } else {
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">Meu Carrinho</h3>
            <span className="text-xs bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full font-mono">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {subtotal >= 500 ? (
              <strong className="text-emerald-800 font-bold">Parabéns! Você ganhou Frete Especial Kazam!</strong>
            ) : (
              <>Faltam <strong>{formatCurrency(500 - subtotal)}</strong> para entrega com tarifa reduzida!</>
            )}
          </span>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item) => {
              const itemTotal = item.calculatedBoxes && item.product.coveragePerBox
                ? item.calculatedBoxes * item.product.pixPrice * item.product.coveragePerBox
                : item.product.pixPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-white border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-600">
                        {item.product.brand}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      {item.calculatedBoxes && (
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Calculado: {item.calculatedBoxes} cx ({item.calculatedArea} m²)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-mono font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for this item */}
                      <div className="text-right">
                        <div className="text-xs font-black text-slate-900 font-mono">
                          {formatCurrency(itemTotal)}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-medium">
                          no PIX
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 p-1 self-start transition-colors"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Seu carrinho está vazio</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore nosso catálogo de pisos, tintas e iluminação com pronta entrega.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Começar a Comprar
              </button>
            </div>
          )}
        </div>

        {/* Footer with Totals, Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-4">
            
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Cupom {appliedCoupon} aplicado! ({couponDiscount * 100}% OFF)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-red-600 hover:underline font-semibold text-[11px]"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Cupom (ex: KAZAM10)"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs uppercase font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-900 font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Desconto Cupom ({appliedCoupon})</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Retirada na Loja Kazam</span>
                <span className="text-emerald-700 font-bold font-mono">GRÁTIS</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total à vista no PIX</span>
                <span className="text-xl font-black text-slate-950 font-mono">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Primary Checkout Button */}
            <button
              onClick={onProceedCheckout}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <span>FINALIZAR COMPRA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
            >
              Continuar comprando materiais
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
