import Navbar from "../../components/Common/Navbar";
import CardOption from "../../components/Common/CardOption";
import { Box, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Navbar />

      {/* 🌄 Image principale */}
      <img
        src="/src/assets/img_couverture.png"
        alt="Image de livraison"
        style={{
          width: "100%", // L'image prend toute la largeur du conteneur
          height: "auto", // La hauteur s'ajuste automatiquement pour garder les proportions
          objectFit: "cover", // Assure que l'image couvre toute la zone sans se déformer
          maxHeight: "500px", // Limite la hauteur maximale pour les grands écrans
        }}
      />

      <Grid container spacing={2} sx={{ padding: 3, justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <CardOption
            title="Devenir Livreur"
            description="Rejoignez notre équipe et commencez à livrer dès aujourd'hui !"
            buttonText="S'inscrire"
            image="/src/assets/liv.png"
            link="/devenir-livreur"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardOption
            title="Devenir Partenaire"
            description="Développez votre activité en collaborant avec nous."
            buttonText="S'inscrire"
            image="/src/assets/part.png"
            link="/devenir-partenaire"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
