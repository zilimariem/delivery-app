// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "../api/authApi";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// // 🛠 Définition du schéma de validation avec mot de passe renforcé
// const loginSchema = z.object({
//   email: z.string().email("Email invalide"),
//   password: z
//     .string()
//     .min(8, "Le mot de passe doit contenir au moins 8 caractères")
//     .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
//     .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
//     .regex(
//       /[!@#$%^&*()_+{}":;'?/>.<,]/,
//       "Le mot de passe doit contenir au moins un caractère spécial"
//     ),
// });

// type FormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const mutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       localStorage.setItem("token", data.token);
//       Swal.fire("Succès", "Connexion réussie", "success");
//       navigate("/");
//     },
//     onError: () => {
//       Swal.fire("Erreur", "Échec de la connexion", "error");
//     },
//   });

//   const onSubmit = (formData: FormData) => {
//     mutation.mutate(formData);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Connexion
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
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
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{ mt: 2 }}
//           disabled={mutation.isPending}
//         >
//           {mutation.isPending ? "Connexion..." : "Se connecter"}
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// // 🛠 Définition du schéma de validation avec mot de passe renforcé
// const loginSchema = z.object({
//   email: z.string().email("Email invalide"),
//   password: z
//     .string()
//     .min(8, "Le mot de passe doit contenir au moins 8 caractères")
//     .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
//     .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
//     .regex(
//       /[!@#$%^&*()_+{}":;'?/>.<,]/,
//       "Le mot de passe doit contenir au moins un caractère spécial"
//     ),
// });

// type FormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   // Utilisateur admin simulé
//   const adminUser = {
//     email: "admin@example.com",
//     password: "Admin123!", // Mot de passe fort
//     role: "admin",
//   };

//   const onSubmit = (formData: FormData) => {
//     // Vérifier si les identifiants correspondent à l'utilisateur admin simulé
//     if (
//       formData.email === adminUser.email &&
//       formData.password === adminUser.password
//     ) {
//       // Simuler une connexion réussie
//       localStorage.setItem("token", "fake-token");
//       localStorage.setItem("user", JSON.stringify(adminUser));

//       // Afficher un message de succès
//       Swal.fire("Succès", "Connexion réussie", "success");

//       // Rediriger vers le tableau de bord admin
//       navigate("/dashboard");
//     } else {
//       // Afficher une erreur si les identifiants sont incorrects
//       Swal.fire("Erreur", "Email ou mot de passe incorrect", "error");
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Connexion
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
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
//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           Se connecter
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Schéma de validation avec Zod
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Mot de passe trop court"),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      await login({ email: formData.email, password: formData.password });

      // Récupérer l'utilisateur depuis le localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Rediriger en fonction du rôle
      switch (user.role) {
        case "admin":
        case "partenaire":
        case "livreur":
          navigate("/dashboard");
          break;
        case "client":
          navigate("/");
          break;
        default:
          navigate("/");
      }

      Swal.fire("Succès", "Connexion réussie", "success");
    } catch (error) {
      Swal.fire("Erreur", "Email ou mot de passe incorrect", "error");
    }
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default Login;
