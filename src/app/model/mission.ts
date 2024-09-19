
export interface User {
  id: number;
  name: string;
  email: string;
}
export interface Mission {
  id: number;
  titre: string;
  description: string;
  date_debut: string;
  date_fin: string;
  status: string;
  consultant_id: number;
  client_id: number;
  consultantName?: string; // Ajout des propriétés optionnelles
  client: Client;
}
export interface Client {
  id: number;
  user_id: number;
  adresse: string;
  user: User;
}

