import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'kzm-001',
    name: 'Porcelanato Calacatta Gold Polido 84x84cm Retificado',
    category: 'pisos-revestimentos',
    subcategory: 'Porcelanatos',
    brand: 'Portobello',
    sku: 'PB-CAL-8484P',
    price: 139.90,
    pixPrice: 125.91, // 10% off
    installments: {
      max: 10,
      value: 13.99,
    },
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    gallery: [
      '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
      '/src/assets/images/hero_construction_kazam_1793020439650.jpg'
    ],
    rating: 4.9,
    reviewsCount: 48,
    finish: 'Polido',
    usage: 'Interno',
    dimensions: '84 x 84 cm',
    unit: 'm²',
    coveragePerBox: 2.12, // 2.12 m² por caixa
    piecesPerBox: 3,
    weight: '24.5 kg / cx',
    description: 'O Porcelanato Calacatta Gold reproduz com extrema fidelidade a sofisticação dos mármores italianos, trazendo veios dourados e cinzas sobre um fundo branco luminoso. Borda retificada que permite juntas mínimas de 1,5mm.',
    technicalSpecs: {
      'Formato': '84cm x 84cm',
      'Acabamento': 'Polido Brilhante',
      'Borda': 'Retificada (Junta 1,5mm)',
      'Espessura': '9,5 mm',
      'Metragem por Caixa': '2,12 m²',
      'Peças por Caixa': '3 peças',
      'Local de Uso': 'LC - Ambientes residenciais internos sem acesso direto para a rua.'
    },
    installationTips: [
      'Utilize argamassa tipo AC-III Branca para assentamento de porcelanatos claros.',
      'Recomenda-se adicionar 10% de margem extra para recortes e paginação.',
      'Aguarde 72h após o assentamento para efetuar o rejuntamento com junta de 1,5mm.'
    ],
    inStock: true,
    featured: true,
    isBestSeller: true
  },
  {
    id: 'kzm-002',
    name: 'Porcelanato Cimento Cinza Acetinado 70x70cm Retificado',
    category: 'pisos-revestimentos',
    subcategory: 'Porcelanatos',
    brand: 'Eliane',
    sku: 'EL-CIM-7070A',
    price: 89.90,
    pixPrice: 80.91,
    installments: {
      max: 10,
      value: 8.99,
    },
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    gallery: [
      '/src/assets/images/category_porcelain_tiles_1793020440599.jpg'
    ],
    rating: 4.8,
    reviewsCount: 32,
    finish: 'Acetinado',
    usage: 'Interno',
    dimensions: '70 x 70 cm',
    unit: 'm²',
    coveragePerBox: 1.96,
    piecesPerBox: 4,
    weight: '21.0 kg / cx',
    description: 'Estética contemporânea com toque suave de cimento queimado acetinado. Ideal para salas, cozinhas integradas e corredores. Não reflete luz direta e é fácil de limpar.',
    technicalSpecs: {
      'Formato': '70cm x 70cm',
      'Acabamento': 'Acetinado Soft Touch',
      'Borda': 'Retificada',
      'Espessura': '8,5 mm',
      'Metragem por Caixa': '1,96 m²',
      'Local de Uso': 'LD - Ambientes residenciais e comerciais médios.'
    },
    installationTips: [
      'Aplique dupla colagem para formatos acima de 60x60cm.',
      'Use niveladores de piso para garantir planicidade impecável.'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'kzm-003',
    name: 'Tinta Acrílica Premium Toque de Seda Branco Neve 18L',
    category: 'tintas-quimicos',
    subcategory: 'Tintas para Parede',
    brand: 'Suvinil',
    sku: 'SUV-TDS-18LBN',
    price: 459.90,
    pixPrice: 413.91,
    installments: {
      max: 10,
      value: 45.99,
    },
    image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
    gallery: [
      '/src/assets/images/category_paints_finishes_1793020440375.jpg'
    ],
    rating: 4.9,
    reviewsCount: 67,
    finish: 'Acetinado',
    usage: 'Interno',
    dimensions: 'Balde 18 Litros',
    unit: 'lata',
    weight: '26.8 kg',
    description: 'A Tinta Suvinil Toque de Seda oferece acabamento acetinado com brilho suave e elegância duradoura. Fácil de limpar e disfarça imperfeições nas paredes.',
    technicalSpecs: {
      'Volume': '18 Litros',
      'Rendimento': 'Até 330 m² por demão',
      'Secagem ao Toque': '2 horas',
      'Secagem Final': '12 horas',
      'Demãos Recomendadas': '2 a 3 demãos',
      'Diluição': 'Água potável até 20%'
    },
    installationTips: [
      'A parede deve estar limpa, sem poeira ou umidade residual.',
      'Utilize rolo de lã de pelo baixo (anti-respingo) para acabamento uniforme.'
    ],
    inStock: true,
    featured: true,
    isBestSeller: true
  },
  {
    id: 'kzm-004',
    name: 'Impermeabilizante Vedacit Vedatop Caixa 18kg',
    category: 'tintas-quimicos',
    subcategory: 'Impermeabilizantes',
    brand: 'Vedacit',
    sku: 'VED-TOP-18KG',
    price: 119.50,
    pixPrice: 107.55,
    installments: {
      max: 6,
      value: 19.91,
    },
    image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
    gallery: [
      '/src/assets/images/category_paints_finishes_1793020440375.jpg'
    ],
    rating: 4.9,
    reviewsCount: 29,
    finish: 'Fosco',
    usage: 'Geral',
    dimensions: 'Caixa 18kg (Componente A+B)',
    unit: 'cx',
    weight: '18 kg',
    description: 'Argamassa polimérica impermeabilizante ideal para caixas d\'água, reservatórios, baldrames, poços de elevadores, piscinas e rodapés de alvenaria.',
    technicalSpecs: {
      'Peso': '18 kg',
      'Consumo Médio': '3 a 4 kg/m² em 3 a 4 demãos cruzadas',
      'Aplicação': 'Trincha retangular ou vassoura de pelo macio'
    },
    installationTips: [
      'Umedeça a superfície antes de aplicar cada demão sem encharcar.',
      'Aplique as demãos em sentido cruzado respeitando o intervalo de 2 a 4 horas.'
    ],
    inStock: true
  },
  {
    id: 'kzm-005',
    name: 'Pendente Linear Led Slim 120cm 40W Preto 3000K Branco Quente',
    category: 'iluminacao',
    subcategory: 'Pendentes e Lustres',
    brand: 'Nordecor',
    sku: 'ND-LIN-120BK',
    price: 289.00,
    pixPrice: 260.10,
    installments: {
      max: 8,
      value: 36.12,
    },
    image: '/src/assets/images/category_lighting_fixtures_1793020440441.jpg',
    gallery: [
      '/src/assets/images/category_lighting_fixtures_1793020440441.jpg'
    ],
    rating: 5.0,
    reviewsCount: 19,
    finish: 'Metalizado',
    usage: 'Interno',
    dimensions: '120 x 4 x 6 cm - Cabo 1,5m ajustável',
    unit: 'un',
    weight: '1.8 kg',
    description: 'Design minimalista em alumínio extrudado na cor preta fosca. Foco suave e difusor acrílico leitoso anti-ofuscamento. Perfeito para bancadas de cozinha americana e mesas de jantar.',
    technicalSpecs: {
      'Potência': '40W LED Integrado',
      'Temperatura de Cor': '3000K (Luz Quente Aconchegante)',
      'Fluxo Luminoso': '3200 lumens',
      'Tensão': 'Bivolt Automático (110V - 220V)',
      'Material': 'Alumínio de alta precisão e difusor PMMA'
    },
    installationTips: [
      'A altura recomendada sobre a bancada é de 75cm a 90cm.',
      'Cabo de sustentação de aço ajustável na canopla.'
    ],
    inStock: true,
    featured: true,
    isNewArrival: true
  },
  {
    id: 'kzm-006',
    name: 'Painel Plafon LED Embutir 24W Quadrado 30x30cm 6500K Elgin',
    category: 'iluminacao',
    subcategory: 'Painéis e Fitas de LED',
    brand: 'Elgin',
    sku: 'ELG-PLF-24W',
    price: 34.90,
    pixPrice: 31.41,
    installments: {
      max: 3,
      value: 11.63,
    },
    image: '/src/assets/images/category_lighting_fixtures_1793020440441.jpg',
    gallery: [
      '/src/assets/images/category_lighting_fixtures_1793020440441.jpg'
    ],
    rating: 4.7,
    reviewsCount: 88,
    finish: 'Fosco',
    usage: 'Interno',
    dimensions: '30 x 30 x 2 cm',
    unit: 'un',
    weight: '0.45 kg',
    description: 'Economia imediata de até 85% na conta de luz. Acabamento slim com presilhas em aço para forros de gesso ou PVC.',
    technicalSpecs: {
      'Potência': '24W',
      'Temperatura': '6500K (Branco Frio)',
      'Fluxo': '1680 lm',
      'Nicho': '28,5 x 28,5 cm'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'kzm-007',
    name: 'Cabo Flexível 2,5mm² 750V Rolo 100 Metros Antichama Preto',
    category: 'material-eletrico',
    subcategory: 'Fios e Cabos',
    brand: 'Sil Fios',
    sku: 'SIL-CAB-25BK',
    price: 198.00,
    pixPrice: 178.20,
    installments: {
      max: 6,
      value: 33.00,
    },
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    gallery: [
      '/src/assets/images/hero_construction_kazam_1793020439650.jpg'
    ],
    rating: 4.9,
    reviewsCount: 52,
    finish: 'Fosco',
    usage: 'Geral',
    dimensions: '100 Metros',
    unit: 'rolo',
    weight: '3.1 kg',
    description: 'Cobre 100% eletrolítico certificado pelo INMETRO. Capa isolante em PVC antichama BWF-B. Indispensável para tomadas residenciais de até 20A.',
    technicalSpecs: {
      'Seção Nominal': '2,5 mm²',
      'Tensão': '750V',
      'Comprimento': '100 metros',
      'Norma': 'NBR NM 247-3'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'kzm-008',
    name: 'Torneira Gourmet Monocomando Cozinha Escovada Docol Nova',
    category: 'hidraulica-metais',
    subcategory: 'Torneiras Gourmet',
    brand: 'Docol',
    sku: 'DOC-GM-ESC',
    price: 529.00,
    pixPrice: 476.10,
    installments: {
      max: 10,
      value: 52.90,
    },
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    gallery: [
      '/src/assets/images/hero_construction_kazam_1793020439650.jpg'
    ],
    rating: 4.9,
    reviewsCount: 36,
    finish: 'Metalizado',
    usage: 'Interno',
    dimensions: 'Altura 48cm x Bica Flexível',
    unit: 'un',
    weight: '2.6 kg',
    description: 'Acabamento em inox escovado resistente à corrosão e manchas d\'água. Ducha retrátil com duas opções de jato: aerado suave e ducha concentrada para panelas.',
    technicalSpecs: {
      'Tipo': 'Monocomando Quente / Frio',
      'Bitola': '1/2"',
      'Pressão Mínima': '4 m.c.a',
      'Garantia': 'Garantia Toda Vida Docol'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'kzm-009',
    name: 'Chuveiro Lorenzetti Acqua Duo Ultra Black 7800W 220V',
    category: 'hidraulica-metais',
    subcategory: 'Duchas e Chuveiros',
    brand: 'Lorenzetti',
    sku: 'LOR-ACQ-DUO',
    price: 439.00,
    pixPrice: 395.10,
    installments: {
      max: 10,
      value: 43.90,
    },
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    gallery: [
      '/src/assets/images/hero_construction_kazam_1793020439650.jpg'
    ],
    rating: 4.8,
    reviewsCount: 114,
    finish: 'Fosco',
    usage: 'Interno',
    dimensions: 'Comprimento 52cm x Largura 21cm',
    unit: 'un',
    weight: '2.2 kg',
    description: 'Design sofisticado com acabamento preto fosco. Duo sistema: chuveiro de jato amplo e ducha direcionável no mesmo aparelho. Resistência Loren Ultra de alta durabilidade.',
    technicalSpecs: {
      'Potência': '7800W',
      'Tensão': '220V',
      'Comando': 'Eletrônico Gradual de Temperatura',
      'Compatibilidade': 'Solares e a gás'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'kzm-010',
    name: 'Bacia com Caixa Acoplada Clean Dual Flush Deca Branca',
    category: 'loucas-banheiro',
    subcategory: 'Vasos Sanitários',
    brand: 'Deca',
    sku: 'DEC-CLN-CX',
    price: 749.00,
    pixPrice: 674.10,
    installments: {
      max: 10,
      value: 74.90,
    },
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    gallery: [
      '/src/assets/images/category_porcelain_tiles_1793020440599.jpg'
    ],
    rating: 4.9,
    reviewsCount: 42,
    finish: 'Brilhante',
    usage: 'Interno',
    dimensions: '64 x 36 x 78 cm',
    unit: 'un',
    weight: '34 kg',
    description: 'Linha Clean Deca com design neutro e fácil limpeza. Acionamento Dual Flush 3/6 litros com economia de até 60% no consumo de água.',
    technicalSpecs: {
      'Sistema de Descarga': 'Dual Flush 3/6L',
      'Material': 'Louça Sanitária Vitrificada',
      'Saída': 'Vertical 30cm padrão'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'kzm-011',
    name: 'Cuba de Apoio Redonda Cerâmica 35cm Slim Preta Fosca',
    category: 'loucas-banheiro',
    subcategory: 'Cubas de Apoio',
    brand: 'Incepa',
    sku: 'INC-CB-35BK',
    price: 249.00,
    pixPrice: 224.10,
    installments: {
      max: 6,
      value: 41.50,
    },
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    gallery: [
      '/src/assets/images/category_porcelain_tiles_1793020440599.jpg'
    ],
    rating: 4.8,
    reviewsCount: 23,
    finish: 'Fosco',
    usage: 'Interno',
    dimensions: 'Diâmetro 35cm x Altura 13cm',
    unit: 'un',
    weight: '5.4 kg',
    description: 'Borda ultrafina com acabamento acetinado fosco no tom preto carvão. Confere ar de spa ao lavabo ou banheiro principal.',
    technicalSpecs: {
      'Formato': 'Redondo',
      'Material': 'Cerâmica esmaltada de alta densidade',
      'Furação': 'Válvula 1.1/4"'
    },
    inStock: true
  },
  {
    id: 'kzm-012',
    name: 'Furadeira e Parafusadeira de Impacto 12V Bateria Tramontina PRO',
    category: 'ferramentas-equipamentos',
    subcategory: 'Ferramentas Elétricas',
    brand: 'Tramontina',
    sku: 'TRA-PRF-12V',
    price: 369.00,
    pixPrice: 332.10,
    installments: {
      max: 10,
      value: 36.90,
    },
    image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
    gallery: [
      '/src/assets/images/category_paints_finishes_1793020440375.jpg'
    ],
    rating: 4.9,
    reviewsCount: 51,
    finish: 'Fosco',
    usage: 'Geral',
    dimensions: 'Maleta com 13 acessórios',
    unit: 'un',
    weight: '2.1 kg',
    description: 'Mandril de aperto rápido sem chave de 10mm (3/8"). Bateria de Íons de Lítio sem efeito memória com indicador de carga e luz LED auxiliar.',
    technicalSpecs: {
      'Torque Máximo': '30 Nm',
      'Velocidade': '0-400 / 0-1400 RPM',
      'Função Impacto': 'Sim (Alvenaria)'
    },
    inStock: true,
    isBestSeller: true
  }
];

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
export const FINISHES = ['Polido', 'Acetinado', 'Fosco', 'Brilhante', 'Metalizado'];
export const USAGES = ['Interno', 'Externo', 'Piso', 'Parede', 'Geral'];
