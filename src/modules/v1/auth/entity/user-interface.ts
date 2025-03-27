
export interface UserInterface {
  id: number;
  firstname: string;
  lastname: string;
  email: string ;
  phone: string;
  role: string;
  avatar: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface MasterInterface {
  id: number;
  category_id: number;
  experience: number;
  rating: number;
  min_price: number;
  max_price: number;
  address: string;
  latitude: number;
  longitude: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}