// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import { useMutation } from "@tanstack/react-query";
// import { registerUser } from "../api/authApi";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { AxiosError } from "axios";

// // 🛠 Définition du schéma de validation avec mot de passe renforcé
// const registerSchema = z
//   .object({
//     name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
//     email: z.string().email("Email invalide"),
//     password: z
//       .string()
//       .min(8, "Le mot de passe doit contenir au moins 8 caractères")
//       .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
//       .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
//       .regex(
//         /[!@#$%^&*()_+{}":;'?/>.<,]/,
//         "Le mot de passe doit contenir au moins un caractère spécial"
//       ),
//     confirmedPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmedPassword, {
//     message: "Les mots de passe ne correspondent pas",
//     path: ["confirmedPassword"],
//   });

// type FormData = z.infer<typeof registerSchema>;

// const Register = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const mutation = useMutation({
//     mutationFn: (
//       data: Omit<FormData, "confirmedPassword"> & { confirmPassword: string }
//     ) => registerUser(data),
//     onSuccess: () => {
//       Swal.fire("Succès", "Inscription réussie!", "success");
//       navigate("/login");
//     },
//     onError: (error: AxiosError<{ message?: string }>) => {
//       Swal.fire(
//         "Erreur",
//         error.response?.data?.message || "Problème d'inscription",
//         "error"
//       );
//     },
//   });

//   const onSubmit = (data: FormData) => {
//     const { confirmedPassword, ...apiData } = data;
//     mutation.mutate({ ...apiData, confirmPassword: confirmedPassword });
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Créer un compte
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="Nom"
//           fullWidth
//           margin="normal"
//           {...register("name")}
//           error={!!errors.name}
//           helperText={errors.name?.message}
//         />
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           {...register("email")}
//           error={!!errors.email}
//           helperText={errors.email?.message}
//         />
//         <TextField
//           label="Mot de passe"
//           type="password"
//           fullWidth
//           margin="normal"
//           {...register("password")}
//           error={!!errors.password}
//           helperText={errors.password?.message}
//         />
//         <TextField
//           label="Confirmer le mot de passe"
//           type="password"
//           fullWidth
//           margin="normal"
//           {...register("confirmedPassword")}
//           error={!!errors.confirmedPassword}
//           helperText={errors.confirmedPassword?.message}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{ mt: 2 }}
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? "Enregistrement..." : "S'inscrire"}
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Register;



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";

// 🛠 Définition du schéma de validation avec mot de passe renforcé
const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
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
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmedPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmedPassword = () =>
    setShowConfirmedPassword((prev) => !prev);

  const mutation = useMutation({
    mutationFn: (data: Omit<FormData, "confirmedPassword">) =>
      registerUser(data),
    onSuccess: () => {
      Swal.fire("Succès", "Inscription réussie!", "success");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      Swal.fire(
        "Erreur",
        error.response?.data?.message || "Problème d'inscription",
        "error"
      );
    },
  });

  const onSubmit = (data: FormData) => {
    const { confirmedPassword, ...apiData } = data;
    console.log("Données à envoyer au backend :", apiData); // Ajout du console.log
    mutation.mutate(apiData);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Créer un compte
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
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
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirmer le mot de passe"
          type={showConfirmedPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          {...register("confirmedPassword")}
          error={!!errors.confirmedPassword}
          helperText={errors.confirmedPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmedPassword}
                  edge="end"
                >
                  {showConfirmedPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Enregistrement..." : "S'inscrire"}
        </Button>
      </form>
    </Box>
  );
};

export default Register;
