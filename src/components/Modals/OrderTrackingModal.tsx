import React, { useState } from 'react';
import { X, PackageSearch, CheckCircle2, Clock, Truck, Store, MessageSquare, ArrowRight } from 'lucide-react';
import { KAZAM_INFO, formatCurrency } from '../../utils/constants';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialCode = 'KZM-8492',
}) => {
  const [code, setCode] = useState(initialCode);
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PackageSearch className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">Rastreamento de Pedido KAZAM</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Digite o código (ex: KZM-8492 ou CPF)"
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500 uppercase"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
            >
              Rastrear
            </button>
          </form>

          {searched && (
            <div className="space-y-6">
              
              {/* Order Overview Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 font-mono text-sm">Pedido #{code}</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Em Rota de Entrega
                  </span>
                </div>
                <div className="text-slate-600">
                  Previsão de Entrega: <strong className="text-slate-900">Hoje até 17:30</strong>
                </div>
                <div className="text-slate-600">
                  Destino: <strong className="text-slate-900">Macapá - AP (Entrega Expressa Kazam)</strong>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pl-2">
                
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Pedido Confirmado & Pagamento Aprovado</h5>
                    <p className="text-[11px] text-slate-500">26/10/2026 às 08:15</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Separação Concluída no Centro Kazam</h5>
                    <p className="text-[11px] text-slate-500">26/10/2026 às 10:40 - Pisos e tintas conferidos</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 animate-pulse">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-600">Em Rota com o Motorista Kazam</h5>
                    <p className="text-[11px] text-slate-600">Caminhão KAZAM a caminho do seu endereço</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-700">Entregue no Canteiro</h5>
                    <p className="text-[11px] text-slate-400">Aguardando entrega final</p>
                  </div>
                </div>

              </div>

              {/* WhatsApp Support Button */}
              <div className="pt-2 border-t border-slate-200">
                <a
                  href={`https://wa.me/${KAZAM_INFO.whatsappRaw}?text=${encodeURIComponent(`Olá, gostaria de informações sobre a entrega do meu pedido ${code}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar com o Suporte de Entregas no WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
