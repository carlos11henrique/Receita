const API_URL = 'http://localhost:3000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: 'client' | 'affiliate' | 'vendor' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

export interface RecipeCreateData {
  titulo: string;
  descricao: string;
  modoPreparo: string;
  preco: number;
  imageUrl?: string;
  categoriasIds?: number[];
}

export interface RecipeResponse {
  id: number;
  titulo: string;
  descricao: string;
  modoPreparo: string;
  preco: number;
  imageUrl?: string;
  categorias?: Array<{ id: number; nome: string }>;
  criador?: { id: number; nome: string };
}

class ApiService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Falha ao fazer login');
    }

    return response.json();
  }

  async register(credentials: RegisterCredentials): Promise<{ id: number; name: string; email: string }> {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar conta');
    }

    return response.json();
  }

  async fetchRecipes(): Promise<RecipeResponse[]> {
    const response = await fetch(`${API_URL}/receita`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao carregar receitas');
    }

    return response.json();
  }

  async createRecipe(recipe: RecipeCreateData): Promise<RecipeResponse> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/receita`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar receita');
    }

    return response.json();
  }
}

export default new ApiService();
