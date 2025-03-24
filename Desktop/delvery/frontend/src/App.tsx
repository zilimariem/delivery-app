// // const ProtectedRoute = ({ children }: { children: ReactElement }) => {
// //   const { isLoggedIn, isLoading } = useAuth();

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (!isLoggedIn) {
// //     return <Navigate to="/login" />;
// //   }

// //   return children;
// // };

//       {/* 🏠 Dashboard (Protected) */}
//       {/* <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardHome />
//           </ProtectedRoute>
//         }
//       /> */}
//     </Routes>
//   );
// }

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/public/Home";
import DevenirLivreur from "./pages/public/DevenirLivreur";
import DevenirPartenaire from "./pages/public/DevenirPartenaire";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Clients from "./pages/dashboard/Clients";
import Livreurs from "./pages/dashboard/Livreurs";
import Partenaire from "./pages/dashboard/Partenaires";
import SetPasswordPage from "./pages/public/SetPasswordPage";
import CandidatsLivreurs from "./pages/dashboard/CandidatsLivreurs";
import CandidatsPartenaires from "./pages/dashboard/CandidatsPartenaires";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/public/Notfound";
import { ThemeProvider } from "./theme/themeCotext"; // Importez ThemeProvider



// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/devenir-livreur" element={<DevenirLivreur />} />
      <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-password/:token" element={<SetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ThemeProvider>
              <DashboardHome />
            </ThemeProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="clients" element={<Clients />} />
        <Route path="livreurs" element={<Livreurs />} />
        <Route path="partenaires" element={<Partenaire />} />
        <Route
          path="/dashboard/candidats-livreurs"
          element={<CandidatsLivreurs />}
        />
        <Route
          path="/dashboard/candidats-partenaires"
          element={<CandidatsPartenaires />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    
  );
}

export default App;
