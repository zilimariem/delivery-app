// "use client";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   Typography,
//   Stack,
//   InputAdornment,
// } from "@mui/material";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { usePostLivreur, type LivreurData } from "../api/livreurApi";

// const formatPhoneNumber = (value: string) => {
//   const cleaned = value.replace(/\D/g, "");
//   if (cleaned.length <= 2) {
//     return cleaned;
//   }
//   if (cleaned.length <= 5) {
//     return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
//   }
//   return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)}`;
// };

// const DevenirLivreur = () => {
//   const navigate = useNavigate();
//   const mutation = usePostLivreur();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//   } = useForm<LivreurData>({
//     defaultValues: {
//       gender: "male", // Default value for gender
//       transport: "voiture", // Default value for transport
//     },
//   });

//   const onSubmit = async (data: LivreurData) => {
//     try {
//       await mutation.mutateAsync(data);

//       Swal.fire({
//         icon: "success",
//         title: "Demande soumise avec succès !",
//         text: "Nous vous contacterons bientôt.",
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 3000);
//     } catch (error) {
//       console.error("Erreur lors de l'envoi:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Erreur",
//         text: "Une erreur s'est produite lors de l'envoi de votre demande.",
//       });
//     }
//   };

//   const villes = [
//     "Tunis",
//     "Sfax",
//     "Sousse",
//     "Kairouan",
//     "Bizerte",
//     "Gabès",
//     "Ariana",
//     "Gafsa",
//     "Monastir",
//     "Ben Arous",
//     "Nabeul",
//     "Medenine",
//     "Béja",
//     "Jendouba",
//     "Tozeur",
//     "Kebili",
//     "Siliana",
//     "Le Kef",
//     "Zaghouan",
//     "La Manouba",
//     "Tataouine",
//     "Sidi Bouzid",
//     "Kasserine",
//     "Mahdia",
//   ];

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{ maxWidth: 500, mx: "auto", p: 2, boxShadow: 3, borderRadius: 2 }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Devenir Livreur
//       </Typography>
//       <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//         <TextField
//           label="Nom"
//           {...register("lastname", { required: "Le nom est requis." })}
//           fullWidth
//           margin="normal"
//           error={!!errors.lastname}
//           helperText={errors.lastname?.message as string}
//         />
//         <TextField
//           label="Prénom"
//           {...register("firstname", { required: "Le prénom est requis." })}
//           fullWidth
//           margin="normal"
//           error={!!errors.firstname}
//           helperText={errors.firstname?.message as string}
//         />
//       </Stack>

//       <TextField
//         label="Email"
//         type="email"
//         {...register("email", {
//           required: "L'adresse e-mail est requise.",
//           pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "L'adresse e-mail n'est pas valide.",
//           },
//         })}
//         fullWidth
//         margin="normal"
//         error={!!errors.email}
//         helperText={errors.email?.message as string}
//       />

//       <TextField
//         label="Téléphone"
//         type="tel"
//         {...register("phone", {
//           required: "Le numéro est requis.",
//           pattern: {
//             value: /^\d{8}$/,
//             message: "Le numéro doit contenir exactement 8 chiffres.",
//           },
//         })}
//         fullWidth
//         margin="normal"
//         error={!!errors.phone}
//         helperText={errors.phone?.message as string}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <img
//                 src="https://flagcdn.com/tn.svg"
//                 alt="Tunisia Flag"
//                 style={{ width: 24, height: 16, marginRight: 8 }}
//               />
//               +216
//             </InputAdornment>
//           ),
//         }}
//         onChange={(e) => {
//           const formatted = formatPhoneNumber(e.target.value);
//           setValue("phone", formatted);
//         }}
//       />

//       <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
//         <FormLabel>Genre</FormLabel>
//         <Controller
//           name="gender"
//           control={control}
//           rules={{ required: "Veuillez sélectionner un genre." }}
//           render={({ field }) => (
//             <RadioGroup {...field} row>
//               <FormControlLabel
//                 value="male"
//                 control={<Radio />}
//                 label="Homme"
//               />
//               <FormControlLabel
//                 value="female"
//                 control={<Radio />}
//                 label="Femme"
//               />
//             </RadioGroup>
//           )}
//         />
//         {errors.gender && (
//           <Typography color="error">
//             {errors.gender.message as string}
//           </Typography>
//         )}
//       </FormControl>

//       <FormControl fullWidth margin="normal" error={!!errors.ville}>
//         <InputLabel>Ville</InputLabel>
//         <Controller
//           name="ville"
//           control={control}
//           rules={{ required: "Veuillez choisir une ville." }}
//           render={({ field }) => (
//             <Select
//               {...field}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "primary.main",
//                     borderRadius: 2,
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "primary.dark",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "primary.main",
//                     borderWidth: 2,
//                   },
//                 },
//               }}
//             >
//               {villes.map((ville) => (
//                 <MenuItem key={ville} value={ville}>
//                   {ville}
//                 </MenuItem>
//               ))}
//             </Select>
//           )}
//         />
//         {errors.ville && (
//           <Typography color="error">
//             {errors.ville.message as string}
//           </Typography>
//         )}
//       </FormControl>

//       <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
//         Télécharger CV
//         <input
//           type="file"
//           hidden
//           {...register("cv", { required: "Veuillez télécharger un CV." })}
//         />
//       </Button>
//       {errors.cv && (
//         <Typography color="error">{errors.cv.message as string}</Typography>
//       )}

//       <FormControl
//         component="fieldset"
//         margin="normal"
//         error={!!errors.transport}
//       >
//         <FormLabel>Moyen de Transport</FormLabel>
//         <Controller
//           name="transport"
//           control={control}
//           rules={{ required: "Veuillez sélectionner un moyen de transport." }}
//           render={({ field }) => (
//             <RadioGroup {...field} row>
//               <FormControlLabel
//                 value="voiture"
//                 control={<Radio />}
//                 label="Voiture"
//               />
//               <FormControlLabel
//                 value="bicycle"
//                 control={<Radio />}
//                 label="Bicyclette"
//               />
//               <FormControlLabel value="moto" control={<Radio />} label="Moto" />
//             </RadioGroup>
//           )}
//         />
//         {errors.transport && (
//           <Typography color="error">
//             {errors.transport.message as string}
//           </Typography>
//         )}
//       </FormControl>

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 2 }}
//         disabled={mutation.isPending}
//       >
//         {mutation.isPending ? "Envoi en cours..." : "Soumettre"}
//       </Button>
//     </Box>
//   );
// };

// export default DevenirLivreur;

// import { useNavigate } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField,
//   Button,
//   Box,
//   Stack,
//   Typography,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   InputAdornment,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { LivreurData } from "../api/livreurApi";
// import Swal from "sweetalert2";
// import { usePostLivreur } from "../api/livreurApi"; // Import de usePostLivreur

// const DevenirLivreur = () => {
//   const navigate = useNavigate();
//   const mutation = usePostLivreur();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<LivreurData>({
//     defaultValues: {
//       gender: "Homme",
//       transportMethod: "voiture",
//     },
//   });

//   const onSubmit = async (data: LivreurData) => {
//     try {
//       await mutation.mutateAsync(data);

//       Swal.fire({
//         icon: "success",
//         title: "Demande soumise avec succès !",
//         text: "Nous vous contacterons bientôt.",
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 3000);
//     } catch (error) {
//       console.error("Erreur lors de l'envoi:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Erreur",
//         text: "Une erreur s'est produite lors de l'envoi de votre demande.",
//       });
//     }
//   };

//   const villes = [
//     "Tunis",
//     "Sfax",
//     "Sousse",
//     "Kairouan",
//     "Bizerte",
//     "Gabès",
//     "Ariana",
//     "Gafsa",
//     "Monastir",
//     "Ben Arous",
//     "Nabeul",
//     "Medenine",
//     "Béja",
//     "Jendouba",
//     "Tozeur",
//     "Kebili",
//     "Siliana",
//     "Le Kef",
//     "Zaghouan",
//     "La Manouba",
//     "Tataouine",
//     "Sidi Bouzid",
//     "Kasserine",
//     "Mahdia",
//   ];

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{ maxWidth: 500, mx: "auto", p: 2, boxShadow: 3, borderRadius: 2 }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Devenir Livreur
//       </Typography>
//       <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//         <TextField
//           label="Nom"
//           {...register("lastName", { required: "Le nom est requis." })}
//           fullWidth
//           margin="normal"
//           error={!!errors.lastName}
//           helperText={errors.lastName?.message as string}
//         />
//         <TextField
//           label="Prénom"
//           {...register("firstName", { required: "Le prénom est requis." })}
//           fullWidth
//           margin="normal"
//           error={!!errors.firstName}
//           helperText={errors.firstName?.message as string}
//         />
//       </Stack>

//       <TextField
//         label="Email"
//         type="email"
//         {...register("email", {
//           required: "L'adresse e-mail est requise.",
//           pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "L'adresse e-mail n'est pas valide.",
//           },
//         })}
//         fullWidth
//         margin="normal"
//         error={!!errors.email}
//         helperText={errors.email?.message as string}
//       />

//       <TextField
//         label="Téléphone"
//         type="tel"
//         {...register("telephone", {
//           required: "Le numéro est requis.",
//           pattern: {
//             value: /^\d{8}$/, // Valide un numéro de 8 chiffres uniquement
//             message: "Le numéro doit contenir exactement 8 chiffres.",
//           },
//           setValueAs: (value) => value.replace(/[^\d]/g, ""), // Remplace tout caractère non numérique
//         })}
//         fullWidth
//         margin="normal"
//         error={!!errors.telephone}
//         helperText={errors.telephone?.message as string}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <img
//                 src="https://flagcdn.com/tn.svg"
//                 alt="Tunisia Flag"
//                 style={{ width: 24, height: 16, marginRight: 8 }}
//               />
//               +216
//             </InputAdornment>
//           ),
//         }}
//       />

//       <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
//         <FormLabel>Genre</FormLabel>
//         <Controller
//           name="gender"
//           control={control}
//           rules={{ required: "Veuillez sélectionner un genre." }}
//           render={({ field }) => (
//             <RadioGroup {...field} row>
//               <FormControlLabel
//                 value="Homme"
//                 control={<Radio />}
//                 label="Homme"
//                 checked
//               />
//               <FormControlLabel
//                 value="Femme"
//                 control={<Radio />}
//                 label="Femme"
//               />
//             </RadioGroup>
//           )}
//         />
//         {errors.gender && (
//           <Typography color="error">
//             {errors.gender.message as string}
//           </Typography>
//         )}
//       </FormControl>

//       <FormControl fullWidth margin="normal" error={!!errors.city}>
//         <InputLabel>Ville</InputLabel>
//         <Controller
//           name="city"
//           control={control}
//           rules={{ required: "Veuillez choisir une ville." }}
//           render={({ field }) => (
//             <Select {...field}>
//               {villes.map((ville) => (
//                 <MenuItem key={ville} value={ville}>
//                   {ville}
//                 </MenuItem>
//               ))}
//             </Select>
//           )}
//         />
//         {errors.city && (
//           <Typography color="error">{errors.city.message as string}</Typography>
//         )}
//       </FormControl>

//       <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
//         Télécharger CV
//         <input
//           type="file"
//           hidden
//           {...register("cv", { required: "Veuillez télécharger un CV." })}
//         />
//       </Button>
//       {errors.cv && (
//         <Typography color="error">{errors.cv.message as string}</Typography>
//       )}

//       <FormControl
//         component="fieldset"
//         margin="normal"
//         error={!!errors.transportMethod}
//       >
//         <FormLabel>Moyen de Transport</FormLabel>
//         <Controller
//           name="transportMethod"
//           control={control}
//           rules={{ required: "Veuillez sélectionner un moyen de transport." }}
//           render={({ field }) => (
//             <RadioGroup {...field} row>
//               <FormControlLabel
//                 value="voiture"
//                 control={<Radio />}
//                 label="Voiture"
//               />
//               <FormControlLabel
//                 value="bicyclette"
//                 control={<Radio />}
//                 label="Bicyclette"
//               />
//               <FormControlLabel value="moto" control={<Radio />} label="Moto" />
//             </RadioGroup>
//           )}
//         />
//         {errors.transportMethod && (
//           <Typography color="error">
//             {errors.transportMethod.message as string}
//           </Typography>
//         )}
//       </FormControl>

//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 2 }}
//         disabled={mutation.isPending}
//       >
//         {mutation.isPending ? "Envoi en cours..." : "Soumettre"}
//       </Button>
//     </Box>
//   );
// };

// export default DevenirLivreur;

"use client";

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Swal from "sweetalert2";
import { usePostLivreur, type LivreurData } from "../../api/livreurApi";

// Schéma de validation Zod
const livreurSchema = z.object({
  firstName: z
    .string()
    .min(3, "Le prénom doit contenir au moins 3 caractères."),
  lastName: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  
  telephone: z
    .string()
    .min(8, "Le numéro doit contenir exactement 8 chiffres.")
    .max(8, "Le numéro doit contenir exactement 8 chiffres.")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres."),
  gender: z.enum(["Homme", "Femme"]),
  city: z.string().min(1, "Veuillez choisir une ville."),
  cv: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Veuillez télécharger un CV."),
  transportMethod: z.enum(["voiture", "bicyclette", "moto"]),
});

type LivreurFormData = z.infer<typeof livreurSchema>;

const DevenirLivreur = () => {
  const navigate = useNavigate();
  const mutation = usePostLivreur();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LivreurFormData>({
    resolver: zodResolver(livreurSchema),
    defaultValues: {
      gender: "Homme",
      transportMethod: "voiture",
      city: "Tunis",
    },
  });

  const onSubmit = async (data: LivreurFormData) => {
    try {
      console.log("Données du formulaire :", data);

      // Transformer les données pour correspondre à l'interface LivreurData
      const livreurData: LivreurData = {
        ...data,
        cv: data.cv[0], // Prendre le premier fichier de FileList
      };

      await mutation.mutateAsync(livreurData);

      Swal.fire({
        icon: "success",
        title: "Demande soumise avec succès !",
        text: "Nous vous contacterons bientôt.",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'envoi de votre demande.",
      });
    }
  };

  const villes = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Kairouan",
    "Bizerte",
    "Gabès",
    "Ariana",
    "Gafsa",
    "Monastir",
    "Ben Arous",
    "Nabeul",
    "Medenine",
    "Béja",
    "Jendouba",
    "Tozeur",
    "Kebili",
    "Siliana",
    "Le Kef",
    "Zaghouan",
    "La Manouba",
    "Tataouine",
    "Sidi Bouzid",
    "Kasserine",
    "Mahdia",
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", p: 2, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Devenir Livreur
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Nom"
          {...register("lastName")}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Prénom"
          {...register("firstName")}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </Stack>

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Téléphone"
        type="tel"
        {...register("telephone", {
          required: "Le numéro est requis.",
          pattern: {
            value: /^\d{8}$/,
            message: "Le numéro doit contenir exactement 8 chiffres.",
          },
          setValueAs: (value) => value.replace(/[^\d]/g, ""),
        })}
        fullWidth
        margin="normal"
        error={!!errors.telephone}
        helperText={errors.telephone?.message as string}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src="https://flagcdn.com/tn.svg"
                alt="Tunisia Flag"
                style={{ width: 24, height: 16, marginRight: 8 }}
              />
              +216
            </InputAdornment>
          ),
        }}
      />

      <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
        <FormLabel>Genre</FormLabel>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="Homme"
                control={<Radio />}
                label="Homme"
              />
              <FormControlLabel
                value="Femme"
                control={<Radio />}
                label="Femme"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <FormHelperText error>
            {errors.gender.message as string}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth margin="normal" error={!!errors.city}>
        <InputLabel>Ville</InputLabel>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Ville">
              {villes.map((ville) => (
                <MenuItem key={ville} value={ville}>
                  {ville}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.city && (
          <FormHelperText error>{errors.city.message as string}</FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth margin="normal" error={!!errors.cv}>
        <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
          Télécharger CV
          <input type="file" hidden {...register("cv")} accept="*/*" />
        </Button>
        {errors.cv && (
          <FormHelperText error>{errors.cv.message as string}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        component="fieldset"
        margin="normal"
        error={!!errors.transportMethod}
      >
        <FormLabel>Moyen de Transport</FormLabel>
        <Controller
          name="transportMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="voiture"
                control={<Radio />}
                label="Voiture"
              />
              <FormControlLabel
                value="bicyclette"
                control={<Radio />}
                label="Bicyclette"
              />
              <FormControlLabel value="moto" control={<Radio />} label="Moto" />
            </RadioGroup>
          )}
        />
        {errors.transportMethod && (
          <FormHelperText error>
            {errors.transportMethod.message as string}
          </FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Envoi en cours..." : "Soumettre"}
      </Button>
    </Box>
  );
};

export default DevenirLivreur;
