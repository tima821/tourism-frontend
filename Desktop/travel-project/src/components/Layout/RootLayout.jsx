// // src/components/Layout/RootLayout.jsx
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { FaPlane, FaUser, FaBars } from "react-icons/fa";
// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";

// const RootLayout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col rtl">
//       <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
//         <nav className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-2 space-x-reverse">
//               <FaPlane className="text-2xl" />
//               <span className="text-xl font-bold">سياحة دليلي</span>
//             </div>
//             <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               <FaBars className="text-2xl" />
//             </button>
//             <div className="hidden lg:flex space-x-6 space-x-reverse">
//               <NavLink to="/home" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`}>
//                 الرئيسية
//               </NavLink>
//               <NavLink to="/home/trips" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`}>
//                 الرحلات
//               </NavLink>
//               {user ? (
//                 <>
//                   <NavLink to="/dashboard" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`}>
//                     لوحة التحكم
//                   </NavLink>
//                   <button onClick={handleLogout} className="hover:text-yellow-300 transition">
//                     تسجيل خروج
//                   </button>
//                 </>
//               ) : (
//                 <NavLink to="/login" className={({ isActive }) => `hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : ""}`}>
//                   <FaUser className="inline ml-1" /> دخول
//                 </NavLink>
//               )}
//             </div>
//           </div>
//           {isMenuOpen && (
//             <div className="lg:hidden mt-4 flex flex-col space-y-3">
//               <NavLink to="/home" onClick={() => setIsMenuOpen(false)}>الرئيسية</NavLink>
//               <NavLink to="/home/trips" onClick={() => setIsMenuOpen(false)}>الرحلات</NavLink>
//               {user ? (
//                 <>
//                   <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>لوحة التحكم</NavLink>
//                   <button onClick={handleLogout}>تسجيل خروج</button>
//                 </>
//               ) : (
//                 <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>دخول</NavLink>
//               )}
//             </div>
//           )}
//         </nav>
//       </header>
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <Outlet />
//       </main>
//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2024 سياحة دليلي - جميع الحقوق محفوظة</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default RootLayout;


// src/components/Layout/RootLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "../../contexts/AuthContext";

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const menuItems = [
    { path: "/home", label: "الرئيسية", icon: <HomeIcon /> },
    { path: "/home/trips", label: "الرحلات", icon: <FlightTakeoffIcon /> },
    ...(user
      ? [
          { path: "/dashboard", label: "لوحة التحكم", icon: <DashboardIcon /> },
          { label: "تسجيل خروج", action: handleLogout, icon: <LogoutIcon /> },
        ]
      : [{ path: "/login", label: "دخول", icon: <PersonIcon /> }]),
  ];

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", px: 2, mb: 2 }}>
        <IconButton onClick={() => setIsMenuOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => {
              if (item.action) item.action();
              else {
                navigate(item.path);
                setIsMenuOpen(false);
              }
            }}
            component={item.action ? "button" : NavLink}
            to={item.path}
            sx={{
              fontFamily: "Cairo",
              "&.active": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "& .MuiListItemText-primary": { fontWeight: "bold" },
              },
            }}
          >
            <Box sx={{ ml: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {item.icon}
              <ListItemText primary={item.label} sx={{ fontFamily: "Cairo" }} />
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", direction: "rtl" }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "primary.main",
          backgroundImage: "linear-gradient(135deg, #1976d2, #0d47a1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FlightTakeoffIcon sx={{ fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>
                سياحة دليلي
              </Typography>
            </Box>
            {isMobile ? (
              <IconButton color="inherit" onClick={() => setIsMenuOpen(true)} edge="start">
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    component={item.action ? "button" : NavLink}
                    to={item.path}
                    onClick={item.action}
                    sx={{
                      color: "#fff",
                      fontFamily: "Cairo",
                      "&:hover": { color: "#ffeb3b" },
                      "&.active": { color: "#ffeb3b", fontWeight: "bold" },
                    }}
                  >
                    {item.icon && <Box sx={{ display: "inline-flex", ml: 0.5 }}>{item.icon}</Box>}
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        {drawerContent}
      </Drawer>

      <Container component="main" sx={{ flex: 1, py: 4, px: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#0a1929" : "#1e293b",
          color: "#fff",
          py: 3,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography textAlign="center" sx={{ fontFamily: "Cairo", fontSize: "0.9rem" }}>
            © 2024 سياحة دليلي - جميع الحقوق محفوظة
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default RootLayout;
