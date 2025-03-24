
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { useQuery } from "@tanstack/react-query";
// // import apiClient from "../api/apiClient";

// interface CandidatLivreur {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   telephone: string;
//   city: string;
//   transportMethod: string;
//   createdAt: string;
// }




// const fakeCandidatsLivreurs: CandidatLivreur[] = [
//   {
//     id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john@example.com",
//     telephone: "12345678",
//     city: "Tunis",
//     transportMethod: "voiture",
//     createdAt: "2023-10-01T12:00:00Z",
//   },
//   {
//     id: "2",
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     telephone: "87654321",
//     city: "Sfax",
//     transportMethod: "moto",
//     createdAt: "2023-10-02T12:00:00Z",
//   },
// ];

// const fetchCandidatsLivreurs = async (): Promise<CandidatLivreur[]> => {
//   // Simule un délai de chargement de 1 seconde
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return fakeCandidatsLivreurs;
// };


// // const fetchCandidatsLivreurs = async (): Promise<CandidatLivreur[]> => {
// //   const response = await apiClient.get<CandidatLivreur[]>(
// //     "/users/deliveryman-applications"
// //   );
// //   return response.data;
// // };

// const CandidatsLivreurs = () => {
//   const {
//     data: candidats,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<CandidatLivreur[], Error>({
//     queryKey: ["candidats-livreurs"],
//     queryFn: fetchCandidatsLivreurs,
//   });

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Typography color="error">
//           Erreur :{" "}
//           {error?.message || "Impossible de charger les candidats livreurs."}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Candidats Livreurs
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Nom</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Téléphone</TableCell>
//               <TableCell>Ville</TableCell>
//               <TableCell>Moyen de Transport</TableCell>
//               <TableCell>Date de Candidature</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {candidats?.map((candidat) => (
//               <TableRow key={candidat.id}>
//                 <TableCell>{candidat.id}</TableCell>
//                 <TableCell>{`${candidat.firstName} ${candidat.lastName}`}</TableCell>
//                 <TableCell>{candidat.email}</TableCell>
//                 <TableCell>{candidat.telephone}</TableCell>
//                 <TableCell>{candidat.city}</TableCell>
//                 <TableCell>{candidat.transportMethod}</TableCell>
//                 <TableCell>
//                   {new Date(candidat.createdAt).toLocaleDateString()}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default CandidatsLivreurs;



import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

interface CandidatLivreur {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  city: string;
  transportMethod: string;
  createdAt: string;
}

// Récupérer les candidats livreurs depuis le backend
const fetchCandidatsLivreurs = async (): Promise<CandidatLivreur[]> => {
  const response = await apiClient.get("/deliveryman-applications");
  return response.data;
};

// Accepter un candidat livreur
const acceptCandidatLivreur = async (id: string): Promise<void> => {
  await apiClient.post(`/deliveryman-applications/${id}/accept`);
};

// Refuser un candidat livreur
const rejectCandidatLivreur = async (id: string): Promise<void> => {
  await apiClient.post(`/deliveryman-applications/${id}/reject`);
};

const CandidatsLivreurs = () => {
  const queryClient = useQueryClient();

  const {
    data: candidats,
    isLoading,
    isError,
    error,
  } = useQuery<CandidatLivreur[], Error>({
    queryKey: ["candidats-livreurs"],
    queryFn: fetchCandidatsLivreurs,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptCandidatLivreur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidats-livreurs"] }); // Recharger les données après acceptation
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectCandidatLivreur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidats-livreurs"] }); // Recharger les données après refus
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">
          Erreur :{" "}
          {error?.message || "Impossible de charger les candidats livreurs."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Candidats Livreurs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Moyen de Transport</TableCell>
              <TableCell>Date de Candidature</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidats?.map((candidat) => (
              <TableRow key={candidat.id}>
                <TableCell>{candidat.id}</TableCell>
                <TableCell>{`${candidat.firstName} ${candidat.lastName}`}</TableCell>
                <TableCell>{candidat.email}</TableCell>
                <TableCell>{candidat.telephone}</TableCell>
                <TableCell>{candidat.city}</TableCell>
                <TableCell>{candidat.transportMethod}</TableCell>
                <TableCell>
                  {new Date(candidat.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => acceptMutation.mutate(candidat.id)}
                    sx={{ mr: 1 }}
                  >
                    Accepter
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => rejectMutation.mutate(candidat.id)}
                  >
                    Refuser
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CandidatsLivreurs;