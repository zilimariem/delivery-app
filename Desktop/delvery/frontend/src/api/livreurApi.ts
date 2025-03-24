// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export interface LivreurData {
//   lastname: string;
//   firstname: string;
//   email: string;
//   phone: string;
//   gender: string;
//   ville: string;
//   cv: FileList;
//   transport: string;
// }

// const postLivreur = async (data: LivreurData) => {
//   const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) => {
//     if (key === "cv") {
//       formData.append(key, value[0]);
//     } else {
//       formData.append(key, value as string);
//     }
//   }); await axios.post(
//     "http://localhost:3000/users/deliveryman-application",
//     formData
//   );

// };

// // Hook pour l'utilisation dans le composant
// export const usePostLivreur = () => {
//   return useMutation({
//     mutationFn: postLivreur,
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

export interface LivreurData {
  firstName: string;
  lastName: string;
  telephone: string;
  gender: string;
  city: string;
  cv: File; // Changed from FileList to File to match what we're sending
  transportMethod: string;
  email: string;
}

const postLivreur = async (data: LivreurData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "cv") {
      formData.append(key, value);
    } else {
      formData.append(key, value as string);
    }
  });

  await apiClient.post("/users/deliveryman-application", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Hook pour l'utilisation dans le composant
export const usePostLivreur = () => {
  return useMutation({
    mutationFn: postLivreur,
    onError: (error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      alert("Une erreur s'est produite lors de l'envoi des données.");
    },
    onSuccess: () => {
      alert("Demande soumise avec succès !");
    },
  });
};

