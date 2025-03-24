import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Rôles autorisés à accéder à la route
  children: React.ReactNode; // Enfants à afficher si l'utilisateur est autorisé
}

/**
 * Composant pour protéger les routes en fonction du rôle de l'utilisateur.
 * Si l'utilisateur n'est pas connecté ou n'a pas le rôle requis, il est redirigé vers la page de connexion.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  // Récupérer les informations de l'utilisateur depuis le localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Vérifier si l'utilisateur est connecté et a le rôle requis
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />; // Rediriger vers la page de connexion
  }

  // Si l'utilisateur est autorisé, afficher les enfants
  return <>{children}</>;
};

export default ProtectedRoute;
