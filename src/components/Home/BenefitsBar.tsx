import React from 'react';
import { Truck, MessageCircle, CreditCard, Store } from 'lucide-react';
import { KAZAM_INFO } from '../../utils/constants';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-5 h-5 text-amber-600 shrink-0" />,
      title: 'Entrega Ágil & Retirada',
      subtitle: 'Entregamos em Macapá, Santana e região ou retire grátis na loja.',
      link: '#entregas'
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
      title: 'WhatsApp Direto',
      subtitle: `${KAZAM_INFO.whatsappPhone} - Tire dúvidas técnicas com consultores.`,
      link: KAZAM_INFO.whatsappLink,
      isExternal: true
    },
    {
      icon: <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />,
      title: 'Parcelamento em até 12x',
      subtitle: 'Condições facilitadas no cartão e 10% de desconto à vista no PIX.',
      link: '#pagamento'
    },
    {
      icon: <Store className="w-5 h-5 text-amber-600 shrink-0" />,
      title: 'Visite Nosso Showroom',
      subtitle: 'Venha ver de perto os porcelanatos, iluminação e metais na loja física.',
      link: KAZAM_INFO.mapsLink,
      isExternal: true
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, idx) => {
            const Content = (
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-400 hover:bg-white hover:shadow-sm transition-all h-full">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );

            if (b.isExternal) {
              return (
                <a
                  key={idx}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  {Content}
                </a>
              );
            }

            return (
              <div key={idx} className="h-full">
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
