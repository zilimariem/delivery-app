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
    <Card sx={{ maxWidth: 345, textAlign: "center" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} component={Link} to={link}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardOption;
