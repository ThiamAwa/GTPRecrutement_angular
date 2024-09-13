
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
  clientName?: string;
}

