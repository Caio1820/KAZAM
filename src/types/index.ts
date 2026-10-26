export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  price: number; // Regular price
  pixPrice: number; // Discounted PIX price (usually ~5-10% off)
  installments: {
    max: number;
    value: number;
  };
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  finish?: 'Polido' | 'Acetinado' | 'Fosco' | 'Brilhante' | 'Rústico' | 'Metalizado';
  usage?: 'Interno' | 'Externo' | 'Piso' | 'Parede' | 'Geral';
  dimensions?: string;
  unit: 'm²' | 'un' | 'cx' | 'lata' | 'rolo' | 'kg';
  // Specific for floors/coverings calculator
  coveragePerBox?: number; // m² per box (e.g., 2.16 m²)
  piecesPerBox?: number;
  weight?: string;
  description: string;
  technicalSpecs: Record<string, string>;
  installationTips?: string[];
  inStock: boolean;
  featured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  calculatedBoxes?: number;
  calculatedArea?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  image?: string;
  description?: string;
  subcategories: string[];
}

export interface FilterState {
  category: string | null;
  subcategory: string | null;
  brand: string[];
  finish: string[];
  usage: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'alphabetical';
}

export interface OrderTrackingInfo {
  code: string;
  customerName: string;
  date: string;
  status: 'Confirmado' | 'Em Separação' | 'Pronto para Retirada' | 'Em Rota de Entrega' | 'Entregue';
  estimatedDelivery: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  deliveryType: 'Retirada na Loja' | 'Entrega Expressa Kazam';
  address?: string;
}
