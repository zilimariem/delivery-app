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

// interface CandidatPartenaire {
//   id: string;
//   establishmentName: string;
//   sector: string;
//   establishmentType: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   telephone: string;
//   address: string;
//   description: string;
//   createdAt: string;
// }

// const fakeCandidatsPartenaires: CandidatPartenaire[] = [
//   {
//     id: "1",
//     establishmentName: "Restaurant Le Gourmet",
//     sector: "Restaurant",
//     establishmentType: "service_seulement",
//     firstName: "Alice",
//     lastName: "Johnson",
//     email: "alice@example.com",
//     telephone: "11223344",
//     address: "123 Rue de la Paix, Tunis",
//     description: "Un restaurant de cuisine française.",
//     createdAt: "2023-10-01T12:00:00Z",
//   },
//   {
//     id: "2",
//     establishmentName: "Pharmacie Centrale",
//     sector: "pharmacie",
//     establishmentType: "livraison_service",
//     firstName: "Bob",
//     lastName: "Smith",
//     email: "bob@example.com",
//     telephone: "44332211",
//     address: "456 Avenue Habib Bourguiba, Sfax",
//     description: "Une pharmacie offrant des services de livraison.",
//     createdAt: "2023-10-02T12:00:00Z",
//   },
// ];

// const fetchCandidatsPartenaires = async (): Promise<CandidatPartenaire[]> => {
//   // Simule un délai de chargement de 1 seconde
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return fakeCandidatsPartenaires;
// };


// // const fetchCandidatsPartenaires = async (): Promise<CandidatPartenaire[]> => {
// //   const response = await apiClient.get<CandidatPartenaire[]>(
// //     "/users/company-applications"
// //   );
// //   return response.data;
// // };

// const CandidatsPartenaires = () => {
//   const {
//     data: candidats,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<CandidatPartenaire[], Error>({
//     queryKey: ["candidats-partenaires"],
//     queryFn: fetchCandidatsPartenaires,
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
//           {error?.message || "Impossible de charger les candidats partenaires."}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Candidats Partenaires
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Nom de l'établissement</TableCell>
//               <TableCell>Secteur</TableCell>
//               <TableCell>Type d'établissement</TableCell>
//               <TableCell>Nom</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Téléphone</TableCell>
//               <TableCell>Adresse</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Date de Candidature</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {candidats?.map((candidat) => (
//               <TableRow key={candidat.id}>
//                 <TableCell>{candidat.id}</TableCell>
//                 <TableCell>{candidat.establishmentName}</TableCell>
//                 <TableCell>{candidat.sector}</TableCell>
//                 <TableCell>{candidat.establishmentType}</TableCell>
//                 <TableCell>{`${candidat.firstName} ${candidat.lastName}`}</TableCell>
//                 <TableCell>{candidat.email}</TableCell>
//                 <TableCell>{candidat.telephone}</TableCell>
//                 <TableCell>{candidat.address}</TableCell>
//                 <TableCell>{candidat.description}</TableCell>
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

// export default CandidatsPartenaires;




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

interface CandidatPartenaire {
  id: string;
  establishmentName: string;
  sector: string;
  establishmentType: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  description: string;
  createdAt: string;
}

// Récupérer les candidats partenaires depuis le backend
const fetchCandidatsPartenaires = async (): Promise<CandidatPartenaire[]> => {
  const response = await apiClient.get("/company-applications");
  return response.data;
};

// Accepter un candidat partenaire
const acceptCandidatPartenaire = async (id: string): Promise<void> => {
  await apiClient.post(`/company-applications/${id}/accept`);
};

// Refuser un candidat partenaire
const rejectCandidatPartenaire = async (id: string): Promise<void> => {
  await apiClient.post(`/company-applications/${id}/reject`);
};

const CandidatsPartenaires = () => {
  const queryClient = useQueryClient();

  const {
    data: candidats,
    isLoading,
    isError,
    error,
  } = useQuery<CandidatPartenaire[], Error>({
    queryKey: ["candidats-partenaires"],
    queryFn: fetchCandidatsPartenaires,
  });

  const acceptMutation = useMutation({
    mutationFn: acceptCandidatPartenaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidats-partenaires"] }); // Recharger les données après acceptation
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectCandidatPartenaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidats-partenaires"] });// Recharger les données après refus
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
          {error?.message || "Impossible de charger les candidats partenaires."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Candidats Partenaires
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom de l'établissement</TableCell>
              <TableCell>Secteur</TableCell>
              <TableCell>Type d'établissement</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date de Candidature</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidats?.map((candidat) => (
              <TableRow key={candidat.id}>
                <TableCell>{candidat.id}</TableCell>
                <TableCell>{candidat.establishmentName}</TableCell>
                <TableCell>{candidat.sector}</TableCell>
                <TableCell>{candidat.establishmentType}</TableCell>
                <TableCell>{`${candidat.firstName} ${candidat.lastName}`}</TableCell>
                <TableCell>{candidat.email}</TableCell>
                <TableCell>{candidat.telephone}</TableCell>
                <TableCell>{candidat.address}</TableCell>
                <TableCell>{candidat.description}</TableCell>
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

export default CandidatsPartenaires;