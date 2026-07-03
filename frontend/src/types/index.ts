export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'vendor' | 'client' | 'affiliate';
  cpf?: string;
  phone?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  isBanned?: boolean;
  banUntil?: string;
  createdAt: Date;
}

export interface ProductComment {
  id: number;
  text: string;
  user: {
    id: number;
    name: string;
  };
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  rejectionReason?: string;
  creator?: User;
  seller?: User;
  image?: string;
  images?: string[];

  category?: string;

  categorias?: {
    id: number;
    nome: string;
  }[];

  categoriasIds?: number[];

  rating?: number;
  reviews?: number;
  inStock?: boolean;
  createdAt: Date;
  comments?: ProductComment[];
}

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerId: number;
  customer?: User;
  productId: number;
  product?: Product;
  affiliateId?: number;
  affiliate?: User;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthError {
  message: string;
  statusCode: number;
}
