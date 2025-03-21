import Navbar from "../components/Navbar";
import CardOption from "../components/CardOption";
import { Box, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Navbar />

      {/* 🌄 Image principale */}
      <img
        src="https://blog-assets.lightspeedhq.com/img/2021/04/93ac0f0b-how-to-manage-delivery-platforms-fr.jpg"
        alt="Image de livraison"
        style={{
          width: "100%",
          objectFit: "cover", // Cette propriété garantit que l'image couvre l'espace sans se déformer
        }}
      />

      <Grid container spacing={2} sx={{ padding: 3, justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <CardOption
            title="Devenir Livreur"
            description="Rejoignez notre équipe et commencez à livrer dès aujourd'hui !"
            buttonText="S'inscrire"
            image="https://www.digimoov.fr/digimoov_website_templates/static/img/ubereats/devenz-coursier-uber-eats.png"
            link="/devenir-livreur"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardOption
            title="Devenir Partenaire"
            description="Développez votre activité en collaborant avec nous."
            buttonText="S'inscrire"
            image="https://cdn-icons-png.flaticon.com/512/4072/4072864.png"
            link="/devenir-partenaire"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
