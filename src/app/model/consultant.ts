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
