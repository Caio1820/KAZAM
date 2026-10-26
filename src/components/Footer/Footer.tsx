import React, { useState } from 'react';
import { 
  Instagram, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  CheckCircle2, 
  MessageSquare,
  Send
} from 'lucide-react';
import { KazamLogo } from '../Common/KazamLogo';
import { KAZAM_INFO } from '../../utils/constants';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenFastQuote: () => void;
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenFastQuote,
  onSelectCategory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const faqs = [
    {
      q: 'Quais regiões a KAZAM atende com entrega?',
      a: 'Realizamos entregas diárias com frota própria em Macapá, Santana e regiões metropolitanas do Amapá. Também oferecemos a opção de retirada gratuita na nossa loja física.'
    },
    {
      q: 'Como funciona a compra e orçamento pelo WhatsApp?',
      a: 'Você pode navegar pelos produtos no site e clicar no botão "Comprar via WhatsApp", ou enviar sua lista completa de obra. Um consultor técnico calcula o frete, aplica descontos de volume e envia a chave PIX ou link de cartão.'
    },
    {
      q: 'Qual o desconto para pagamento à vista no PIX?',
      a: 'Oferecemos até 10% de desconto real à vista no PIX em quase todos os departamentos, incluindo porcelanatos, tintas e iluminação.'
    },
    {
      q: 'Qual a política de troca em caso de avaria ou sobra de pisos?',
      a: 'Caixas de pisos lacradas e sem danos podem ser trocadas na loja física em até 30 dias corridos mediante apresentação do cupom fiscal. Itens avariados no transporte devem ser informados em até 7 dias.'
    }
  ];

  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200">
      
      {/* 1. Newsletter Lead Capture Bar */}
      <div className="border-b border-slate-200/90 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                CLUBE DE VANTAGENS KAZAM
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Receba ofertas exclusivas e dicas para sua construção
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Descontos em porcelanatos, lançamentos de tintas e cupons especiais para clientes cadastrados.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex-1 max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu melhor e-mail ou WhatsApp"
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Cadastrar</span>
                </button>
              </div>
              {newsletterSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Obrigado! Você agora tem acesso prioritário às ofertas Kazam.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 2. Interactive FAQ Section (Accordion) */}
      <div className="border-b border-slate-200/90 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Tire Suas Dúvidas
            </span>
            <h4 className="text-xl font-extrabold text-slate-900 mt-1">
              Perguntas Frequentes sobre Compras na KAZAM
            </h4>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-700' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: About Kazam */}
          <div className="lg:col-span-4 space-y-4">
            <KazamLogo size="md" />
            <p className="text-xs text-slate-600 leading-relaxed">
              A KAZAM Materiais de Construção é a sua parceira completa da fundação ao acabamento. Oferecemos o que há de mais moderno em porcelanatos, iluminação LED, tintas e hidráulica com atendimento consultivo e entrega rápida no Amapá.
            </p>

            <div className="space-y-2 text-xs text-slate-700">
              <a
                href={KAZAM_INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-amber-700 transition-colors group font-medium"
              >
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{KAZAM_INFO.address} (Ver no Google Maps)</span>
              </a>

              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{KAZAM_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Departamentos Rápidos */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Departamentos
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => onSelectCategory('pisos-revestimentos')} className="hover:text-amber-700 transition-colors">
                  Pisos e Porcelanatos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tintas-quimicos')} className="hover:text-amber-700 transition-colors">
                  Tintas, Vernizes e Massas
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('iluminacao')} className="hover:text-amber-700 transition-colors">
                  Iluminação LED e Pendentes
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('material-eletrico')} className="hover:text-amber-700 transition-colors">
                  Material Elétrico e Cabos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hidraulica-metais')} className="hover:text-amber-700 transition-colors">
                  Hidráulica e Metais Gourmet
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('loucas-banheiro')} className="hover:text-amber-700 transition-colors">
                  Louças Sanitárias e Banheiro
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Links Úteis e Suporte */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Atendimento & Ajuda
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={onOpenTracking} className="hover:text-amber-700 transition-colors">
                  Rastreie seu Pedido
                </button>
              </li>
              <li>
                <button onClick={onOpenFastQuote} className="hover:text-amber-700 transition-colors">
                  Cotação de Obra
                </button>
              </li>
              <li>
                <a href={KAZAM_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors">
                  Fale com um Vendedor
                </a>
              </li>
              <li>
                <a href={KAZAM_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors">
                  Localização da Loja
                </a>
              </li>
              <li>
                <span className="text-slate-500">Política de Trocas e Garantia</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Canais Oficiais de Contato */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Canais Oficiais KAZAM
            </h5>

            <a
              href={KAZAM_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-emerald-300 rounded-2xl flex items-center gap-3 hover:border-emerald-500 transition-colors group block shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">WhatsApp Vendas</span>
                <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700">
                  {KAZAM_INFO.whatsappPhone}
                </span>
              </div>
            </a>

            <a
              href={KAZAM_INFO.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-pink-200 rounded-2xl flex items-center gap-3 hover:border-pink-400 transition-colors group block shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">Siga no Instagram</span>
                <span className="text-xs font-extrabold text-slate-900 group-hover:text-pink-600">
                  {KAZAM_INFO.instagramHandle}
                </span>
              </div>
            </a>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block">Formas de Pagamento:</span>
              <div className="flex items-center gap-2 mt-1 text-slate-700 flex-wrap">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">PIX 10% OFF</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Visa</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Master</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Elo</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">Boleto</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4. Bottom Copyright & Security */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} KAZAM Materiais de Construção LTDA · CNPJ: {KAZAM_INFO.cnpj} · Macapá - AP. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Compra 100% Segura</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>Preços e estoques sujeitos a alteração sem aviso prévio.</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
