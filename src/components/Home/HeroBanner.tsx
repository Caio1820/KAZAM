import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreCatalog: (categoryId?: string) => void;
  onOpenFastQuote: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreCatalog, onOpenFastQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: 'ESPECIAL ACABAMENTO KAZAM',
      title: 'Da Fundação ao Acabamento com a Melhor Condição',
      description: 'Porcelanatos nobres, tintas premium e iluminação arquitetônica para transformar sua construção com preço justo e estoque local no Amapá.',
      image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
      ctaText: 'Ver Porcelanatos & Pisos',
      ctaCategory: 'pisos-revestimentos',
      secondaryCta: 'Orçamento WhatsApp',
      badge: '10% OFF no PIX'
    },
    {
      id: 2,
      tag: 'TINTAS E QUÍMICOS',
      title: 'Renove Seus Ambientes com Suvinil e Vedacit',
      description: 'As melhores marcas do Brasil para pintura interna e externa, impermeabilização total e proteção contra umidade.',
      image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
      ctaText: 'Explorar Tintas & Químicos',
      ctaCategory: 'tintas-quimicos',
      secondaryCta: 'Consultar Cores no Zap',
      badge: 'Até 12x Sem Juros'
    },
    {
      id: 3,
      tag: 'DESIGN LUMINOTÉCNICO',
      title: 'Lançamentos em Iluminação LED & Pendentes Modernos',
      description: 'Spots de embutir, perfis lineares e lustres para salas integradas e áreas gourmet com conforto visual e alta eficiência.',
      image: '/src/assets/images/category_lighting_fixtures_1793020440441.jpg',
      ctaText: 'Ver Iluminação Completa',
      ctaCategory: 'iluminacao',
      secondaryCta: 'Falar com Consultor',
      badge: 'Estoque Garantido'
    }
  ];

  // Auto rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[currentSlide];

  return (
    <div className="relative bg-slate-50 overflow-hidden select-none border-b border-slate-200">
      <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        
        {/* Background Image with Natural Clean Light Scrim */}
        <div className="absolute inset-0">
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
          {/* Light Natural Scrim: Crisp white gradient on the left so typography is 100% legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full z-10">
          <div className="max-w-2xl text-left">
            
            {/* Top Tag & Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {active.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {active.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              {active.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              {active.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onExploreCatalog(active.ctaCategory)}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 group"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFastQuote}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 hover:border-amber-400"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{active.secondaryCta}</span>
              </button>
            </div>

            {/* Fast Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-slate-200/90 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Entrega rápida em Macapá e Santana</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantia de fábrica oficial</span>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-700 border border-slate-200 shadow-md transition-all z-20 backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Próximo slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-amber-700 border border-slate-200 shadow-md transition-all z-20 backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir para banner ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
