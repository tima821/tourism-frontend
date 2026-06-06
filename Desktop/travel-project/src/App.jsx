// src/App.jsx
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// مكوناتك
import Login from "./components/login";
import SignUp from "./components/signup";
import EmailVerification from "./components/emailVerification";
import UserHome from "./components/UserHome";
import ForgetPassword from "./components/forgetpassword";
import ResetPassword from "./components/resetpassword";
import DashboardLayout from "./components/Layout/DashboardLayout";
import RootLayout from "./components/Layout/RootLayout";

// باقي المكونات
import Trips from "./pages/user/Trips";
import Dashboard from "./pages/admin/Dashboard";
import TripsManagement from "./pages/admin/TripsManagement";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/user-home" replace />;
    }
  }
  return children;
};

function App() {

  // ─── قناص الخطأ لالتقاط خطأ `item` ──────────────────────────
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes('Received `true` for a non-boolean attribute `item`')) {
      console.trace(); // يطبع مكان الخطأ بالضبط
    }
    originalError(...args);
  };
  // ─────────────────────────────────────────────────────────────
  
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "dark" ? "#00e5ff" : "#1976d2" },
          background: {
            default: mode === "dark" ? "#050c14" : "#f4f6f8",
            paper: mode === "dark" ? "#0b1929" : "#ffffff",
          },
        },
        typography: { fontFamily: "Cairo, sans-serif" },
      }),
    [mode]
  );

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* مسارات المستخدم العادي (يستخدم RootLayout) */}
          <Route element={<RootLayout />}>
            <Route path="/home/trips" element={<Trips />} />
          </Route>

          <Route
            path="/user-home"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="trips" element={<TripsManagement />} />
          </Route>

          <Route path="*" element={<h2>404 - الصفحة غير موجودة</h2>} />
        </Routes>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;