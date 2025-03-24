
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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";

interface Livreur {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  city: string;
  transportMethod: string;
  createdAt: string;
}

// Récupérer les livreurs approuvés depuis le backend
const fetchLivreurs = async (): Promise<Livreur[]> => {
  const response = await apiClient.get<Livreur[]>("/users/deliverymen");
  return response.data;
};

const Livreurs = () => {
  const {
    data: livreurs,
    isLoading,
    isError,
    error,
  } = useQuery<Livreur[], Error>({
    queryKey: ["livreurs"],
    queryFn: fetchLivreurs,
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
          Erreur : {error?.message || "Impossible de charger les livreurs."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Livreurs
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
              <TableCell>Date d'approbation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livreurs?.map((livreur) => (
              <TableRow key={livreur.id}>
                <TableCell>{livreur.id}</TableCell>
                <TableCell>{`${livreur.firstName} ${livreur.lastName}`}</TableCell>
                <TableCell>{livreur.email}</TableCell>
                <TableCell>{livreur.telephone}</TableCell>
                <TableCell>{livreur.city}</TableCell>
                <TableCell>{livreur.transportMethod}</TableCell>
                <TableCell>
                  {new Date(livreur.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Livreurs;