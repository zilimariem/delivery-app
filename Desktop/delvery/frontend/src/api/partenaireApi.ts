import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const PARTENAIRE_API_URL = "https://api.example.com/demondePartenaire"; // Remplacez par votre URL API

// Définition du type des données envoyées au serveur
export interface PartenaireData {
  etablissement: string;
  typeEtablissement:
    | "Restaurant"
    | "pharmacie"
    | "magasin_detail"
    | "epicerie"
    | "fleuriste"
    | "autre";
  sousTypeEtablissement: "service_seulement" | "livraison_service";
  prenom: string;
  phone: string;
  email: string;
  adresse: string;
  description: string;
}

// Fonction asynchrone pour envoyer les données du partenaire
const postPartenaire = async (data: PartenaireData): Promise<any> => {
  const response = await axios.post(`${PARTENAIRE_API_URL}/register`, data);
  return response.data;
};

// Hook personnalisé avec typage correct
export const usePostPartenaire = (): UseMutationResult<
  any,
  Error,
  PartenaireData
> => {
  return useMutation({
    mutationFn: postPartenaire,
  });
};
