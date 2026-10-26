import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Calculator, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingCart
} from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency, buildProductWhatsAppLink } from '../../utils/constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, calculatedBoxes?: number, calculatedArea?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'install' | 'warranty'>('desc');
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [quantity, setQuantity] = useState(1);

  // Material Calculator State
  const [inputArea, setInputArea] = useState<number | ''>(25); // default 25m²
  const [includeMargin, setIncludeMargin] = useState(true); // +10% margin recommendation

  // Shipping Calculator State
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  // Calculation for floors / coverings
  const coveragePerBox = product.coveragePerBox || 2.12;
  const rawArea = typeof inputArea === 'number' ? inputArea : 0;
  const effectiveArea = includeMargin ? rawArea * 1.1 : rawArea;
  const boxesNeeded = rawArea > 0 ? Math.ceil(effectiveArea / coveragePerBox) : 1;
  const totalCalculatedM2 = +(boxesNeeded * coveragePerBox).toFixed(2);
  const totalMaterialPrice = boxesNeeded * product.pixPrice * coveragePerBox;

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setShippingCalculated(true);
    }
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyCalculatedBoxes = () => {
    onAddToCart(product, boxesNeeded, boxesNeeded, totalCalculatedM2);
  };

  const whatsappUrl = buildProductWhatsAppLink(product.name, product.sku, product.pixPrice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-50 text-slate-800 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-amber-700 font-bold uppercase tracking-wider">{product.brand}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">SKU: {product.sku}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-slate-900 text-amber-400 text-xs font-bold uppercase px-2.5 py-1 rounded-lg">
                    Destaque Kazam
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex gap-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? 'border-amber-500 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fast trust highlights */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Produto 100% original com nota fiscal e garantia de fábrica</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pronta entrega para Macapá e Santana ou retirada imediata</span>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Purchase Contiguous Module */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Brand */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {product.rating.toFixed(1)} ({product.reviewsCount} avaliações)
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    10% DE DESCONTO NO PIX
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {formatCurrency(product.pixPrice)}
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
                    à vista no PIX
                  </span>
                  <span className="text-xs text-slate-500">
                    /{product.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 font-medium">
                  ou {product.installments.max}x de <strong className="text-slate-900 font-bold">{formatCurrency(product.installments.value)}</strong> sem juros no cartão
                </p>
              </div>

              {/* CALCULADORA DE MATERIAIS / RENDIMENTO */}
              {product.category === 'pisos-revestimentos' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-700" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Calculadora de Pisos e Caixas
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {coveragePerBox} m² por caixa
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Digite a metragem da sua área e descubra a quantidade exata de caixas com a margem de quebra recomendada:
                  </p>

                  <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-medium">
                        Área do ambiente (m²):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={inputArea}
                          onChange={(e) => setInputArea(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          m²
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-4 font-medium">
                        <input
                          type="checkbox"
                          checked={includeMargin}
                          onChange={(e) => setIncludeMargin(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-amber-500"
                        />
                        <span>+10% margem de recortes</span>
                      </label>
                    </div>
                  </div>

                  {/* Calculator Result Box */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-500">Total recomendado:</div>
                      <div className="text-sm font-bold text-amber-800">
                        {boxesNeeded} caixas ({totalCalculatedM2} m²)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500">Total no PIX:</div>
                      <div className="text-sm font-black text-emerald-700">
                        {formatCurrency(totalMaterialPrice)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyCalculatedBoxes}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar {boxesNeeded} Caixas ao Carrinho</span>
                  </button>
                </div>
              )}

              {/* Quantity & Buy CTAs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-bold text-slate-900 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>COMPRAR AGORA</span>
                  </button>
                </div>

                {/* Secondary WhatsApp button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Tirar Dúvidas com Vendedor Kazam</span>
                </a>
              </div>

              {/* Frete & Retirada por CEP */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Calcular Frete e Prazo</span>
                </div>

                <form onSubmit={handleCalculateShipping} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={9}
                    placeholder="Digite seu CEP (ex: 68900-000)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Calcular
                  </button>
                </form>

                {shippingCalculated && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                      <span>🏪 Retirada na Loja Kazam (Macapá)</span>
                      <strong className="text-emerald-800 font-bold">GRÁTIS (Pronto em 2h)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-slate-700">
                      <span>🚚 Entrega Expressa Kazam (Macapá/Santana)</span>
                      <strong className="font-bold text-slate-900">R$ 29,90 (1 a 2 dias)</strong>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Informational Tabs */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('desc')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'desc' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Descrição Detalhada
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'specs' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ficha Técnica
              </button>
              <button
                onClick={() => setActiveTab('install')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'install' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dicas de Instalação
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'warranty' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Garantia e Trocas
              </button>
            </div>

            <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {activeTab === 'desc' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <p>
                    Compre com segurança na KAZAM Materiais de Construção. Nossa equipe técnica está à disposição para indicar as melhores argamassas, rejuntes e ferramentas compatíveis.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.technicalSpecs).map(([key, val]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                        {key}
                      </span>
                      <span className="text-xs font-semibold text-slate-900 mt-0.5 block">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'install' && (
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900">Recomendações dos Especialistas Kazam:</h5>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                    {product.installationTips?.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    )) || (
                      <>
                        <li>Verifique o nivelamento da superfície antes de iniciar a aplicação.</li>
                        <li>Utilize ferramentas adequadas e EPIs durante o manuseio.</li>
                        <li>Siga rigorosamente o tempo de secagem indicado pelo fabricante.</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="space-y-2 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">
                    Garantia legal de 90 dias + garantia do fabricante:
                  </p>
                  <p>
                    Todos os produtos comercializados pela KAZAM possuem procedência garantida. Trocas podem ser solicitadas na nossa loja física ou pelo WhatsApp (96) 99112-1818.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
