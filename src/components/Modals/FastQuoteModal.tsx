import React, { useState } from 'react';
import { X, MessageSquare, FileText, Send, CheckCircle2 } from 'lucide-react';
import { KAZAM_INFO, buildQuoteWhatsAppLink } from '../../utils/constants';

interface FastQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FastQuoteModal: React.FC<FastQuoteModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Macapá / AP');
  const [materialList, setMaterialList] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedContent = `Local da Obra: ${location}\n\nLista de Materiais:\n${materialList || 'Solicito orçamento para materiais básicos e acabamentos.'}`;
    const url = buildQuoteWhatsAppLink(formattedContent, name.trim() || undefined);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Orçamento Rápido via WhatsApp</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Economize no valor total da sua obra! Envie sua lista de materiais em texto ou descreva o que precisa. Nossos especialistas preparam a cotação com as melhores condições e descontos por volume.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Seu Nome ou Nome do Responsável pela Obra
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Carlos Oliveira (Engenheiro / Mestre de Obras)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cidade / Bairro da Obra
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Macapá - Bairro Jardim Marco Zero"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lista de Materiais / Quantidades
            </label>
            <textarea
              rows={4}
              required
              value={materialList}
              onChange={(e) => setMaterialList(e.target.value)}
              placeholder="Ex:&#10;- 60m² porcelanato 84x84 polido&#10;- 10 sacos argamassa AC-III branca&#10;- 2 baldes de tinta 18L toque de seda&#10;- 4 pendentes lineares LED"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Resposta em minutos no número oficial <strong>(96) 99112-1818</strong></span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Lista para o WhatsApp da Kazam</span>
          </button>
        </form>

      </div>
    </div>
  );
};
