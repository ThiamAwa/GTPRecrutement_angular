export interface User {
  id: number;
  name: string;
  email: string;
}
export class Offre {
    id!: number;
    titre!: string;
    description!: string;
    competences!: string;
    experience!: string;
    lieu!: string;
    type_contrat!: string;
    date_debut!: Date;
    client!: Client;
}

export interface Client {
  id: number;
  user_id: number;
  adresse: string;
  user: User;
}

// export interface Offre {
//   id: number;
//   titre: string;
//   lieu: string;
//   experience: number;
//   competences: string;
//   type_contrat: string;
//   description: string;
//   client: {
//     nom: string;
//   };
// }

