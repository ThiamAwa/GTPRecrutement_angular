
export interface User {
  id: number;
  name: string;
  email: string;
}

export class Consultant {
  id?: number; // L'ID est facultatif si vous ne l'utilisez pas encore
  adresse!: string;
  competences!: string;
  experiences!: string;
  status!: string;
  date_disponibilite!: string;
  statut_evaluation!: string;
  contrat!: string;
  notes_mission!: string;
  commentaires!: string;
  date_de_naissance!: string;
  missions_attribuees!: string;
  cv!: string;
  user!:User;
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
  consultant:Consultant; // Ajout des propriétés optionnelles
  client: Client;
}
export interface Client {
  id: number;
  user_id: number;
  adresse: string;
  user: User;
}



