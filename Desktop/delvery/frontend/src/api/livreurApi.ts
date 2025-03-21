import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface LivreurData {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  gender: string;
  ville: string;
  cv: FileList;
  transport: string;
}

const postLivreur = async (data: LivreurData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "cv") {
      formData.append(key, value[0]);
    } else {
      formData.append(key, value as string);
    }
  });

  await axios.post("http://localhost:3000/demondelivreurs", formData);
};

// Hook pour l'utilisation dans le composant
export const usePostLivreur = () => {
  return useMutation({
    mutationFn: postLivreur,
  });
};
