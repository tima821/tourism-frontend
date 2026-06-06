import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Pagination,
  Stack,
  useTheme,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import useTrips from "../../hooks/useTrips";
import TripCard from "../../components/dashboard/TripCard";
import TripForm from "../../components/dashboard/TripForm";
import TripFilters from "../../components/dashboard/TripFilters";
import DeleteConfirmModal from "../../components/dashboard/DeleteConfirmModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";

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

const TripsManagement = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const {
    trips,
    loading,
    error,
    filters,
    pagination,
    deleteTrip,
    updateStatus,
    duplicateTrip,
    updateFilters,
    changePage,
    resetFilters,
    getStatusText,
    fetchTrips, // ✅ استيراد دالة الجلب
  } = useTrips();

  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deletingTrip, setDeletingTrip] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleAdd = () => {
    setEditingTrip(null);
    setShowForm(true);
  };
  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };
  const handleDelete = async () => {
    if (deletingTrip) {
      await deleteTrip(deletingTrip.id);
      setDeletingTrip(null);
    }
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    fetchTrips(); // ✅ تحديث القائمة بعد الإضافة أو التعديل
  };

  if (loading && trips.length === 0) {
    return (
      <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner size="lg" text="جاري تحميل الرحلات..." />
      </Box>
    );
  }

  if (error && trips.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ fontFamily: "Cairo" }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, direction: "rtl" }}>
      {/* الرأس والأزرار */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "Cairo", color: mode === "dark" ? "#fff" : "#111" }}>
            إدارة الرحلات
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mt: 0.5 }}>
            إضافة، تعديل، وحذف الرحلات السياحية
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setShowFilters(!showFilters)} sx={secondaryBtnSx(mode)}>
            فلترة
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={primaryBtnSx(mode)}>
            رحلة جديدة
          </Button>
        </Stack>
      </Box>

      {showFilters && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: "20px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
          <TripFilters filters={filters} onFilterChange={updateFilters} onReset={resetFilters} />
        </Paper>
      )}

      {/* إحصائيات سريعة */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ bgcolor: mode === "dark" ? "#0d2137" : "#e3f2fd", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "primary.main" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main", fontFamily: "Cairo" }}>{trips.length}</Typography>
            <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>إجمالي الرحلات</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ bgcolor: mode === "dark" ? "#0d2e1a" : "#e8f5e9", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "success.main" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "success.main", fontFamily: "Cairo" }}>
              {trips.filter(t => (t.status || "pending") === "confirmed").length}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>رحلات مؤكدة</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ bgcolor: mode === "dark" ? "#3a2e1a" : "#fff3e0", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "warning.main" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "warning.main", fontFamily: "Cairo" }}>
              {trips.filter(t => (t.status || "pending") === "pending").length}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>قيد الانتظار</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ bgcolor: mode === "dark" ? "#2e1a3a" : "#f3e5f5", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "secondary.main" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "secondary.main", fontFamily: "Cairo" }}>
              {trips.reduce((sum, t) => sum + (t.participants_count || t.participants?.length || 0), 0)}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>إجمالي المشاركين</Typography>
          </Box>
        </Grid>
      </Grid>

      {trips.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: "20px", border: "1px solid", borderColor: "divider" }}>
          <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>✈️</Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>لا توجد رحلات</Typography>
          <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 3 }}>لم يتم إضافة أي رحلات بعد</Typography>
          <Button variant="contained" onClick={handleAdd} sx={primaryBtnSx(mode)}>أضف أول رحلة</Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <TripCard
                trip={trip}
                onEdit={() => handleEdit(trip)}
                onDelete={() => setDeletingTrip(trip)}
                onStatusChange={(status) => updateStatus(trip.id, status)}
                onDuplicate={() => duplicateTrip(trip.id)}
                getStatusText={getStatusText}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {pagination.pages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={pagination.pages}
            page={pagination.page}
            onChange={(_, page) => changePage(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontFamily: "Cairo",
                fontWeight: "bold",
                borderRadius: "12px",
              },
            }}
          />
        </Box>
      )}

      {showForm && (
        <TripForm
          trip={editingTrip}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
      {deletingTrip && (
        <DeleteConfirmModal
          title="حذف الرحلة"
          message={`هل أنت متأكد من حذف رحلة "${deletingTrip.trip_type}"؟`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingTrip(null)}
        />
      )}
    </Container>
  );
};

export default TripsManagement;



// // src/pages/admin/TripsManagement.jsx
// import { useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   Pagination,
//   Stack,
//   useTheme,
//   Alert,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import useTrips from "../../hooks/useTrips";
// import TripCard from "../../components/dashboard/TripCard";
// import TripForm from "../../components/dashboard/TripForm";
// import TripFilters from "../../components/dashboard/TripFilters";
// import DeleteConfirmModal from "../../components/dashboard/DeleteConfirmModal";
// import LoadingSpinner from "../../components/common/LoadingSpinner";

// // تعريف أنماط الأزرار (خارج المكون)
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

// const TripsManagement = () => {
//   const theme = useTheme();
//   const mode = theme.palette.mode;

//   const {
//     trips,
//     loading,
//     error,              // ✅ تم إضافة error من useTrips
//     filters,
//     pagination,
//     deleteTrip,
//     updateStatus,
//     duplicateTrip,
//     updateFilters,
//     changePage,
//     resetFilters,
//     getStatusText,
//   } = useTrips();

//   const [showForm, setShowForm] = useState(false);
//   const [editingTrip, setEditingTrip] = useState(null);
//   const [deletingTrip, setDeletingTrip] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);

//   const handleAdd = () => {
//     setEditingTrip(null);
//     setShowForm(true);
//   };
//   const handleEdit = (trip) => {
//     setEditingTrip(trip);
//     setShowForm(true);
//   };
//   const handleDelete = async () => {
//     if (deletingTrip) {
//       await deleteTrip(deletingTrip.id);
//       setDeletingTrip(null);
//     }
//   };
//   const handleCloseForm = () => {
//     setShowForm(false);
//     setEditingTrip(null);
//   };

//   // ✅ عرض شاشة التحميل فقط عند أول تحميل
//   if (loading && trips.length === 0) {
//     return (
//       <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <LoadingSpinner size="lg" text="جاري تحميل الرحلات..." />
//       </Box>
//     );
//   }

//   // ✅ عرض رسالة خطأ إذا فشل جلب البيانات
//   if (error && trips.length === 0) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ fontFamily: "Cairo" }}>{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 4, direction: "rtl" }}>
//       {/* الرأس والأزرار */}
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 4 }}>
//         <Box>
//           <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "Cairo", color: mode === "dark" ? "#fff" : "#111" }}>
//             إدارة الرحلات
//           </Typography>
//           <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mt: 0.5 }}>
//             إضافة، تعديل، وحذف الرحلات السياحية
//           </Typography>
//         </Box>
//         <Stack direction="row" spacing={2}>
//           <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setShowFilters(!showFilters)} sx={secondaryBtnSx(mode)}>
//             فلترة
//           </Button>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={primaryBtnSx(mode)}>
//             رحلة جديدة
//           </Button>
//         </Stack>
//       </Box>

//       {/* لوحة الفلاتر */}
//       {showFilters && (
//         <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: "20px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
//           <TripFilters filters={filters} onFilterChange={updateFilters} onReset={resetFilters} />
//         </Paper>
//       )}

//       {/* إحصائيات سريعة */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={6} sm={3}>
//           <Box sx={{ bgcolor: mode === "dark" ? "#0d2137" : "#e3f2fd", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "primary.main" }}>
//             <Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main", fontFamily: "Cairo" }}>{trips.length}</Typography>
//             <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>إجمالي الرحلات</Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Box sx={{ bgcolor: mode === "dark" ? "#0d2e1a" : "#e8f5e9", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "success.main" }}>
//             <Typography variant="h4" fontWeight="bold" sx={{ color: "success.main", fontFamily: "Cairo" }}>
//               {trips.filter(t => (t.status || "pending") === "confirmed").length}
//             </Typography>
//             <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>رحلات مؤكدة</Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Box sx={{ bgcolor: mode === "dark" ? "#3a2e1a" : "#fff3e0", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "warning.main" }}>
//             <Typography variant="h4" fontWeight="bold" sx={{ color: "warning.main", fontFamily: "Cairo" }}>
//               {trips.filter(t => (t.status || "pending") === "pending").length}
//             </Typography>
//             <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>قيد الانتظار</Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Box sx={{ bgcolor: mode === "dark" ? "#2e1a3a" : "#f3e5f5", borderRadius: "16px", p: 2, textAlign: "center", border: "1px solid", borderColor: "secondary.main" }}>
//             <Typography variant="h4" fontWeight="bold" sx={{ color: "secondary.main", fontFamily: "Cairo" }}>
//               {/* ✅ استخدام participants_count بدلاً من participants */}
//               {trips.reduce((sum, t) => sum + (t.participants_count || t.participants?.length || 0), 0)}
//             </Typography>
//             <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary" }}>إجمالي المشاركين</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       {/* قائمة الرحلات */}
//       {trips.length === 0 ? (
//         <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: "20px", border: "1px solid", borderColor: "divider" }}>
//           <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>✈️</Typography>
//           <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Cairo", mb: 1 }}>لا توجد رحلات</Typography>
//           <Typography variant="body2" sx={{ fontFamily: "Cairo", color: "text.secondary", mb: 3 }}>لم يتم إضافة أي رحلات بعد</Typography>
//           <Button variant="contained" onClick={handleAdd} sx={primaryBtnSx(mode)}>أضف أول رحلة</Button>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {trips.map((trip) => (
//             <Grid item xs={12} sm={6} md={4} key={trip.id}>
//               <TripCard
//                 trip={trip}
//                 onEdit={() => handleEdit(trip)}
//                 onDelete={() => setDeletingTrip(trip)}
//                 onStatusChange={(status) => updateStatus(trip.id, status)}
//                 onDuplicate={() => duplicateTrip(trip.id)}
//                 getStatusText={getStatusText}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* الترقيم (Pagination) */}
//       {pagination.pages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//           <Pagination
//             count={pagination.pages}
//             page={pagination.page}
//             onChange={(_, page) => changePage(page)}
//             color="primary"
//             sx={{
//               "& .MuiPaginationItem-root": {
//                 fontFamily: "Cairo",
//                 fontWeight: "bold",
//                 borderRadius: "12px",
//               },
//             }}
//           />
//         </Box>
//       )}

//       {/* النماذج والحوارات */}
//       {showForm && <TripForm trip={editingTrip} onClose={handleCloseForm} onSuccess={handleCloseForm} />}
//       {deletingTrip && (
//         <DeleteConfirmModal
//           title="حذف الرحلة"
//           // ✅ تصحيح: استخدام trip_type بدلاً من title
//           message={`هل أنت متأكد من حذف رحلة "${deletingTrip.trip_type}"؟`}
//           onConfirm={handleDelete}
//           onCancel={() => setDeletingTrip(null)}
//         />
//       )}
//     </Container>
//   );
// };

// export default TripsManagement;