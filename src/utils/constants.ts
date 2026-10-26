export const KAZAM_INFO = {
  name: 'KAZAM Materiais de Construção',
  shortName: 'KAZAM',
  tagline: 'Da Fundação ao Acabamento com a Melhor Condição',
  logoUrl: 'https://i.postimg.cc/DfxyKn0S/IMG-9686.jpg',
  whatsappPhone: '(96) 99112-1818',
  whatsappRaw: '5596991121818',
  whatsappLink: 'https://wa.me/5596991121818',
  instagramHandle: '@kazamconstrucao',
  instagramLink: 'https://www.instagram.com/kazamconstrucao',
  mapsLink: 'https://maps.app.goo.gl/MVCh69cAEbKAHxtp6',
  address: 'Rod. Duca Serra - Macapá, AP - Atendimento Amapá e Região',
  cnpj: '38.412.980/0001-92',
  workingHours: 'Segunda a Sexta: 07:30 às 18:00 | Sábado: 07:30 às 13:00'
};

export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};

export const buildProductWhatsAppLink = (productName: string, sku: string, price: number): string => {
  const text = encodeURIComponent(
    `Olá equipe Kazam! Vi no site o produto *${productName}* (SKU: ${sku}) por ${formatCurrency(price)} e gostaria de tirar dúvidas sobre estoque e condições de pagamento.`
  );
  return `https://wa.me/${KAZAM_INFO.whatsappRaw}?text=${text}`;
};

export const buildOrderWhatsAppLink = (orderCode: string, customerName: string, total: number): string => {
  const text = encodeURIComponent(
    `Olá Kazam! Realizei o pedido *#${orderCode}* no site em nome de ${customerName} no valor de ${formatCurrency(total)}. Gostaria de confirmar o pagamento e entrega.`
  );
  return `https://wa.me/${KAZAM_INFO.whatsappRaw}?text=${text}`;
};

export const buildQuoteWhatsAppLink = (listText: string, customerName?: string): string => {
  const intro = customerName ? `Olá Kazam, sou ${customerName}.` : 'Olá Kazam!';
  const text = encodeURIComponent(
    `${intro} Gostaria de solicitar um orçamento para minha lista de materiais de construção:\n\n${listText}`
  );
  return `https://wa.me/${KAZAM_INFO.whatsappRaw}?text=${text}`;
};
