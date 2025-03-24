import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page non trouvée
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Retour à l'accueil
      </Button>
    </Box>
  );
};

export default NotFound;
