import { ShoppingBag, Ruler, User, Home, Search, ChevronRight, Star, Trash2, Plus, Minus, CreditCard } from 'lucide-react';

export type Category = 'Formal' | 'Ethnic' | 'Tailoring';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  rating: number;
}

export interface Fabric {
  id: string;
  name: string;
  pricePerMeter: number;
  image: string;
  type: string;
}

export interface MeasurementProfile {
  id: string;
  name: string;
  chest: number;
  shoulder: number;
  sleeveLength: number;
  waist: number;
  length: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  measurements: MeasurementProfile[];
}

export const DUMMY_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    addresses: [
      { id: 'a1', label: 'Home', address: '123, Pearl Residency, Ocean Drive, Mumbai, 400001' }
    ],
    measurements: [
      { id: 'm1', name: 'Standard Fit', chest: 40, shoulder: 18, sleeveLength: 25, waist: 34, length: 30 }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Blue Sherwani',
    price: 12999,
    category: 'Ethnic',
    image: 'https://picsum.photos/seed/sherwani1/400/600',
    description: 'Exquisite hand-embroidered sherwani for grand weddings.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Classic Charcoal Suit',
    price: 8499,
    category: 'Formal',
    image: 'https://picsum.photos/seed/suit1/400/600',
    description: 'Tailored fit charcoal grey suit for professional elegance.',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Ivory Silk Kurta',
    price: 3499,
    category: 'Ethnic',
    image: 'https://picsum.photos/seed/kurta1/400/600',
    description: 'Pure silk ivory kurta with subtle self-design.',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Midnight Navy Tuxedo',
    price: 15999,
    category: 'Formal',
    image: 'https://picsum.photos/seed/tux1/400/600',
    description: 'Premium wool blend tuxedo with satin lapels.',
    rating: 4.9
  },
  {
    id: '5',
    name: 'Emerald Green Bandhgala',
    price: 9999,
    category: 'Ethnic',
    image: 'https://picsum.photos/seed/bandh1/400/600',
    description: 'Traditional Jodhpuri suit in rich emerald velvet.',
    rating: 4.6
  }
];

export const FABRICS: Fabric[] = [
  {
    id: 'f1',
    name: 'Italian Wool',
    pricePerMeter: 2500,
    image: 'https://picsum.photos/seed/wool/200/200',
    type: 'Formal'
  },
  {
    id: 'f2',
    name: 'Banarasi Silk',
    pricePerMeter: 3500,
    image: 'https://picsum.photos/seed/silk/200/200',
    type: 'Ethnic'
  },
  {
    id: 'f3',
    name: 'Egyptian Cotton',
    pricePerMeter: 1200,
    image: 'https://picsum.photos/seed/cotton/200/200',
    type: 'Formal'
  },
  {
    id: 'f4',
    name: 'Linen Blend',
    pricePerMeter: 1800,
    image: 'https://picsum.photos/seed/linen/200/200',
    type: 'Casual/Formal'
  }
];
