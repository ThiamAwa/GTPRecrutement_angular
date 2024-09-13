export class Offre {
    id!: number;
    titre!: string;
    description!: string;
    competences!: string;
    experience!: string;
    lieu!: string;
    type_contrat!: string;
    date_debut!: Date;
    client?: {
      id: number;
      nom: string;
    };
    // client?: Client; // Optionnel pour inclure les informations du client avec l'offre


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

