import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, FileText, Sparkles, PhoneCall } from 'lucide-react';
import { KAZAM_INFO, buildQuoteWhatsAppLink } from '../../utils/constants';

interface ConsultantBannerProps {
  onOpenFastQuoteModal: () => void;
}

export const ConsultantBanner: React.FC<ConsultantBannerProps> = ({ onOpenFastQuoteModal }) => {
  const [quickList, setQuickList] = useState('');
  const [clientName, setClientName] = useState('');

  const handleSendDirectQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const listToSend = quickList.trim() || 'Gostaria de cotar materiais para minha obra (cimento, pisos, tintas, elétrica, hidráulica).';
    const link = buildQuoteWhatsAppLink(listToSend, clientName.trim() || undefined);
    window.open(link, '_blank');
  };

  return (
    <section className="py-14 bg-gradient-to-b from-amber-50/60 via-amber-50/30 to-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Pitch & Benefits */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atendimento Consultivo Especializado</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Tem a lista de materiais da sua obra? <br />
                <span className="text-amber-700">Economize tempo e dinheiro com a KAZAM!</span>
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
                Envie sua planilha, foto do projeto ou lista em texto. Nossos consultores calculam a quantidade exata de pisos, argamassas, fios e tubulações com os melhores preços de Macapá e região.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cotação rápida em até 15 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Descontos progressivos para volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Entrega programada direto no canteiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Parcelamento facilitado ou desconto PIX</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>WhatsApp oficial: <strong className="text-slate-900 font-semibold">{KAZAM_INFO.whatsappPhone}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Fast Quote Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>Envio Rápido de Lista</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Consultores online
                  </span>
                </div>

                <form onSubmit={handleSendDirectQuote} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seu Nome ou Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Engenheiro Carlos / Maria Souza"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Itens da sua lista de obra
                    </label>
                    <textarea
                      rows={3}
                      value={quickList}
                      onChange={(e) => setQuickList(e.target.value)}
                      placeholder="Ex: 80m² Porcelanato Calacatta, 12 sacos de argamassa AC3, 3 rolos de cabo 2.5mm, 2 baldes de tinta branca 18L..."
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 resize-none font-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar Lista para o WhatsApp Kazam</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Você será direcionado diretamente para nossa equipe de vendas no (96) 99112-1818.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
