import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  TextareaAutosize,
  InputAdornment,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartenaireData, usePostPartenaire } from "../api/partenaireApi";

// Fonction pour formater le numéro de téléphone
const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) {
    return cleaned;
  }
  if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
  }
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)}`;
};

// Schéma de validation avec Zod
const partenaireSchema = z.object({
  etablissement: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères."),
  typeEtablissement: z.enum(
    [
      "Restaurant",
      "pharmacie",
      "magasin_detail",
      "epicerie",
      "fleuriste",
      "autre",
    ],
    { message: "Type requis" }
  ),
  sousTypeEtablissement: z.enum(["service_seulement", "livraison_service"], {
    message: "Type d'établissement requis",
  }),
  prenom: z.string().min(1, "Prénom requis"),
  phone: z
    .string()
    .regex(/^\d{2} \d{3} \d{3}$/, "Le numéro doit être au format 11 111 111."),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(1, "Adresse requise"),
  description: z.string().min(1, "Description requise"),
});

const DevenirPartenaire = () => {
  const navigate = useNavigate();
  const mutation = usePostPartenaire();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<PartenaireData>({
    resolver: zodResolver(partenaireSchema),
  });

  const onSubmit = async (data: PartenaireData) => {
    try {
      await mutation.mutateAsync(data);
      Swal.fire({
        title: "Succès",
        text: "Votre demande a été envoyée avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de l'envoi.",
        icon: "error",
      });
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Devenir Partenaire
      </Typography>

      <TextField
        label="Nom de l'établissement"
        {...register("etablissement")}
        fullWidth
        margin="normal"
        error={!!errors.etablissement}
        helperText={errors.etablissement?.message as string}
      />

      <FormControl fullWidth margin="normal" error={!!errors.typeEtablissement}>
        <InputLabel>Secteur d'établissement</InputLabel>
        <Controller
          name="typeEtablissement"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="pharmacie">Pharmacie</MenuItem>
              <MenuItem value="magasin_detail">Magasin de détail</MenuItem>
              <MenuItem value="epicerie">Épicerie</MenuItem>
              <MenuItem value="fleuriste">Fleuriste</MenuItem>
              <MenuItem value="autre">Autre</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <FormControl
        fullWidth
        margin="normal"
        error={!!errors.sousTypeEtablissement}
      >
        <InputLabel>Type d'établissement</InputLabel>
        <Controller
          name="sousTypeEtablissement"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="service_seulement">Service seulement</MenuItem>
              <MenuItem value="livraison_service">
                Livraison avec service
              </MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <TextField
        label="Prénom"
        {...register("prenom")}
        fullWidth
        margin="normal"
        error={!!errors.prenom}
        helperText={errors.prenom?.message as string}
      />
      {/* 
      <TextField
        label="Téléphone"
        type="tel"
        {...register("phone")}
        fullWidth
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone?.message as string}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+216</InputAdornment>
          ),
        }}
        onChange={(e) => {
          const formatted = formatPhoneNumber(e.target.value);
          setValue("phone", formatted);
        }}
      /> */}
      <TextField
        label="Téléphone"
        type="tel"
        {...register("phone", {
          required: "Le numéro est requis.",
          pattern: {
            value: /^\d{8}$/,
            message: "Le numéro doit contenir exactement 8 chiffres.",
          },
        })}
        fullWidth
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone?.message as string}
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
        onChange={(e) => {
          const formatted = formatPhoneNumber(e.target.value);
          setValue("phone", formatted);
        }}
      />

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <TextField
        label="Adresse"
        {...register("adresse")}
        fullWidth
        margin="normal"
        error={!!errors.adresse}
        helperText={errors.adresse?.message as string}
      />

      <FormControl fullWidth margin="normal" error={!!errors.description}>
        <FormLabel>Description</FormLabel>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder="Décrivez votre établissement..."
            />
          )}
        />
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

export default DevenirPartenaire;
