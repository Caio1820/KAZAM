import React, { useState } from 'react';
import { Topbar } from './components/Header/Topbar';
import { MainHeader } from './components/Header/MainHeader';
import { Megamenu } from './components/Header/Megamenu';
import { HeroBanner } from './components/Home/HeroBanner';
import { BenefitsBar } from './components/Home/BenefitsBar';
import { CategoryGrid } from './components/Home/CategoryGrid';
import { ProductCarousel } from './components/Home/ProductCarousel';
import { ConsultantBanner } from './components/Home/ConsultantBanner';
import { CatalogView } from './components/Catalog/CatalogView';
import { ProductModal } from './components/ProductDetail/ProductModal';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { OrderTrackingModal } from './components/Modals/OrderTrackingModal';
import { AccountModal } from './components/Modals/AccountModal';
import { FastQuoteModal } from './components/Modals/FastQuoteModal';
import { Footer } from './components/Footer/Footer';
import { MobileBottomNav } from './components/Mobile/MobileBottomNav';

import { PRODUCTS } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { Check, MessageSquare } from 'lucide-react';
import { KAZAM_INFO } from './utils/constants';

export default function App() {
  // Navigation View
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');

  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('KZM-8492');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isFastQuoteOpen, setIsFastQuoteOpen] = useState(false);

  // Cart State (pre-populated with 1 realistic starter item)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Porcelanato Calacatta
      quantity: 1,
      calculatedBoxes: 12,
      calculatedArea: 25.44
    }
  ]);

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('KAZAM10');
  const [couponDiscount, setCouponDiscount] = useState<number>(0.10); // 10%

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter State
  const initialFilters: FilterState = {
    category: null,
    subcategory: null,
    brand: [],
    finish: [],
    usage: [],
    minPrice: 0,
    maxPrice: 1000,
    onlyInStock: false,
    searchQuery: '',
    sortBy: 'featured',
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Trigger temporary toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    calculatedBoxes?: number,
    calculatedArea?: number
  ) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                calculatedBoxes: calculatedBoxes || item.calculatedBoxes,
                calculatedArea: calculatedArea || item.calculatedArea,
              }
            : item
        );
      }
      return [...prev, { product, quantity, calculatedBoxes, calculatedArea }];
    });

    showToast(`"${product.name}" adicionado ao seu carrinho!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removido do carrinho.');
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'KAZAM10') {
      setAppliedCoupon('KAZAM10');
      setCouponDiscount(0.10);
      showToast('Cupom KAZAM10 ativado: 10% de desconto!');
      return true;
    }
    if (code === 'PRIMEIRACOMPRA') {
      setAppliedCoupon('PRIMEIRACOMPRA');
      setCouponDiscount(0.05);
      showToast('Cupom PRIMEIRACOMPRA ativado: 5% de desconto!');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Cupom removido.');
  };

  // Navigation Handlers
  const handleSelectCategory = (categoryId: string | null, subcategory: string | null = null) => {
    setFilters({
      ...initialFilters,
      category: categoryId,
      subcategory: subcategory,
    });
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setFilters({
      ...initialFilters,
      searchQuery: query,
    });
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculations for MainHeader preview
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => {
    if (item.calculatedBoxes && item.product.coveragePerBox) {
      return acc + (item.calculatedBoxes * item.product.pixPrice * item.product.coveragePerBox);
    }
    return acc + (item.product.pixPrice * item.quantity);
  }, 0);

  // Offer carousels products
  const featuredOffers = PRODUCTS.filter(p => p.featured);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  const lightingProducts = PRODUCTS.filter(p => p.category === 'iluminacao');

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased pb-16 lg:pb-0">
      
      {/* 1. Header & Navigation Structure */}
      <Topbar
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenFastQuote={() => setIsFastQuoteOpen(true)}
      />

      <MainHeader
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onNavigateHome={handleNavigateHome}
        onSearch={handleSearch}
      />

      <Megamenu
        selectedCategory={filters.category}
        onSelectCategory={handleSelectCategory}
        onOpenFastQuote={() => setIsFastQuoteOpen(true)}
      />

      {/* 2. Main Content View: Homepage vs Catalog */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* Hero Banner Carousel */}
            <HeroBanner
              onExploreCatalog={(catId) => handleSelectCategory(catId || 'pisos-revestimentos')}
              onOpenFastQuote={() => setIsFastQuoteOpen(true)}
            />

            {/* Quick Benefits Bar */}
            <BenefitsBar />

            {/* Visual Category Grid */}
            <CategoryGrid onSelectCategory={(catId) => handleSelectCategory(catId)} />

            {/* Offer Carousel 1: Ofertas em Destaque KAZAM */}
            <ProductCarousel
              title="Ofertas em Destaque KAZAM"
              subtitle="Descontos imperdíveis com pronta entrega no Amapá"
              tag="OPORTUNIDADES DA SEMANA"
              products={featuredOffers}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, e) => {
                e.stopPropagation();
                handleAddToCart(p, 1);
              }}
              onViewAll={() => {
                setFilters({ ...initialFilters, sortBy: 'discount' });
                setCurrentView('catalog');
              }}
            />

            {/* Offer Carousel 2: Mais Vendidos para o seu Acabamento */}
            <ProductCarousel
              title="Mais Vendidos para o seu Acabamento"
              subtitle="Os materiais preferidos por engenheiros e mestres de obras"
              tag="TOP VENDAS KAZAM"
              products={bestSellers}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, e) => {
                e.stopPropagation();
                handleAddToCart(p, 1);
              }}
              onViewAll={() => {
                setFilters({ ...initialFilters, sortBy: 'rating' });
                setCurrentView('catalog');
              }}
            />

            {/* Banner Especial "Fale com um Consultor Kazam" */}
            <ConsultantBanner
              onOpenFastQuoteModal={() => setIsFastQuoteOpen(true)}
            />

            {/* Offer Carousel 3: Lançamentos e Tendências de Iluminação */}
            <ProductCarousel
              title="Lançamentos e Tendências de Iluminação"
              subtitle="Design luminotécnico com pendentes, spots e plafons LED"
              tag="ILUMINAÇÃO MODERNA"
              products={lightingProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, e) => {
                e.stopPropagation();
                handleAddToCart(p, 1);
              }}
              onViewAll={() => handleSelectCategory('iluminacao')}
            />
          </>
        ) : (
          /* Catalog View */
          <CatalogView
            products={PRODUCTS}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => {
              e.stopPropagation();
              handleAddToCart(p, 1);
            }}
            onOpenFastQuote={() => setIsFastQuoteOpen(true)}
          />
        )}
      </main>

      {/* 3. Footer Institucional */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenFastQuote={() => setIsFastQuoteOpen(true)}
        onSelectCategory={(catId) => handleSelectCategory(catId)}
      />

      {/* 4. Mobile Bottom App Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        cartCount={cartCount}
        onNavigateHome={handleNavigateHome}
        onNavigateCategories={() => {
          setFilters(initialFilters);
          setCurrentView('catalog');
        }}
        onTriggerSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 5. Floating WhatsApp Direct Action Button */}
      <a
        href={KAZAM_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs transition-all hover:scale-105 active:scale-95 group"
        title="Falar no WhatsApp oficial Kazam"
      >
        <MessageSquare className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline font-semibold">Tirar Dúvidas no WhatsApp</span>
      </a>

      {/* 6. Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q, boxes, area) => {
          handleAddToCart(p, q, boxes, area);
          setSelectedProduct(null);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponDiscount={couponDiscount}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={couponDiscount}
        onOrderSuccess={(code) => {
          setTrackingCode(code);
          setCartItems([]); // Clear cart after order
          showToast(`Pedido #${code} gerado com sucesso!`);
        }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        initialCode={trackingCode}
        onClose={() => setIsTrackingOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onTrackOrder={(code) => {
          setTrackingCode(code);
          setIsTrackingOpen(true);
        }}
      />

      <FastQuoteModal
        isOpen={isFastQuoteOpen}
        onClose={() => setIsFastQuoteOpen(false)}
      />

      {/* 7. Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
