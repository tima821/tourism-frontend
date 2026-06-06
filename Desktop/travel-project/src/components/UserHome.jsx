// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Chip,
//   AppBar,
//   Toolbar,
//   Avatar,
//   IconButton,
//   CircularProgress,
//   Divider,
//   createTheme,
//   ThemeProvider,
//   CssBaseline,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Stack,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Tab,
//   Tabs,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Badge,
//   Alert,
//   Snackbar,
// } from "@mui/material";

// import Logout from "@mui/icons-material/Logout";
// import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
// import Event from "@mui/icons-material/Event";
// import AccessTime from "@mui/icons-material/AccessTime";
// import LocationOn from "@mui/icons-material/LocationOn";
// import Brightness4 from "@mui/icons-material/Brightness4";
// import Brightness7 from "@mui/icons-material/Brightness7";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import BadgeIcon from "@mui/icons-material/Badge";

// import ListAltIcon from "@mui/icons-material/ListAlt";
// import ExploreIcon from "@mui/icons-material/Explore";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import PeopleIcon from "@mui/icons-material/People";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import HotelIcon from "@mui/icons-material/Hotel";
// import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// // ─── بيانات تجريبية للرحلات المتاحة ───────────────────────────────────────────
// const DEMO_TRIPS = [
//   {
//     id: 1,
//     title: "سحر جزر المالديف",
//     image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
//     price: "2500$",
//     date: "2026-05-10",
//     duration: "7 أيام",
//     location: "المالديف",
//     description: "استمتع بإقامة فاخرة في منتجعات المالديف وشواطئها الخلابة.",
//     seats: 20,
//     bookedSeats: 14,
//     includes: ["فندق 5 نجوم", "طيران مباشر", "وجبات كاملة"],
//   },
//   {
//     id: 2,
//     title: "مغامرة جبال الألب",
//     image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
//     price: "3200$",
//     date: "2026-06-15",
//     duration: "10 أيام",
//     location: "سويسرا",
//     description: "جولات جبلية وتجربة العيش في أكواخ تقليدية.",
//     seats: 15,
//     bookedSeats: 7,
//     includes: ["إقامة في أكواخ", "حافلة خاصة", "دليل سياحي"],
//   },
//   {
//     id: 3,
//     title: "أضواء لندن الشتوية",
//     image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
//     price: "1800$",
//     date: "2026-12-01",
//     duration: "5 أيام",
//     location: "لندن، بريطانيا",
//     description: "تسوق في شارع أكسفورد وزيارة ساعة بيغ بين.",
//     seats: 25,
//     bookedSeats: 25,
//     includes: ["فندق 4 نجوم", "جولة سياحية", "بطاقة مواصلات"],
//   },
//   {
//     id: 4,
//     title: "روما الأبدية",
//     image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
//     price: "2100$",
//     date: "2026-07-20",
//     duration: "8 أيام",
//     location: "روما، إيطاليا",
//     description: "استكشف الكولوسيوم وتيفولي والمطبخ الإيطالي الأصيل.",
//     seats: 18,
//     bookedSeats: 5,
//     includes: ["فندق 4 نجوم", "جولات تاريخية", "وجبات إيطالية"],
//   },
// ];

// // ─── بيانات تجريبية لطلبات المستخدم ───────────────────────────────────────────
// const DEMO_MY_REQUESTS = [
//   {
//     id: 101,
//     destination: "اليابان، طوكيو",
//     date: "2026-08-10",
//     duration: "9 أيام",
//     travelers: 2,
//     budget: "3000$",
//     transport: "طيران",
//     accommodation: "فندق",
//     notes: "أريد زيارة جبل فوجي وحضور مهرجان الزهور.",
//     status: "pending",
//     submittedAt: "2026-04-20",
//   },
//   {
//     id: 102,
//     destination: "تركيا، إسطنبول",
//     date: "2026-05-25",
//     duration: "5 أيام",
//     travelers: 4,
//     budget: "1500$",
//     transport: "طيران",
//     accommodation: "شقة مفروشة",
//     notes: "",
//     status: "approved",
//     submittedAt: "2026-04-10",
//     rejectReason: null,
//   },
//   {
//     id: 103,
//     destination: "المغرب، مراكش",
//     date: "2026-03-01",
//     duration: "4 أيام",
//     travelers: 3,
//     budget: "800$",
//     transport: "حافلة",
//     accommodation: "رياض تقليدي",
//     notes: "أريد جولة في الأسواق القديمة.",
//     status: "rejected",
//     submittedAt: "2026-02-15",
//     rejectReason: "التاريخ المطلوب غير متاح حالياً.",
//   },
// ];

// // ─── خريطة حالات الطلبات ────────────────────────────────────────────────────
// const STATUS_MAP = {
//   pending: {
//     label: "قيد المراجعة",
//     color: "warning",
//     icon: <HourglassEmptyIcon fontSize="small" />,
//   },
//   approved: {
//     label: "تم القبول",
//     color: "success",
//     icon: <CheckCircleIcon fontSize="small" />,
//   },
//   rejected: {
//     label: "تم الرفض",
//     color: "error",
//     icon: <CancelIcon fontSize="small" />,
//   },
// };

// // ─── Style موحد للأزرار ───────────────────────────────────────────────────────
// const primaryBtnSx = (mode) => ({
//   borderRadius: "14px",
//   fontFamily: "Cairo",
//   fontWeight: "bold",
//   fontSize: "0.95rem",
//   textTransform: "none",
//   px: 3,
//   py: 1.1,
//   background: mode === "dark"
//     ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
//     : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
//   color: "#fff",
//   boxShadow: mode === "dark"
//     ? "0 4px 20px rgba(0,229,255,0.3)"
//     : "0 4px 20px rgba(25,118,210,0.3)",
//   transition: "0.3s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: mode === "dark"
//       ? "0 8px 28px rgba(0,229,255,0.45)"
//       : "0 8px 28px rgba(25,118,210,0.4)",
//     background: mode === "dark"
//       ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
//       : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
//   },
// });

// const secondaryBtnSx = (mode) => ({
//   borderRadius: "14px",
//   fontFamily: "Cairo",
//   fontWeight: "bold",
//   fontSize: "0.9rem",
//   textTransform: "none",
//   border: "2px solid",
//   borderColor: mode === "dark" ? "rgba(0,229,255,0.5)" : "rgba(25,118,210,0.5)",
//   color: mode === "dark" ? "#00e5ff" : "#1976d2",
//   transition: "0.3s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     bgcolor: mode === "dark" ? "rgba(0,229,255,0.08)" : "rgba(25,118,210,0.08)",
//     borderColor: mode === "dark" ? "#00e5ff" : "#1976d2",
//   },
// });

// // ──────────────────────────────────────────────────────────────────────────────
// const UserHome = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [myRequests, setMyRequests] = useState(DEMO_MY_REQUESTS);
//   const [loading, setLoading] = useState(true);
//   const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");
//   const [activeTab, setActiveTab] = useState(0);

//   // dialogs
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [bookingOpen, setBookingOpen] = useState(false);
//   const [requestOpen, setRequestOpen] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   // نموذج الحجز المباشر
//   const [bookingForm, setBookingForm] = useState({ travelers: 1, notes: "" });

//   // نموذج طلب رحلة مخصص
//   const [requestForm, setRequestForm] = useState({
//     destination: "",
//     date: "",
//     duration: "",
//     travelers: 1,
//     budget: "",
//     transport: "",
//     accommodation: "",
//     notes: "",
//   });

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: { main: mode === "dark" ? "#00e5ff" : "#1976d2" },
//           background: {
//             default: mode === "dark" ? "#050c14" : "#f4f6f8",
//             paper: mode === "dark" ? "#0b1929" : "#ffffff",
//           },
//         },
//         typography: { fontFamily: "Cairo, sans-serif" },
//       }),
//     [mode]
//   );

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user_info");
//     if (savedUser) setUser(JSON.parse(savedUser));
//     fetchTrips();
//   }, []);

//   const fetchTrips = async () => {
//     try {
//       const response = await api.get("/trips");
//       setTrips(response.data);
//     } catch {
//       setTrips(DEMO_TRIPS);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleTheme = () => {
//     const newMode = mode === "light" ? "dark" : "light";
//     setMode(newMode);
//     localStorage.setItem("themeMode", newMode);
//   };

//   const handleOpenBooking = (trip) => {
//     if (trip.bookedSeats >= trip.seats) return;
//     setSelectedTrip(trip);
//     setBookingForm({ travelers: 1, notes: "" });
//     setBookingOpen(true);
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       // await api.post("/bookings", { trip_id: selectedTrip.id, ...bookingForm });
//       setTrips((prev) =>
//         prev.map((t) =>
//           t.id === selectedTrip.id
//             ? { ...t, bookedSeats: t.bookedSeats + Number(bookingForm.travelers) }
//             : t
//         )
//       );
//       setBookingOpen(false);
//       showSnackbar(`تم تقديم حجزك على رحلة "${selectedTrip.title}" بنجاح! ✈️`, "success");
//     } catch {
//       showSnackbar("حدث خطأ أثناء الحجز، حاول مجدداً.", "error");
//     }
//   };

//   const handleSubmitRequest = async () => {
//     if (!requestForm.destination || !requestForm.date) {
//       showSnackbar("يرجى ملء حقل الوجهة والتاريخ على الأقل.", "warning");
//       return;
//     }
//     try {
//       // await api.post("/trip-requests", requestForm);
//       const newReq = {
//         id: Date.now(),
//         ...requestForm,
//         status: "pending",
//         submittedAt: new Date().toISOString().slice(0, 10),
//       };
//       setMyRequests((prev) => [newReq, ...prev]);
//       setRequestOpen(false);
//       setRequestForm({ destination: "", date: "", duration: "", travelers: 1, budget: "", transport: "", accommodation: "", notes: "" });
//       showSnackbar("تم إرسال طلبك بنجاح! سيراجعه المدير قريباً. 📋", "success");
//       setActiveTab(1); // ننتقل لتبويب طلباتي
//     } catch {
//       showSnackbar("حدث خطأ أثناء الإرسال، حاول مجدداً.", "error");
//     }
//   };

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const pendingCount = myRequests.filter((r) => r.status === "pending").length;

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#050c14" }}>
//         <CircularProgress sx={{ color: "#00e5ff" }} />
//       </Box>
//     );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: "100vh", pb: 10, direction: "rtl" }}>

//         {/* ─── Navbar ─────────────────────────────────────────────────────── */}
//         <AppBar
//           position="sticky"
//           elevation={0}
//           sx={{
//             borderBottom: "1px solid",
//             borderColor: "divider",
//             backdropFilter: "blur(12px)",
//             backgroundColor: mode === "dark" ? "rgba(11, 25, 41, 0.8)" : "rgba(255,255,255,0.85)",
//           }}
//         >
//           <Container maxWidth="lg">
//             <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 2 } }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <FlightTakeoff color="primary" />
//                 <Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main", fontFamily: "Cairo" }}>
//                   ترافيل جو
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Tooltip title={mode === "dark" ? "الوضع النهاري" : "الوضع الليلي"}>
//                   <IconButton
//                     onClick={toggleTheme}
//                     sx={{
//                       bgcolor: mode === "dark" ? "rgba(255,234,0,0.1)" : "rgba(245,124,0,0.1)",
//                       color: mode === "dark" ? "#ffea00" : "#f57c00",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   >
//                     {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="ملفي الشخصي">
//                   <IconButton
//                     onClick={() => setProfileOpen(true)}
//                     sx={{ p: 0.5, border: "2px solid", borderColor: "primary.main" }}
//                   >
//                     <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "14px", fontWeight: "bold", color: mode === "dark" ? "#000" : "#fff" }}>
//                       {user?.name?.charAt(0) || "م"}
//                     </Avatar>
//                   </IconButton>
//                 </Tooltip>

//                 <IconButton onClick={() => { localStorage.clear(); navigate("/login"); }} color="error">
//                   <Logout />
//                 </IconButton>
//               </Box>
//             </Toolbar>
//           </Container>
//         </AppBar>

//         {/* ─── Hero ────────────────────────────────────────────────────────── */}
//         <Box
//           sx={{
//             position: "relative",
//             height: { xs: "230px", md: "360px" },
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             overflow: "hidden",
//             mb: 5,
//             backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
//               url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             borderRadius: { xs: "0 0 20px 20px", md: "0 0 50px 50px" },
//           }}
//         >
//           <Stack spacing={2}  sx={{ textAlign: "center", px: 2 ,alignItems="center"}}>
//             <Typography
//               variant="h2"
//               fontWeight="bold"
//               sx={{ color: "#fff", fontFamily: "Cairo", fontSize: { xs: "1.7rem", md: "3.5rem" }, textShadow: "2px 4px 20px rgba(0,0,0,0.8)" }}
//             >
//               أهلاً بك، {user?.name?.split(" ")[0] || "مسافرنا"}! ✈️
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ color: "rgba(255,255,255,0.9)", fontFamily: "Cairo", maxWidth: "700px", fontSize: { xs: "0.9rem", md: "1.2rem" }, fontWeight: 300 }}
//             >
//               بوابتك لاستكشاف أجمل بقاع الأرض وتخطيط رحلة العمر
//             </Typography>
//             {/* زر طلب رحلة مخصصة في الهيرو */}
//             <Button
//               variant="contained"
//               onClick={() => setRequestOpen(true)}
//               sx={{ ...primaryBtnSx(mode), mt: 1, px: 5, py: 1.3, fontSize: "1rem" }}
//             >
//               اطلب رحلة مخصصة
//             </Button>
//           </Stack>
//         </Box>

//         {/* ─── Tabs ────────────────────────────────────────────────────────── */}
//         <Container maxWidth="lg">
//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
//             <Tabs
//               value={activeTab}
//               onChange={(_, v) => setActiveTab(v)}
//               sx={{ "& .MuiTab-root": { fontFamily: "Cairo", fontWeight: "bold", fontSize: "1rem" } }}
//             >
//               <Tab
//                 icon={<ExploreIcon />}
//                 iconPosition="start"
//                 label="الرحلات المتاحة"
//               />
//               <Tab
//                 icon={
//                   <Badge badgeContent={pendingCount} color="warning">
//                     <ListAltIcon />
//                   </Badge>
//                 }
//                 iconPosition="start"
//                 label="طلباتي"
//               />
//             </Tabs>
//           </Box>

//           {/* ─── تاب 1: الرحلات المتاحة ──────────────────────────────────── */}
//           {activeTab === 0 && (
//             <>
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 sx={{ fontFamily: "Cairo", mb: 4, borderRight: "5px solid", borderColor: "primary.main", pr: 2 }}
//               >
//                 اكتشف وجهتك التالية 🌍
//               </Typography>
//               <Grid container spacing={3}>
//                 {trips.map((trip) => {
//                   const isFull = trip.bookedSeats >= trip.seats;
//                   const fillPercent = Math.min((trip.bookedSeats / trip.seats) * 100, 100);
//                   return (
//                     <Grid item key={trip.id} xs={12} sm={6} md={4} lg={3}>
//                       <Card
//                         sx={{
//                           borderRadius: 4,
//                           height: "100%",
//                           display: "flex",
//                           flexDirection: "column",
//                           transition: "0.3s",
//                           backgroundColor: "background.paper",
//                           border: "1px solid",
//                           borderColor: "divider",
//                           overflow: "hidden",
//                           "&:hover": {
//                             transform: "translateY(-8px)",
//                             boxShadow: mode === "dark" ? "0 20px 40px rgba(0,229,255,0.1)" : "0 20px 40px rgba(0,0,0,0.1)",
//                           },
//                         }}
//                       >
//                         <Box sx={{ position: "relative", overflow: "hidden" }}>
//                           <CardMedia
//                             component="img"
//                             height="200"
//                             image={trip.image}
//                             sx={{ transition: "0.5s", "&:hover": { transform: "scale(1.08)" } }}
//                           />
//                         <Chip
//                           label={trip.price}
//                             sx={{position: "absolute", top: 12,right: 12,fontWeight: "bold",bgcolor: "primary.main",color: "#fff",}}
//                         />

//                           {isFull && (
//                             <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <Chip label="مكتملة" color="error" sx={{ fontFamily: "Cairo", fontWeight: "bold", fontSize: "1rem", px: 2 }} />
//                             </Box>
//                           )}
//                         </Box>

//                         <CardContent sx={{ textAlign: "right", flexGrow: 1, p: 2.5 }}>
//                           <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>
//                             {trip.title}
//                           </Typography>
//                           <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", mb: 1.5 }}>
//                             <LocationOn fontSize="small" color="primary" />
//                             <Typography variant="body2" sx={{ fontFamily: "Cairo" }}>{trip.location}</Typography>
//                           </Stack>
//                           <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 2, lineHeight: 1.7 }}>
//                             {trip.description}
//                           </Typography>

//                           {/* ما تشمله الرحلة */}
//                           <Stack direction="row" spacing={0.5}  sx={{ flexWrap="wrap" }}  gap={0.5} mb={2}>
//                             {trip.includes?.map((inc, i) => (
//                               <Chip key={i} label={inc} size="small" variant="outlined" sx={{ fontFamily: "Cairo", fontSize: "0.7rem" }} />
//                             ))}
//                           </Stack>

//                           <Divider sx={{ my: 1.5, opacity: 0.4 }} />

//                           <Grid container spacing={1}>
//                             <Grid item xs={6} display="flex" alignItems="center" gap={0.5}>
//                               <AccessTime fontSize="small" color="primary" />
//                               <Typography variant="caption" sx={{ fontWeight: "bold", fontFamily: "Cairo" }}>{trip.duration}</Typography>
//                             </Grid>
//                             <Grid item xs={6} display="flex" alignItems="center" gap={0.5}  sx={{justifyContent="flex-end" }}>
//                               <Typography variant="caption" sx={{ fontWeight: "bold", fontFamily: "Cairo" }}>{trip.date}</Typography>
//                               <Event fontSize="small" color="primary" />
//                             </Grid>
//                           </Grid>

//                           {/* شريط المقاعد */}
//                           <Box sx={{ mt: 2 }}>
//                             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//                               <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
//                                 المقاعد المتاحة
//                               </Typography>
//                               <Typography variant="caption" sx={{ fontFamily: "Cairo", fontWeight: "bold", color: isFull ? "error.main" : "success.main" }}>
//                                 {trip.seats - trip.bookedSeats} / {trip.seats}
//                               </Typography>
//                             </Box>
//                             <Box sx={{ height: 6, borderRadius: 3, bgcolor: "divider", overflow: "hidden" }}>
//                               <Box sx={{ height: "100%", width: `${fillPercent}%`, bgcolor: isFull ? "error.main" : fillPercent > 70 ? "warning.main" : "success.main", borderRadius: 3, transition: "0.5s" }} />
//                             </Box>
//                           </Box>
//                         </CardContent>

//                         <Box sx={{ p: 2, pt: 0 }}>
//                           <Button
//                             fullWidth
//                             variant={isFull ? "outlined" : "contained"}
//                             disabled={isFull}
//                             onClick={() => handleOpenBooking(trip)}
//                             sx={isFull
//                               ? { ...secondaryBtnSx(mode), py: 1.2, opacity: 0.5 }
//                               : { ...primaryBtnSx(mode), py: 1.2 }
//                             }
//                           >
//                             {isFull ? "الرحلة مكتملة" : "احجز الآن"}
//                           </Button>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   );
//                 })}
//               </Grid>

//               {/* بانر طلب رحلة مخصصة */}
//               <Box
//                 sx={{
//                   mt: 6,
//                   p: { xs: 3, md: 5 },
//                   borderRadius: 4,
//                   background: mode === "dark"
//                     ? "linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)"
//                     : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
//                   border: "1px solid",
//                   borderColor: "primary.main",
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>
//                   🗺️ لم تجد ما تبحث عنه؟
//                 </Typography>
//                 <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 3 }}>
//                   اطلب رحلتك المخصصة وحدد مواصفاتها بنفسك، وسيتولى المدير تنظيمها لك!
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={() => setRequestOpen(true)}
//                   sx={{ ...primaryBtnSx(mode), px: 5, py: 1.3 }}
//                 >
//                   اطلب رحلة مخصصة
//                 </Button>
//               </Box>
//             </>
//           )}

//           {/* ─── تاب 2: طلباتي ───────────────────────────────────────────── */}
//           {activeTab === 1 && (
//             <>
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//                 <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Cairo", borderRight: "5px solid", borderColor: "primary.main", pr: 2 }}>
//                   طلباتي 📋
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={() => setRequestOpen(true)}
//                   sx={{
//                     borderRadius: "14px",
//                     fontFamily: "Cairo",
//                     fontWeight: "bold",
//                     fontSize: "0.95rem",
//                     px: 3,
//                     py: 1.1,
//                     background: mode === "dark"
//                       ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
//                       : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
//                     color: "#fff",
//                     textTransform: "none",
//                     boxShadow: mode === "dark"
//                       ? "0 4px 20px rgba(0,229,255,0.3)"
//                       : "0 4px 20px rgba(25,118,210,0.3)",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "translateY(-2px)",
//                       boxShadow: mode === "dark"
//                         ? "0 8px 25px rgba(0,229,255,0.45)"
//                         : "0 8px 25px rgba(25,118,210,0.4)",
//                     },
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 0.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 26,
//                       height: 26,
//                       borderRadius: "8px",
//                       bgcolor: "rgba(255,255,255,0.2)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.1rem",
//                       fontWeight: "bold",
//                       lineHeight: 1,
//                       mr: 0.5,
//                     }}
//                   >
//                     +
//                   </Box>
//                   طلب جديد
//                 </Button>
//               </Box>

//               {myRequests.length === 0 ? (
//                 <Box sx={{ textAlign: "center", py: 10 }}>
//                   <ListAltIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
//                   <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", fontSize: "1.1rem" }}>
//                     لا توجد طلبات بعد. اطلب رحلتك المخصصة الآن!
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Stack spacing={2}>
//                   {myRequests.map((req) => {
//                     const statusInfo = STATUS_MAP[req.status];
//                     return (
//                       <Card
//                         key={req.id}
//                         sx={{
//                           borderRadius: 3,
//                           border: "1px solid",
//                           borderColor: req.status === "approved" ? "success.main" : req.status === "rejected" ? "error.main" : "divider",
//                           p: 0,
//                           overflow: "hidden",
//                         }}
//                       >
//                         {/* شريط الحالة العلوي */}
//                         <Box
//                           sx={{
//                             px: 3,
//                             py: 1,
//                             bgcolor: req.status === "approved" ? "success.main" : req.status === "rejected" ? "error.main" : "warning.main",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Stack direction="row" alignItems="center" spacing={1}>
//                             {statusInfo.icon}
//                             <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold", color: "#fff", fontSize: "0.9rem" }}>
//                               {statusInfo.label}
//                             </Typography>
//                           </Stack>
//                           <Typography sx={{ fontFamily: "Cairo", color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}>
//                             تاريخ الطلب: {req.submittedAt}
//                           </Typography>
//                         </Box>

//                         <CardContent sx={{ p: 3, direction: "rtl" }}>
//                           <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6} md={3}>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <LocationOn color="primary" fontSize="small" />
//                                 <Box>
//                                   <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>الوجهة</Typography>
//                                   <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.destination}</Typography>
//                                 </Box>
//                               </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <Event color="primary" fontSize="small" />
//                                 <Box>
//                                   <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>تاريخ الرحلة</Typography>
//                                   <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.date}</Typography>
//                                 </Box>
//                               </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <PeopleIcon color="primary" fontSize="small" />
//                                 <Box>
//                                   <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>عدد المسافرين</Typography>
//                                   <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.travelers} أشخاص</Typography>
//                                 </Box>
//                               </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <AttachMoneyIcon color="primary" fontSize="small" />
//                                 <Box>
//                                   <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>الميزانية</Typography>
//                                   <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.budget}</Typography>
//                                 </Box>
//                               </Stack>
//                             </Grid>
//                           </Grid>

//                           <Divider sx={{ my: 2, opacity: 0.3 }} />

//                           <Grid container spacing={2}>
//                             <Grid item xs={6} sm={3}>
//                               <Stack direction="row" spacing={0.5} alignItems="center">
//                                 <DirectionsBusIcon color="action" fontSize="small" />
//                                 <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
//                                   وسيلة نقل: <strong>{req.transport || "—"}</strong>
//                                 </Typography>
//                               </Stack>
//                             </Grid>
//                             <Grid item xs={6} sm={3}>
//                               <Stack direction="row" spacing={0.5} alignItems="center">
//                                 <HotelIcon color="action" fontSize="small" />
//                                 <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
//                                   الإقامة: <strong>{req.accommodation || "—"}</strong>
//                                 </Typography>
//                               </Stack>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                               <Stack direction="row" spacing={0.5} alignItems="center">
//                                 <AccessTime color="action" fontSize="small" />
//                                 <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
//                                   المدة: <strong>{req.duration || "—"}</strong>
//                                 </Typography>
//                               </Stack>
//                             </Grid>
//                           </Grid>

//                           {req.notes && (
//                             <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
//                               <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
//                                 📝 {req.notes}
//                               </Typography>
//                             </Box>
//                           )}

//                           {req.status === "rejected" && req.rejectReason && (
//                             <Alert severity="error" sx={{ mt: 2, fontFamily: "Cairo", direction: "rtl" }}>
//                               سبب الرفض: {req.rejectReason}
//                             </Alert>
//                           )}
//                         </CardContent>
//                       </Card>
//                     );
//                   })}
//                 </Stack>
//               )}
//             </>
//           )}
//         </Container>

//         {/* ─── Dialog: الملف الشخصي ────────────────────────────────────────── */}
//         <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} dir="rtl" PaperProps={{ sx: { borderRadius: 5, width: "100%", maxWidth: 380 } }}>
//           <Box sx={{ height: 90, bgcolor: "primary.main", position: "relative", mb: 6 }}>
//             <Avatar
//               sx={{ width: 90, height: 90, position: "absolute", bottom: -45, left: "50%", transform: "translateX(-50%)", border: "4px solid", borderColor: "background.paper", bgcolor: "background.default", fontSize: "1.8rem" }}
//             >
//               {user?.name?.charAt(0) || "م"}
//             </Avatar>
//           </Box>
//           <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Cairo", pt: 0 }}>
//             {user?.name || "المستخدم"}
//           </DialogTitle>
//           <DialogContent>
//             <List>
//               <ListItem>
//                 <ListItemIcon><BadgeIcon color="primary" /></ListItemIcon>
//                 <ListItemText primary="الاسم الكامل" secondary={user?.name || "غير متوفر"} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
//                 <ListItemText primary="البريد الإلكتروني" secondary={user?.email || "غير متوفر"} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
//                 <ListItemText primary="نوع الحساب" secondary="مسافر" primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon><ListAltIcon color="primary" /></ListItemIcon>
//                 <ListItemText primary="عدد طلباتي" secondary={`${myRequests.length} طلبات`} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
//               </ListItem>
//             </List>
//           </DialogContent>
//           <DialogActions sx={{ p: 3, justifyContent: "center" }}>
//             <Button onClick={() => setProfileOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode), px: 4 }}>إغلاق</Button>
//           </DialogActions>
//         </Dialog>

//         {/* ─── Dialog: حجز رحلة متاحة ──────────────────────────────────────── */}
//         <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} fullWidth maxWidth="sm" dir="rtl" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
//           <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Cairo", fontSize: "1.4rem", textAlign: "center", pt: 3 }}>
//             ✈️ تأكيد الحجز
//           </DialogTitle>
//           <DialogContent>
//             {selectedTrip && (
//               <Stack spacing={3} sx={{ mt: 1 }}>
//                 <Box sx={{ p: 2, borderRadius: 3, bgcolor: mode === "dark" ? "rgba(0,229,255,0.06)" : "rgba(25,118,210,0.06)", border: "1px solid", borderColor: "primary.main" }}>
//                   <Typography fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 0.5 }}>{selectedTrip.title}</Typography>
//                   <Stack direction="row" spacing={2}  sx={{ flexWrap="wrap" }}>
//                     <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>📍 {selectedTrip.location}</Typography>
//                     <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>📅 {selectedTrip.date}</Typography>
//                     <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "primary.main", fontWeight: "bold" }}>💰 {selectedTrip.price} / فرد</Typography>
//                   </Stack>
//                 </Box>

//                 <TextField
//                   fullWidth
//                   label="عدد المسافرين"
//                   type="number"
//                   inputProps={{ min: 1, max: selectedTrip.seats - selectedTrip.bookedSeats }}
//                   value={bookingForm.travelers}
//                   onChange={(e) => setBookingForm((p) => ({ ...p, travelers: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo" }, "& input": { fontFamily: "Cairo" } }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="ملاحظات (اختياري)"
//                   multiline
//                   rows={2}
//                   value={bookingForm.notes}
//                   onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo" }, "& textarea": { fontFamily: "Cairo" } }}
//                 />

//                 <Box sx={{ p: 2, borderRadius: 2, bgcolor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
//                   <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", fontSize: "0.9rem" }}>
//                     💡 عند الحجز سيتم زيادة عدد المشاركين في الرحلة تلقائياً وسيصلك تأكيد.
//                   </Typography>
//                 </Box>
//               </Stack>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ p: 3, gap: 2, justifyContent: "center" }}>
//             <Button onClick={() => setBookingOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode) }}>تراجع</Button>
//             <Button onClick={handleConfirmBooking} variant="contained" sx={{ ...primaryBtnSx(mode), px: 5 }}>
//               تأكيد الحجز
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* ─── Dialog: طلب رحلة مخصصة ──────────────────────────────────────── */}
//         <Dialog open={requestOpen} onClose={() => setRequestOpen(false)} fullWidth maxWidth="sm" dir="rtl" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
//           <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Cairo", fontSize: "1.4rem", textAlign: "center", pt: 3 }}>
//             🗺️ اطلب رحلة مخصصة
//           </DialogTitle>
//           <DialogContent>
//             <Stack spacing={2.5} sx={{ mt: 1 }}>
//               <TextField
//                 fullWidth required
//                 label="الوجهة المطلوبة"
//                 value={requestForm.destination}
//                 onChange={(e) => setRequestForm((p) => ({ ...p, destination: e.target.value }))}
//                 InputProps={{ startAdornment: <LocationOn sx={{ color: "primary.main", ml: 1 }} /> }}
//                 sx={{ "& label": { fontFamily: "Cairo", right: 40, left: "auto", transformOrigin: "right" } }}
//               />
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth required
//                   label="تاريخ الرحلة"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={requestForm.date}
//                   onChange={(e) => setRequestForm((p) => ({ ...p, date: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo" } }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="المدة"
//                   placeholder="مثال: 7 أيام"
//                   value={requestForm.duration}
//                   onChange={(e) => setRequestForm((p) => ({ ...p, duration: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
//                 />
//               </Box>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="عدد المسافرين"
//                   type="number"
//                   inputProps={{ min: 1 }}
//                   value={requestForm.travelers}
//                   onChange={(e) => setRequestForm((p) => ({ ...p, travelers: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="الميزانية التقريبية"
//                   placeholder="مثال: 2000$"
//                   value={requestForm.budget}
//                   onChange={(e) => setRequestForm((p) => ({ ...p, budget: e.target.value }))}
//                   sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
//                 />
//               </Box>
//               <FormControl fullWidth>
//                 <InputLabel sx={{ fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" }}>وسيلة النقل المفضلة</InputLabel>
//                 <Select
//                   value={requestForm.transport}
//                   label="وسيلة النقل المفضلة"
//                   onChange={(e) => setRequestForm((p) => ({ ...p, transport: e.target.value }))}
//                   sx={{ fontFamily: "Cairo" }}
//                 >
//                   {["طيران", "حافلة سياحية", "سيارة خاصة", "قطار", "سفينة"].map((t) => (
//                     <MenuItem key={t} value={t} sx={{ fontFamily: "Cairo" }}>{t}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth>
//                 <InputLabel sx={{ fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" }}>نوع الإقامة</InputLabel>
//                 <Select
//                   value={requestForm.accommodation}
//                   label="نوع الإقامة"
//                   onChange={(e) => setRequestForm((p) => ({ ...p, accommodation: e.target.value }))}
//                   sx={{ fontFamily: "Cairo" }}
//                 >
//                   {["فندق 5 نجوم", "فندق 4 نجوم", "فندق 3 نجوم", "شقة مفروشة", "رياض تقليدي", "أي نوع"].map((a) => (
//                     <MenuItem key={a} value={a} sx={{ fontFamily: "Cairo" }}>{a}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 label="ملاحظات إضافية (اختياري)"
//                 multiline rows={3}
//                 placeholder="أي تفاصيل خاصة تريد إضافتها..."
//                 value={requestForm.notes}
//                 onChange={(e) => setRequestForm((p) => ({ ...p, notes: e.target.value }))}
//                 sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
//               />
//             </Stack>
//           </DialogContent>
//           <DialogActions sx={{ p: 3, gap: 2, justifyContent: "center" }}>
//             <Button onClick={() => setRequestOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode) }}>تراجع</Button>
//             <Button onClick={handleSubmitRequest} variant="contained" sx={{ ...primaryBtnSx(mode), px: 5 }}>
//               إرسال الطلب
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* ─── Snackbar ────────────────────────────────────────────────────── */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert severity={snackbar.severity} sx={{ fontFamily: "Cairo", minWidth: 300 }} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default UserHome;




// import React from 'react';

// const UserHome = () => {
//   return <div>UserHome works</div>;
// };

// export default UserHome;



import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  CircularProgress,
  Divider,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge,
  Alert,
  Snackbar,
} from "@mui/material";

import Logout from "@mui/icons-material/Logout";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import Event from "@mui/icons-material/Event";
import AccessTime from "@mui/icons-material/AccessTime";
import LocationOn from "@mui/icons-material/LocationOn";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExploreIcon from "@mui/icons-material/Explore";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// ─── بيانات تجريبية للرحلات المتاحة ───────────────────────────────────────────
const DEMO_TRIPS = [
  {
    id: 1,
    title: "سحر جزر المالديف",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    price: "2500$",
    date: "2026-05-10",
    duration: "7 أيام",
    location: "المالديف",
    description: "استمتع بإقامة فاخرة في منتجعات المالديف وشواطئها الخلابة.",
    seats: 20,
    bookedSeats: 14,
    includes: ["فندق 5 نجوم", "طيران مباشر", "وجبات كاملة"],
  },
  {
    id: 2,
    title: "مغامرة جبال الألب",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    price: "3200$",
    date: "2026-06-15",
    duration: "10 أيام",
    location: "سويسرا",
    description: "جولات جبلية وتجربة العيش في أكواخ تقليدية.",
    seats: 15,
    bookedSeats: 7,
    includes: ["إقامة في أكواخ", "حافلة خاصة", "دليل سياحي"],
  },
  {
    id: 3,
    title: "أضواء لندن الشتوية",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    price: "1800$",
    date: "2026-12-01",
    duration: "5 أيام",
    location: "لندن، بريطانيا",
    description: "تسوق في شارع أكسفورد وزيارة ساعة بيغ بين.",
    seats: 25,
    bookedSeats: 25,
    includes: ["فندق 4 نجوم", "جولة سياحية", "بطاقة مواصلات"],
  },
  {
    id: 4,
    title: "روما الأبدية",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    price: "2100$",
    date: "2026-07-20",
    duration: "8 أيام",
    location: "روما، إيطاليا",
    description: "استكشف الكولوسيوم وتيفولي والمطبخ الإيطالي الأصيل.",
    seats: 18,
    bookedSeats: 5,
    includes: ["فندق 4 نجوم", "جولات تاريخية", "وجبات إيطالية"],
  },
];

// ─── بيانات تجريبية لطلبات المستخدم ───────────────────────────────────────────
const DEMO_MY_REQUESTS = [
  {
    id: 101,
    destination: "اليابان، طوكيو",
    date: "2026-08-10",
    duration: "9 أيام",
    travelers: 2,
    budget: "3000$",
    transport: "طيران",
    accommodation: "فندق",
    notes: "أريد زيارة جبل فوجي وحضور مهرجان الزهور.",
    status: "pending",
    submittedAt: "2026-04-20",
  },
  {
    id: 102,
    destination: "تركيا، إسطنبول",
    date: "2026-05-25",
    duration: "5 أيام",
    travelers: 4,
    budget: "1500$",
    transport: "طيران",
    accommodation: "شقة مفروشة",
    notes: "",
    status: "approved",
    submittedAt: "2026-04-10",
    rejectReason: null,
  },
  {
    id: 103,
    destination: "المغرب، مراكش",
    date: "2026-03-01",
    duration: "4 أيام",
    travelers: 3,
    budget: "800$",
    transport: "حافلة",
    accommodation: "رياض تقليدي",
    notes: "أريد جولة في الأسواق القديمة.",
    status: "rejected",
    submittedAt: "2026-02-15",
    rejectReason: "التاريخ المطلوب غير متاح حالياً.",
  },
];

// ─── خريطة حالات الطلبات ────────────────────────────────────────────────────
const STATUS_MAP = {
  pending: {
    label: "قيد المراجعة",
    color: "warning",
    icon: <HourglassEmptyIcon fontSize="small" />,
  },
  approved: {
    label: "تم القبول",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  rejected: {
    label: "تم الرفض",
    color: "error",
    icon: <CancelIcon fontSize="small" />,
  },
};

// ─── Style موحد للأزرار ───────────────────────────────────────────────────────
const primaryBtnSx = (mode) => ({
  borderRadius: "14px",
  fontFamily: "Cairo",
  fontWeight: "bold",
  fontSize: "0.95rem",
  textTransform: "none",
  px: 3,
  py: 1.1,
  background: mode === "dark"
    ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
    : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
  color: "#fff",
  boxShadow: mode === "dark"
    ? "0 4px 20px rgba(0,229,255,0.3)"
    : "0 4px 20px rgba(25,118,210,0.3)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: mode === "dark"
      ? "0 8px 28px rgba(0,229,255,0.45)"
      : "0 8px 28px rgba(25,118,210,0.4)",
    background: mode === "dark"
      ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
      : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
  },
});

const secondaryBtnSx = (mode) => ({
  borderRadius: "14px",
  fontFamily: "Cairo",
  fontWeight: "bold",
  fontSize: "0.9rem",
  textTransform: "none",
  border: "2px solid",
  borderColor: mode === "dark" ? "rgba(0,229,255,0.5)" : "rgba(25,118,210,0.5)",
  color: mode === "dark" ? "#00e5ff" : "#1976d2",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    bgcolor: mode === "dark" ? "rgba(0,229,255,0.08)" : "rgba(25,118,210,0.08)",
    borderColor: mode === "dark" ? "#00e5ff" : "#1976d2",
  },
});

// ──────────────────────────────────────────────────────────────────────────────
const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [myRequests, setMyRequests] = useState(DEMO_MY_REQUESTS);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");
  const [activeTab, setActiveTab] = useState(0);

  const [profileOpen, setProfileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [bookingForm, setBookingForm] = useState({ travelers: 1, notes: "" });
  const [requestForm, setRequestForm] = useState({
    destination: "",
    date: "",
    duration: "",
    travelers: 1,
    budget: "",
    transport: "",
    accommodation: "",
    notes: "",
  });

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

  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchTrips();
  }, []);

 const fetchTrips = async () => {
  try {
    const response = await api.get("/trips");
    
    // ✅ طباعة الاستجابة لفحص شكلها في الـ Console (F12)
    console.log("رد API للرحلات:", response);
    console.log("البيانات الفعلية:", response.data);

    // ✅ استخراج المصفوفة من الاستجابة بشكل صحيح
    let tripsData = [];
    if (Array.isArray(response.data)) {
      // الحالة 1: الرد عبارة عن مصفوفة مباشرة
      tripsData = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      // الحالة 2: الرد عبارة عن كائن يحوي مصفوفة داخل حقل 'data'
      tripsData = response.data.data;
    } else if (response.data && Array.isArray(response.data.trips)) {
      // الحالة 3: الرد عبارة عن كائن يحوي مصفوفة داخل حقل 'trips'
      tripsData = response.data.trips;
    } else {
      // إذا لم نعثر على المصفوفة، نعرض تحذيراً في الـ Console
      console.warn("لم يتم العثور على مصفوفة الرحلات في الاستجابة:", response.data);
      tripsData = [];
    }
    setTrips(tripsData);
  } catch (error) {
    console.error("خطأ في جلب الرحلات:", error);
    setTrips(DEMO_TRIPS);
  } finally {
    setLoading(false);
  }
};

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const handleOpenBooking = (trip) => {
    if (trip.bookedSeats >= trip.seats) return;
    setSelectedTrip(trip);
    setBookingForm({ travelers: 1, notes: "" });
    setBookingOpen(true);
  };

  const handleConfirmBooking = async () => {
    try {
      setTrips((prev) =>
        prev.map((t) =>
          t.id === selectedTrip.id
            ? { ...t, bookedSeats: t.bookedSeats + Number(bookingForm.travelers) }
            : t
        )
      );
      setBookingOpen(false);
      showSnackbar(`تم تقديم حجزك على رحلة "${selectedTrip.title}" بنجاح! ✈️`, "success");
    } catch {
      showSnackbar("حدث خطأ أثناء الحجز، حاول مجدداً.", "error");
    }
  };

  const handleSubmitRequest = async () => {
    if (!requestForm.destination || !requestForm.date) {
      showSnackbar("يرجى ملء حقل الوجهة والتاريخ على الأقل.", "warning");
      return;
    }
    try {
      const newReq = {
        id: Date.now(),
        ...requestForm,
        status: "pending",
        submittedAt: new Date().toISOString().slice(0, 10),
      };
      setMyRequests((prev) => [newReq, ...prev]);
      setRequestOpen(false);
      setRequestForm({ destination: "", date: "", duration: "", travelers: 1, budget: "", transport: "", accommodation: "", notes: "" });
      showSnackbar("تم إرسال طلبك بنجاح! سيراجعه المدير قريباً. 📋", "success");
      setActiveTab(1);
    } catch {
      showSnackbar("حدث خطأ أثناء الإرسال، حاول مجدداً.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const pendingCount = myRequests.filter((r) => r.status === "pending").length;

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#050c14" }}>
        <CircularProgress sx={{ color: "#00e5ff" }} />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", pb: 10, direction: "rtl" }}>
        {/* Navbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(12px)",
            backgroundColor: mode === "dark" ? "rgba(11, 25, 41, 0.8)" : "rgba(255,255,255,0.85)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FlightTakeoff color="primary" />
                <Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main", fontFamily: "Cairo" }}>
                  ترافيل جو
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title={mode === "dark" ? "الوضع النهاري" : "الوضع الليلي"}>
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      bgcolor: mode === "dark" ? "rgba(255,234,0,0.1)" : "rgba(245,124,0,0.1)",
                      color: mode === "dark" ? "#ffea00" : "#f57c00",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="ملفي الشخصي">
                  <IconButton
                    onClick={() => setProfileOpen(true)}
                    sx={{ p: 0.5, border: "2px solid", borderColor: "primary.main" }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "14px", fontWeight: "bold", color: mode === "dark" ? "#000" : "#fff" }}>
                      {user?.name?.charAt(0) || "م"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={() => { localStorage.clear(); navigate("/login"); }} color="error">
                  <Logout />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "230px", md: "360px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            mb: 5,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
              url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: { xs: "0 0 20px 20px", md: "0 0 50px 50px" },
          }}
        >
          {/* ✅ التصحيح: كتابة alignItems داخل sx بشكل صحيح */}
          <Stack spacing={2} sx={{ textAlign: "center", px: 2, alignItems: "center" }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: "#fff", fontFamily: "Cairo", fontSize: { xs: "1.7rem", md: "3.5rem" }, textShadow: "2px 4px 20px rgba(0,0,0,0.8)" }}
            >
              أهلاً بك، {user?.name?.split(" ")[0] || "مسافرنا"}! ✈️
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.9)", fontFamily: "Cairo", maxWidth: "700px", fontSize: { xs: "0.9rem", md: "1.2rem" }, fontWeight: 300 }}
            >
              بوابتك لاستكشاف أجمل بقاع الأرض وتخطيط رحلة العمر
            </Typography>
            <Button
              variant="contained"
              onClick={() => setRequestOpen(true)}
              sx={{ ...primaryBtnSx(mode), mt: 1, px: 5, py: 1.3, fontSize: "1rem" }}
            >
              اطلب رحلة مخصصة
            </Button>
          </Stack>
        </Box>

        {/* Tabs */}
        <Container maxWidth="lg">
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{ "& .MuiTab-root": { fontFamily: "Cairo", fontWeight: "bold", fontSize: "1rem" } }}
            >
              <Tab icon={<ExploreIcon />} iconPosition="start" label="الرحلات المتاحة" />
              <Tab
                icon={
                  <Badge badgeContent={pendingCount} color="warning">
                    <ListAltIcon />
                  </Badge>
                }
                iconPosition="start"
                label="طلباتي"
              />
            </Tabs>
          </Box>

          {/* Tab 1: Available Trips */}
          {activeTab === 0 && (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ fontFamily: "Cairo", mb: 4, borderRight: "5px solid", borderColor: "primary.main", pr: 2 }}
              >
                اكتشف وجهتك التالية 🌍
              </Typography>
              <Grid container spacing={3}>
                {trips.map((trip) => {
                  const isFull = trip.bookedSeats >= trip.seats;
                  const fillPercent = Math.min((trip.bookedSeats / trip.seats) * 100, 100);
                  return (
                    <Grid item key={trip.id} xs={12} sm={6} md={4} lg={3}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "0.3s",
                          backgroundColor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: mode === "dark" ? "0 20px 40px rgba(0,229,255,0.1)" : "0 20px 40px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={trip.image}
                            sx={{ transition: "0.5s", "&:hover": { transform: "scale(1.08)" } }}
                          />
                          <Chip
                            label={trip.price}
                            sx={{ position: "absolute", top: 12, right: 12, fontWeight: "bold", bgcolor: "primary.main", color: "#fff" }}
                          />
                          {isFull && (
                            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Chip label="مكتملة" color="error" sx={{ fontFamily: "Cairo", fontWeight: "bold", fontSize: "1rem", px: 2 }} />
                            </Box>
                          )}
                        </Box>

                        <CardContent sx={{ textAlign: "right", flexGrow: 1, p: 2.5 }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>
                            {trip.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", mb: 1.5 }}>
                            <LocationOn fontSize="small" color="primary" />
                            <Typography variant="body2" sx={{ fontFamily: "Cairo" }}>{trip.location}</Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 2, lineHeight: 1.7 }}>
                            {trip.description}
                          </Typography>

                          {/* ✅ التصحيح: flexWrap, gap, mb داخل sx */}
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                            {trip.includes?.map((inc, i) => (
                              <Chip key={i} label={inc} size="small" variant="outlined" sx={{ fontFamily: "Cairo", fontSize: "0.7rem" }} />
                            ))}
                          </Stack>

                          <Divider sx={{ my: 1.5, opacity: 0.4 }} />

                          {/* ✅ التصحيح: استخدام Grid مع خصائص sx فقط */}
                          <Grid container spacing={1}>
                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <AccessTime fontSize="small" color="primary" />
                              <Typography variant="caption" sx={{ fontWeight: "bold", fontFamily: "Cairo" }}>{trip.duration}</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                              <Typography variant="caption" sx={{ fontWeight: "bold", fontFamily: "Cairo" }}>{trip.date}</Typography>
                              <Event fontSize="small" color="primary" />
                            </Grid>
                          </Grid>

                          {/* Seats progress bar */}
                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                              <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
                                المقاعد المتاحة
                              </Typography>
                              <Typography variant="caption" sx={{ fontFamily: "Cairo", fontWeight: "bold", color: isFull ? "error.main" : "success.main" }}>
                                {trip.seats - trip.bookedSeats} / {trip.seats}
                              </Typography>
                            </Box>
                            <Box sx={{ height: 6, borderRadius: 3, bgcolor: "divider", overflow: "hidden" }}>
                              <Box sx={{ height: "100%", width: `${fillPercent}%`, bgcolor: isFull ? "error.main" : fillPercent > 70 ? "warning.main" : "success.main", borderRadius: 3, transition: "0.5s" }} />
                            </Box>
                          </Box>
                        </CardContent>

                        <Box sx={{ p: 2, pt: 0 }}>
                          <Button
                            fullWidth
                            variant={isFull ? "outlined" : "contained"}
                            disabled={isFull}
                            onClick={() => handleOpenBooking(trip)}
                            sx={isFull ? { ...secondaryBtnSx(mode), py: 1.2, opacity: 0.5 } : { ...primaryBtnSx(mode), py: 1.2 }}
                          >
                            {isFull ? "الرحلة مكتملة" : "احجز الآن"}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Custom trip banner */}
              <Box
                sx={{
                  mt: 6,
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background: mode === "dark"
                    ? "linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)"
                    : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                  border: "1px solid",
                  borderColor: "primary.main",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>
                  🗺️ لم تجد ما تبحث عنه؟
                </Typography>
                <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 3 }}>
                  اطلب رحلتك المخصصة وحدد مواصفاتها بنفسك، وسيتولى المدير تنظيمها لك!
                </Typography>
                <Button variant="contained" onClick={() => setRequestOpen(true)} sx={{ ...primaryBtnSx(mode), px: 5, py: 1.3 }}>
                  اطلب رحلة مخصصة
                </Button>
              </Box>
            </>
          )}

          {/* Tab 2: My Requests */}
          {activeTab === 1 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Cairo", borderRight: "5px solid", borderColor: "primary.main", pr: 2 }}>
                  طلباتي 📋
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setRequestOpen(true)}
                  sx={{
                    borderRadius: "14px",
                    fontFamily: "Cairo",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    px: 3,
                    py: 1.1,
                    background: mode === "dark"
                      ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)"
                      : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)",
                    color: "#fff",
                    textTransform: "none",
                    boxShadow: mode === "dark"
                      ? "0 4px 20px rgba(0,229,255,0.3)"
                      : "0 4px 20px rgba(25,118,210,0.3)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: mode === "dark"
                        ? "0 8px 25px rgba(0,229,255,0.45)"
                        : "0 8px 25px rgba(25,118,210,0.4)",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "8px",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      lineHeight: 1,
                      mr: 0.5,
                    }}
                  >
                    +
                  </Box>
                  طلب جديد
                </Button>
              </Box>

              {myRequests.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <ListAltIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
                  <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", fontSize: "1.1rem" }}>
                    لا توجد طلبات بعد. اطلب رحلتك المخصصة الآن!
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {myRequests.map((req) => {
                    const statusInfo = STATUS_MAP[req.status];
                    return (
                      <Card
                        key={req.id}
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: req.status === "approved" ? "success.main" : req.status === "rejected" ? "error.main" : "divider",
                          p: 0,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            px: 3,
                            py: 1,
                            bgcolor: req.status === "approved" ? "success.main" : req.status === "rejected" ? "error.main" : "warning.main",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {statusInfo.icon}
                            <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold", color: "#fff", fontSize: "0.9rem" }}>
                              {statusInfo.label}
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontFamily: "Cairo", color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}>
                            تاريخ الطلب: {req.submittedAt}
                          </Typography>
                        </Box>

                        <CardContent sx={{ p: 3, direction: "rtl" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <LocationOn color="primary" fontSize="small" />
                                <Box>
                                  <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>الوجهة</Typography>
                                  <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.destination}</Typography>
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Event color="primary" fontSize="small" />
                                <Box>
                                  <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>تاريخ الرحلة</Typography>
                                  <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.date}</Typography>
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <PeopleIcon color="primary" fontSize="small" />
                                <Box>
                                  <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>عدد المسافرين</Typography>
                                  <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.travelers} أشخاص</Typography>
                                </Box>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <AttachMoneyIcon color="primary" fontSize="small" />
                                <Box>
                                  <Typography variant="caption" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>الميزانية</Typography>
                                  <Typography sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>{req.budget}</Typography>
                                </Box>
                              </Stack>
                            </Grid>
                          </Grid>

                          <Divider sx={{ my: 2, opacity: 0.3 }} />

                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <DirectionsBusIcon color="action" fontSize="small" />
                                <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
                                  وسيلة نقل: <strong>{req.transport || "—"}</strong>
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <HotelIcon color="action" fontSize="small" />
                                <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
                                  الإقامة: <strong>{req.accommodation || "—"}</strong>
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <AccessTime color="action" fontSize="small" />
                                <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
                                  المدة: <strong>{req.duration || "—"}</strong>
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>

                          {req.notes && (
                            <Box sx={{ mt: 2, p: 1.5, borderRadius: 2, bgcolor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                              <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>
                                📝 {req.notes}
                              </Typography>
                            </Box>
                          )}

                          {req.status === "rejected" && req.rejectReason && (
                            <Alert severity="error" sx={{ mt: 2, fontFamily: "Cairo", direction: "rtl" }}>
                              سبب الرفض: {req.rejectReason}
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              )}
            </>
          )}
        </Container>

        {/* Profile Dialog */}
        <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} dir="rtl" PaperProps={{ sx: { borderRadius: 5, width: "100%", maxWidth: 380 } }}>
          <Box sx={{ height: 90, bgcolor: "primary.main", position: "relative", mb: 6 }}>
            <Avatar
              sx={{ width: 90, height: 90, position: "absolute", bottom: -45, left: "50%", transform: "translateX(-50%)", border: "4px solid", borderColor: "background.paper", bgcolor: "background.default", fontSize: "1.8rem" }}
            >
              {user?.name?.charAt(0) || "م"}
            </Avatar>
          </Box>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Cairo", pt: 0 }}>
            {user?.name || "المستخدم"}
          </DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemIcon><BadgeIcon color="primary" /></ListItemIcon>
                <ListItemText primary="الاسم الكامل" secondary={user?.name || "غير متوفر"} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
              </ListItem>
              <ListItem>
                <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                <ListItemText primary="البريد الإلكتروني" secondary={user?.email || "غير متوفر"} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                <ListItemText primary="نوع الحساب" secondary="مسافر" primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
              </ListItem>
              <ListItem>
                <ListItemIcon><ListAltIcon color="primary" /></ListItemIcon>
                <ListItemText primary="عدد طلباتي" secondary={`${myRequests.length} طلبات`} primaryTypographyProps={{ fontFamily: "Cairo" }} secondaryTypographyProps={{ fontFamily: "Cairo" }} />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: "center" }}>
            <Button onClick={() => setProfileOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode), px: 4 }}>إغلاق</Button>
          </DialogActions>
        </Dialog>

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} fullWidth maxWidth="sm" dir="rtl" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
          <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Cairo", fontSize: "1.4rem", textAlign: "center", pt: 3 }}>
            ✈️ تأكيد الحجز
          </DialogTitle>
          <DialogContent>
            {selectedTrip && (
              <Stack spacing={3} sx={{ mt: 1 }}>
                <Box sx={{ p: 2, borderRadius: 3, bgcolor: mode === "dark" ? "rgba(0,229,255,0.06)" : "rgba(25,118,210,0.06)", border: "1px solid", borderColor: "primary.main" }}>
                  <Typography fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 0.5 }}>{selectedTrip.title}</Typography>
                  {/* ✅ التصحيح: flexWrap داخل sx */}
                  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                    <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>📍 {selectedTrip.location}</Typography>
                    <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>📅 {selectedTrip.date}</Typography>
                    <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "primary.main", fontWeight: "bold" }}>💰 {selectedTrip.price} / فرد</Typography>
                  </Stack>
                </Box>

                <TextField
                  fullWidth
                  label="عدد المسافرين"
                  type="number"
                  inputProps={{ min: 1, max: selectedTrip.seats - selectedTrip.bookedSeats }}
                  value={bookingForm.travelers}
                  onChange={(e) => setBookingForm((p) => ({ ...p, travelers: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo" }, "& input": { fontFamily: "Cairo" } }}
                />
                <TextField
                  fullWidth
                  label="ملاحظات (اختياري)"
                  multiline
                  rows={2}
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo" }, "& textarea": { fontFamily: "Cairo" } }}
                />

                <Box sx={{ p: 2, borderRadius: 2, bgcolor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                  <Typography sx={{ fontFamily: "Cairo", color: "text.secondary", fontSize: "0.9rem" }}>
                    💡 عند الحجز سيتم زيادة عدد المشاركين في الرحلة تلقائياً وسيصلك تأكيد.
                  </Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2, justifyContent: "center" }}>
            <Button onClick={() => setBookingOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode) }}>تراجع</Button>
            <Button onClick={handleConfirmBooking} variant="contained" sx={{ ...primaryBtnSx(mode), px: 5 }}>
              تأكيد الحجز
            </Button>
          </DialogActions>
        </Dialog>

        {/* Custom Request Dialog */}
        <Dialog open={requestOpen} onClose={() => setRequestOpen(false)} fullWidth maxWidth="sm" dir="rtl" PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
          <DialogTitle sx={{ fontWeight: "bold", fontFamily: "Cairo", fontSize: "1.4rem", textAlign: "center", pt: 3 }}>
            🗺️ اطلب رحلة مخصصة
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth required
                label="الوجهة المطلوبة"
                value={requestForm.destination}
                onChange={(e) => setRequestForm((p) => ({ ...p, destination: e.target.value }))}
                InputProps={{ startAdornment: <LocationOn sx={{ color: "primary.main", ml: 1 }} /> }}
                sx={{ "& label": { fontFamily: "Cairo", right: 40, left: "auto", transformOrigin: "right" } }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth required
                  label="تاريخ الرحلة"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={requestForm.date}
                  onChange={(e) => setRequestForm((p) => ({ ...p, date: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo" } }}
                />
                <TextField
                  fullWidth
                  label="المدة"
                  placeholder="مثال: 7 أيام"
                  value={requestForm.duration}
                  onChange={(e) => setRequestForm((p) => ({ ...p, duration: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="عدد المسافرين"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={requestForm.travelers}
                  onChange={(e) => setRequestForm((p) => ({ ...p, travelers: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
                />
                <TextField
                  fullWidth
                  label="الميزانية التقريبية"
                  placeholder="مثال: 2000$"
                  value={requestForm.budget}
                  onChange={(e) => setRequestForm((p) => ({ ...p, budget: e.target.value }))}
                  sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
                />
              </Box>
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" }}>وسيلة النقل المفضلة</InputLabel>
                <Select
                  value={requestForm.transport}
                  label="وسيلة النقل المفضلة"
                  onChange={(e) => setRequestForm((p) => ({ ...p, transport: e.target.value }))}
                  sx={{ fontFamily: "Cairo" }}
                >
                  {["طيران", "حافلة سياحية", "سيارة خاصة", "قطار", "سفينة"].map((t) => (
                    <MenuItem key={t} value={t} sx={{ fontFamily: "Cairo" }}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" }}>نوع الإقامة</InputLabel>
                <Select
                  value={requestForm.accommodation}
                  label="نوع الإقامة"
                  onChange={(e) => setRequestForm((p) => ({ ...p, accommodation: e.target.value }))}
                  sx={{ fontFamily: "Cairo" }}
                >
                  {["فندق 5 نجوم", "فندق 4 نجوم", "فندق 3 نجوم", "شقة مفروشة", "رياض تقليدي", "أي نوع"].map((a) => (
                    <MenuItem key={a} value={a} sx={{ fontFamily: "Cairo" }}>{a}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="ملاحظات إضافية (اختياري)"
                multiline rows={3}
                placeholder="أي تفاصيل خاصة تريد إضافتها..."
                value={requestForm.notes}
                onChange={(e) => setRequestForm((p) => ({ ...p, notes: e.target.value }))}
                sx={{ "& label": { fontFamily: "Cairo", right: 14, left: "auto", transformOrigin: "right" } }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2, justifyContent: "center" }}>
            <Button onClick={() => setRequestOpen(false)} variant="outlined" sx={{ ...secondaryBtnSx(mode) }}>تراجع</Button>
            <Button onClick={handleSubmitRequest} variant="contained" sx={{ ...primaryBtnSx(mode), px: 5 }}>
              إرسال الطلب
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ fontFamily: "Cairo", minWidth: 300 }} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default UserHome;