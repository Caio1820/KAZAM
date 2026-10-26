import { CategoryItem } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'pisos-revestimentos',
    name: 'Pisos e Revestimentos',
    iconName: 'Layers',
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    description: 'Porcelanatos nobres, pisos cerâmicos e revestimentos elegantes para ambientes internos e externos.',
    subcategories: [
      'Porcelanatos',
      'Pisos Cerâmicos',
      'Vinílicos',
      'Revestimentos',
      'Pastilhas',
      'Rejuntes',
      'Argamassas e Acessórios'
    ]
  },
  {
    id: 'tintas-quimicos',
    name: 'Tintas e Químicos',
    iconName: 'Paintbrush',
    image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
    description: 'Cores que transformam com alta durabilidade, impermeabilizantes, massas e acabamentos impecáveis.',
    subcategories: [
      'Tintas para Parede',
      'Massas e Seladores',
      'Vernizes e Texturas',
      'Rolos e Trinchas',
      'Lixas e Abrasivos',
      'Colas e Adesivos',
      'Impermeabilizantes'
    ]
  },
  {
    id: 'iluminacao',
    name: 'Iluminação',
    iconName: 'Lightbulb',
    image: '/src/assets/images/category_lighting_fixtures_1793020440441.jpg',
    description: 'Design luminotécnico para valorizar cada canto com economia de energia e sofisticação.',
    subcategories: [
      'Painéis e Fitas de LED',
      'Pendentes e Lustres',
      'Luminárias de Teto',
      'Arandelas',
      'Lâmpadas LED',
      'Spots de Embutir'
    ]
  },
  {
    id: 'material-eletrico',
    name: 'Material Elétrico',
    iconName: 'Zap',
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    description: 'Segurança e eficiência com fios de cobre certificado, disjuntores, tomadas e quadros de distribuição.',
    subcategories: [
      'Fios e Cabos',
      'Disjuntores',
      'Tomadas e Interruptores',
      'Quadros Elétricos',
      'Caixas de Passagem'
    ]
  },
  {
    id: 'hidraulica-metais',
    name: 'Hidráulica e Metais',
    iconName: 'Droplet',
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    description: 'Sistemas hidráulicos resistentes, torneiras de alto padrão, duchas pressurizadas e caixas d\'água.',
    subcategories: [
      'Tubos e Conexões',
      'Torneiras Gourmet',
      'Duchas e Chuveiros',
      'Caixas d\'Água',
      'Registros e Válvulas'
    ]
  },
  {
    id: 'loucas-banheiro',
    name: 'Louças e Banheiro',
    iconName: 'Bath',
    image: '/src/assets/images/category_porcelain_tiles_1793020440599.jpg',
    description: 'Elegância e conforto com vasos sanitários monobloco, cubas de apoio e gabinetes modernos.',
    subcategories: [
      'Vasos Sanitários',
      'Cubas de Apoio',
      'Armários de Banheiro',
      'Assentos Sanitários',
      'Acessórios de Parede'
    ]
  },
  {
    id: 'ferramentas-equipamentos',
    name: 'Ferramentas e Equipamentos',
    iconName: 'Wrench',
    image: '/src/assets/images/category_paints_finishes_1793020440375.jpg',
    description: 'Ferramentas de alta durabilidade para profissionais da construção e reformas residenciais.',
    subcategories: [
      'Ferramentas Manuais',
      'Ferramentas Elétricas',
      'EPIs e Segurança',
      'Discos de Corte',
      'Maletas e Organização'
    ]
  },
  {
    id: 'portas-janelas-coberturas',
    name: 'Portas, Janelas e Coberturas',
    iconName: 'DoorOpen',
    image: '/src/assets/images/hero_construction_kazam_1793020439650.jpg',
    description: 'Aberturas sólidas, esquadrias de alumínio com vidro temperado, telhas e calhas de drenagem.',
    subcategories: [
      'Portas de Madeira',
      'Janelas de Alumínio',
      'Fechaduras e Puxadores',
      'Telhas Térmicas',
      'Calhas e Rufos'
    ]
  }
];
