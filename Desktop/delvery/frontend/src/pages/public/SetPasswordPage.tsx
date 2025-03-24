import { useParams, useNavigate } from "react-router-dom";
import { setPassword as setPasswordApi } from "../../api/authApi";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schéma de validation avec Zod
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial"
    ),
});

// Type déduit du schéma Zod
type PasswordFormData = z.infer<typeof passwordSchema>;

const SetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // Configuration de React Hook Form avec Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Fonction pour gérer la soumission du formulaire
  const onSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    try {
      if (!token) {
        throw new Error("Token invalide");
      }

      // Envoie le token et le mot de passe au backend
      await setPasswordApi({ token, password: data.password });

      // Affiche un message de succès et redirige vers la page de connexion
      alert("Mot de passe défini avec succès !");
      navigate("/login");
    } catch (error) {
      // Affiche une alerte en cas d'erreur
      alert("Erreur lors de la définition du mot de passe.");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Définir votre mot de passe
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          type="password"
          label="Nouveau mot de passe"
          {...register("password")} // Enregistre le champ avec React Hook Form
          error={!!errors.password} // Affiche une erreur si le champ est invalide
          helperText={errors.password?.message} // Affiche le message d'erreur
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Valider
        </Button>
      </form>
    </Box>
  );
};

export default SetPasswordPage;
