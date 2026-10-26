import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  FileText, 
  Truck, 
  Store, 
  Copy, 
  Check, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { CartItem } from '../../types';
import { formatCurrency, buildOrderWhatsAppLink, KAZAM_INFO } from '../../utils/constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  onOrderSuccess: (orderCode: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Personal, 2: Delivery, 3: Payment, 4: Confirmed
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'boleto'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  // Form Fields
  const [name, setName] = useState('Caio Viana');
  const [phone, setPhone] = useState('(96) 99112-1818');
  const [email, setEmail] = useState('caio.viana@trt8.jus.br');
  const [cpf, setCpf] = useState('021.492.812-40');
  const [address, setAddress] = useState('Rodovia Duca Serra, 1200 - Macapá/AP');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [installments, setInstallments] = useState(1);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => {
    if (item.calculatedBoxes && item.product.coveragePerBox) {
      return acc + (item.calculatedBoxes * item.product.pixPrice * item.product.coveragePerBox);
    }
    return acc + (item.product.pixPrice * item.quantity);
  }, 0);

  const discountAmount = rawSubtotal * appliedDiscount;
  const shippingFee = deliveryType === 'delivery' ? 29.90 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  // Simulated dynamic PIX key
  const simulatedPixCode = `00020126580014BR.GOV.BCB.PIX0136kazam-${Date.now()}5204000053039865802BR5925KAZAM MATERIAIS CONST6006MACAPA62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(simulatedPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleFinishOrder = () => {
    const generatedCode = `KZM-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(generatedCode);
    setStep(4);
    onOrderSuccess(generatedCode);
  };

  const whatsappConfirmationLink = orderCode
    ? buildOrderWhatsAppLink(orderCode, name, finalTotal)
    : KAZAM_INFO.whatsappLink;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" 
        onClick={step === 4 ? onClose : undefined} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[94vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Checkout Seguro KAZAM</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Header (steps 1, 2, 3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 ${step === 1 ? 'text-amber-600 font-bold' : 'text-slate-500'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200'}`}>1</span>
              <span>Identificação</span>
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-1.5 ${step === 2 ? 'text-amber-600 font-bold' : 'text-slate-500'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200'}`}>2</span>
              <span>Entrega</span>
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-1.5 ${step === 3 ? 'text-amber-600 font-bold' : 'text-slate-500'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200'}`}>3</span>
              <span>Pagamento</span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: IDENTIFICAÇÃO */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">Seus Dados de Contato</h4>
                <p className="text-xs text-slate-500">Usado para emissão da Nota Fiscal e atualizações pelo WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp para Notificações</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CPF (para NF-e)</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Continuar para Entrega</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ENTREGA OU RETIRADA */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900">Como Deseja Receber Seus Materiais?</h4>
                <p className="text-xs text-slate-500">Escolha entre retirar na nossa loja de Macapá ou entrega no endereço da obra.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Retirada na Loja */}
                <div
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryType === 'pickup' ? 'border-amber-500 bg-amber-500/5 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-sm text-slate-900">Retirada na Loja Kazam</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Rodovia Duca Serra - Macapá/AP. Pronto para retirada em até 2 horas úteis.
                  </p>
                  <div className="mt-3 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded w-fit font-mono">
                    GRÁTIS
                  </div>
                </div>

                {/* Entrega Expressa */}
                <div
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryType === 'delivery' ? 'border-amber-500 bg-amber-500/5 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-sm text-slate-900">Entrega no Canteiro / Residência</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Caminhão próprio Kazam para Macapá e Santana. Prazo de 1 a 2 dias úteis.
                  </p>
                  <div className="mt-3 text-xs font-bold text-slate-900 font-mono">
                    Taxa: R$ 29,90
                  </div>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Endereço Completo de Entrega (com Ponto de Referência)
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  &larr; Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Ir para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FORMA DE PAGAMENTO */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900">Selecione a Forma de Pagamento</h4>
                <p className="text-xs text-slate-500">Pagamento 100% criptografado com garantia KAZAM.</p>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'pix' ? 'border-amber-500 bg-amber-500/10 text-slate-950' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span>PIX (10% OFF)</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'credit' ? 'border-amber-500 bg-amber-500/10 text-slate-950' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Cartão até 12x</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('boleto')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'boleto' ? 'border-amber-500 bg-amber-500/10 text-slate-950' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>Boleto Bancário</span>
                </button>
              </div>

              {/* PIX Details */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Aprovação Imediata via QR Code ou Chave Copia e Cola</span>
                  </div>
                  <p>
                    Ao clicar em "Confirmar Pedido", o QR Code oficial do Banco Central será gerado para pagamento instantâneo.
                  </p>
                </div>
              )}

              {/* Credit Card Details */}
              {paymentMethod === 'credit' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Validade</label>
                      <input type="text" placeholder="MM/AA" defaultValue="11/29" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" defaultValue="489" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Parcelamento</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                        <option key={n} value={n}>
                          {n}x de {formatCurrency(finalTotal / n)} sem juros
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Boleto Details */}
              {paymentMethod === 'boleto' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
                  <p>Vencimento em 3 dias úteis. Compensação bancária de 1 a 2 dias úteis.</p>
                </div>
              )}

              {/* Summary Card */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400">Total a Pagar ({deliveryType === 'pickup' ? 'Retirada Loja' : 'Com Entrega'}):</div>
                  <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                    {formatCurrency(finalTotal)}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ambiente Seguro</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  &larr; Voltar
                </button>
                <button
                  onClick={handleFinishOrder}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
                >
                  CONFIRMAR E GERAR PEDIDO
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMAÇÃO & QR CODE PIX */}
          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  PEDIDO REGISTRADO COM SUCESSO!
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Pedido #{orderCode}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enviamos os detalhes para <strong className="text-slate-800">{email}</strong> e no seu WhatsApp.
                </p>
              </div>

              {/* If PIX: Show QR Code & Copy button */}
              {paymentMethod === 'pix' && (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto space-y-4">
                  <div className="text-xs font-bold uppercase text-slate-700">
                    Pague com PIX para liberação imediata
                  </div>
                  
                  {/* Generated clean SVG QR code simulation */}
                  <div className="w-44 h-44 bg-white p-3 rounded-xl border border-slate-300 mx-auto flex items-center justify-center shadow-xs">
                    <QrCode className="w-36 h-36 text-slate-900" />
                  </div>

                  <div className="text-xs font-mono font-bold text-slate-900">
                    Valor: {formatCurrency(finalTotal)}
                  </div>

                  <button
                    onClick={handleCopyPix}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Chave Pix Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-amber-400" />
                        <span>Copiar Código Pix Copia e Cola</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <a
                  href={whatsappConfirmationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Avisar Vendedor Kazam no WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Voltar para a Loja
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
