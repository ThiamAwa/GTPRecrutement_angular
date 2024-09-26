export interface User {
  id: number;
  name: string;
  email: string;
}
export class Candidat {
    id?: number;
    email !: string;
    adresse !: string;
    status !: string;
    date_de_candidature!: string;
    statut_evaluation!: string;
    date_de_naissance!: string;
    lm!:null;
    cv!: null;
    experience!:string;
    competences!:string;
    offre?: {
      id: number;
      titre: string;
    };
    user!:User


}
