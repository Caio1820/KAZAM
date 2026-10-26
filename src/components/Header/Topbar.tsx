import React from 'react';
import { Phone, Instagram, MapPin, PackageSearch, MessageSquare } from 'lucide-react';
import { KAZAM_INFO } from '../../utils/constants';

interface TopbarProps {
  onOpenTracking: () => void;
  onOpenFastQuote: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenTracking, onOpenFastQuote }) => {
  return (
    <div className="bg-slate-100 text-slate-700 text-xs border-b border-slate-200/90 font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left Side: Fast Support & WhatsApp */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={KAZAM_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-600 transition-colors text-slate-800 font-semibold"
            title="Fale no WhatsApp da Kazam"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp Vendas:</span>
            <span className="text-slate-900">{KAZAM_INFO.whatsappPhone}</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5 text-slate-500">
            <Phone className="w-3 h-3 text-amber-600" />
            <span>Seg a Sex: 07:30 às 18:00</span>
          </div>
        </div>

        {/* Center / Promotional highlight */}
        <div className="hidden lg:flex items-center gap-2 text-slate-600">
          <span className="text-amber-700 font-semibold">Tudo da Fundação ao Acabamento</span>
          <span className="text-slate-300">|</span>
          <span>Até 10% OFF no PIX ou 10x Sem Juros</span>
        </div>

        {/* Right Side: Social, Map, Tracking */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          <button
            onClick={onOpenFastQuote}
            className="text-amber-700 hover:text-amber-800 font-semibold transition-colors hidden sm:flex items-center gap-1"
          >
            <span>Orçamento Rápido</span>
          </button>

          <a
            href={KAZAM_INFO.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-600 hover:text-pink-600 transition-colors"
            title="Instagram da Kazam Materiais"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">@kazamconstrucao</span>
          </a>

          <a
            href={KAZAM_INFO.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-600 hover:text-amber-700 transition-colors"
            title="Localização da Loja no Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Nossa Loja / Como Chegar</span>
          </a>

          <span className="text-slate-300 hidden sm:inline">|</span>

          <button
            onClick={onOpenTracking}
            className="flex items-center gap-1 text-slate-700 hover:text-amber-700 font-semibold transition-colors"
          >
            <PackageSearch className="w-3.5 h-3.5 text-blue-600" />
            <span>Rastreie seu Pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
