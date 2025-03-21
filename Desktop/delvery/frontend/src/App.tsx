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

"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import DevenirLivreur from "./pages/DevenirLivreur";
import DevenirPartenaire from "./pages/DevenirPartenaire";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardHome from "./dashboard/DashboardHome";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useMemo } from "react"; // Add these imports
import { lightTheme, darkTheme } from "./theme/theme";

import Clients from "./dashboard/Clients";
import Livreurs from "./dashboard/Livreurs";
import Partenaire from "./dashboard/Partenaires";
import Demandes from "./dashboard/Demandes";

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
      <Route path="/dashboard" element={<DashboardHome />}>
        <Route index element={<DashboardHome />} />
        <Route path="clients" element={<Clients />} />
        <Route path="livreurs" element={<Livreurs />} />
        <Route path="partenaires" element={<Partenaire />} />
        <Route path="demandes" element={<Demandes />} />
      </Route>
    </Routes>
  );
}

// Create a context for dark mode that can be accessed throughout the app
import { createContext, useContext } from "react";

// Create the context
export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Export a hook to use the context
export const useAppDarkMode = () => useContext(DarkModeContext);

function App() {
  // Initialize dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Create a memoized context value
  const darkModeContextValue = useMemo(
    () => ({
      darkMode,
      toggleDarkMode,
    }),
    [darkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContext.Provider value={darkModeContextValue}>
        <AuthProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <AppRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AuthProvider>
      </DarkModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
