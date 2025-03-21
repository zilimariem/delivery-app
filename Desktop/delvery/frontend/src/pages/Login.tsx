import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { TextField, Button, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// 🛠 Définition du schéma de validation avec mot de passe renforcé
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(
      /[!@#$%^&*()_+{}":;'?/>.<,]/,
      "Le mot de passe doit contenir au moins un caractère spécial"
    ),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      Swal.fire("Succès", "Connexion réussie", "success");
      navigate("/");
    },
    onError: () => {
      Swal.fire("Erreur", "Échec de la connexion", "error");
    },
  });

  const onSubmit = (formData: FormData) => {
    mutation.mutate(formData);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
