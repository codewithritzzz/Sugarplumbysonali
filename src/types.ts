export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'birthday' | 'wedding' | 'pastries' | 'cupcakes' | 'macarons' | 'custom';
  image: string;
  flavors: string[];
  sizes: { label: string; multiplier: number }[];
  allergens: string[];
  badge?: string;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedSize: string;
  message?: string;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  deliveryType: 'delivery' | 'pickup';
  scheduledDate?: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  status: 'confirmed' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'cakes' | 'wedding' | 'cupcakes' | 'pastries' | 'bakery';
}
