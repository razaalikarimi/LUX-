export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  sku: string;
  stock: number;
  images: string[];
  badge?: string | null;
  isFeatured: boolean;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
  };
  reviews?: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string | Date;
  items: {
    id: string;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}
