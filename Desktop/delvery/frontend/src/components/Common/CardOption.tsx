import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface CardOptionProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
}

const CardOption = ({
  title,
  description,
  buttonText,
  image,
  link,
}: CardOptionProps) => {
  return (
    <Card
      sx={{
        maxWidth: 300, // Largeur réduite
        textAlign: "center",
        borderRadius: "12px", // Bords arrondis
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombre légère
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Animation au survol
        "&:hover": {
          transform: "scale(1.05)", // Agrandissement léger au survol
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Ombre plus prononcée au survol
        },
      }}
    >
      {/* Image de la carte */}
      <CardMedia
        component="img"
        height="235" // Hauteur augmentée
        image={image}
        alt={title}
        sx={{
          objectFit: "cover", // Assure que l'image couvre toute la zone sans déformation
          borderTopLeftRadius: "12px", // Bords arrondis en haut
          borderTopRightRadius: "12px", // Bords arrondis en haut
        }}
      />

      {/* Contenu de la carte */}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1976d2", // Couleur du bouton
            "&:hover": {
              backgroundColor: "#1565c0", // Couleur au survol
            },
          }}
          component={Link}
          to={link}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardOption;
