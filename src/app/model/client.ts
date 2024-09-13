export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Client {
  id: number;
  user_id: number;
  adresse: string;
  user: User; 
}

