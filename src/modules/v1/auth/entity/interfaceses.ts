export interface TokenPayloadInterface { 
  id: number;
  role: string;
  email: string;
  iat?: number; // issued at
  exp?: number; // expiration
  // [key: string]: string; 
}