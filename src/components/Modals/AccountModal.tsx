import React, { useState } from 'react';
import { X, User, Package, MapPin, Award, Phone, LogOut, ChevronRight, ExternalLink } from 'lucide-react';
import { KAZAM_INFO, formatCurrency } from '../../utils/constants';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (code: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onTrackOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!isOpen) return null;

  const mockOrders = [
    {
      code: 'KZM-8492',
      date: '26/10/2026',
      items: 'Porcelanato Calacatta 84x84 (24 cx) + Argamassa AC3 (6 sc)',
      total: 3358.40,
      status: 'Em Rota de Entrega',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      code: 'KZM-7104',
      date: '14/10/2026',
      items: 'Tinta Acrílica Suvinil 18L Branco Neve (2 lt) + Rolo Atlas',
      total: 948.80,
      status: 'Entregue',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg">
              CV
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Caio Viana</h3>
              <p className="text-xs text-slate-400 font-mono">Cliente Clube KAZAM VIP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-white border-b-2 border-amber-500 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Meus Pedidos</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'addresses' ? 'bg-white border-b-2 border-amber-500 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Endereços</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-white border-b-2 border-amber-500 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Meus Dados</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.code}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 font-mono text-sm">Pedido #{order.code}</span>
                      <span className="text-xs text-slate-400 block">{order.date}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {order.items}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      Total: {formatCurrency(order.total)}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onTrackOrder(order.code);
                      }}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>Acompanhar Entrega</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Obra Principal / Canteiro</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Principal</span>
                </div>
                <p className="text-slate-600">Rodovia Duca Serra, Km 03 - Macapá/AP</p>
                <p className="text-slate-500">CEP: 68900-000</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block">Nome</span>
                <span className="font-bold text-slate-900">Caio Viana</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block">WhatsApp</span>
                <span className="font-bold text-slate-900 font-mono">(96) 99112-1818</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block">E-mail</span>
                <span className="font-bold text-slate-900">caio.viana@trt8.jus.br</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <a
            href={KAZAM_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Falar com o Gerente no WhatsApp</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
