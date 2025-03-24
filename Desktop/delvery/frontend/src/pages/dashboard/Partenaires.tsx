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

interface Partenaire {
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

// Récupérer les partenaires approuvés depuis le backend
const fetchPartenaires = async (): Promise<Partenaire[]> => {
  const response = await apiClient.get<Partenaire[]>("/users/companies");
  return response.data;
};

const Partenaires = () => {
  const {
    data: partenaires,
    isLoading,
    isError,
    error,
  } = useQuery<Partenaire[], Error>({
    queryKey: ["partenaires"],
    queryFn: fetchPartenaires,
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
          Erreur : {error?.message || "Impossible de charger les partenaires."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Partenaires
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
              <TableCell>Date d'approbation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partenaires?.map((partenaire) => (
              <TableRow key={partenaire.id}>
                <TableCell>{partenaire.id}</TableCell>
                <TableCell>{partenaire.establishmentName}</TableCell>
                <TableCell>{partenaire.sector}</TableCell>
                <TableCell>{partenaire.establishmentType}</TableCell>
                <TableCell>{`${partenaire.firstName} ${partenaire.lastName}`}</TableCell>
                <TableCell>{partenaire.email}</TableCell>
                <TableCell>{partenaire.telephone}</TableCell>
                <TableCell>{partenaire.address}</TableCell>
                <TableCell>{partenaire.description}</TableCell>
                <TableCell>
                  {new Date(partenaire.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Partenaires;
