// import axios from "axios";
// import { useMutation, UseMutationResult } from "@tanstack/react-query";

// const PARTENAIRE_API_URL = "https://api.example.com/demondePartenaire"; // Remplacez par votre URL API

// // Définition du type des données envoyées au serveur
// export interface PartenaireData {
//   etablissement: string;
//   typeEtablissement:
//     | "Restaurant"
//     | "pharmacie"
//     | "magasin_detail"
//     | "epicerie"
//     | "fleuriste"
//     | "autre";
//   sousTypeEtablissement: "service_seulement" | "livraison_service";
//   prenom: string;
//   phone: string;
//   email: string;
//   adresse: string;
//   description: string;
// }

// // Fonction asynchrone pour envoyer les données du partenaire
// const postPartenaire = async (data: PartenaireData): Promise<any> => {
//   const response = await axios.post(
//     `${PARTENAIRE_API_URL}/users/company-application`,
//     data
//   );
//   return response.data;
// };

// // Hook personnalisé avec typage correct
// export const usePostPartenaire = (): UseMutationResult<
//   any,
//   Error,
//   PartenaireData
// > => {
//   return useMutation({
//     mutationFn: postPartenaire,
//     onError: (error) => {
//       console.error("Erreur lors de l'envoi des données :", error);
//       alert("Une erreur s'est produite lors de l'envoi des données.");
//     },
//     onSuccess: () => {
//       alert("Demande soumise avec succès !");
//     },
//   });
// };

import apiClient from "./apiClient";
import { useMutation } from "@tanstack/react-query";

export interface PartenaireData {
  establishmentName: string;
  sector: string;
  establishmentType: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  address: string;
  description: string;
}

const postPartenaire = async (data: PartenaireData) => {
  // Adapter les types pour le backend
  const formattedData = {
    ...data,
    establishmentType:
      data.establishmentType === "service_seulement"
        ? "deliveryonly"
        : "fullservice",
  };

  await apiClient.post("/users/company-application", formattedData);
};

// Hook pour le composant
export const usePostPartenaire = () => {
  return useMutation({
    mutationFn: postPartenaire,
    onError: (error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      alert("Une erreur s'est produite lors de l'envoi des données.");
    },
    onSuccess: () => {
      alert("Demande soumise avec succès !");
    },
  });
};
