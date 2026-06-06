// src/components/dashboard/TripForm.jsx
import { useState, useMemo } from "react"; // ✅ إضافة useMemo
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  useTheme,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useTrips from "../../hooks/useTrips";

const TripForm = ({ trip, onClose, onSuccess }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { createTrip, updateTrip } = useTrips();
  const isEditing = Boolean(trip);

  // بيانات النموذج (بدون available_seats لأنه سيحسب لاحقاً)
  const [formData, setFormData] = useState({
    trip_type: trip?.trip_type || "سياحية",
    start_time: trip?.start_time || "",
    end_time: trip?.end_time || "",
    booking_start_date: trip?.booking_start_date || "",
    booking_end_date: trip?.booking_end_date || "",
    total_seats: trip?.total_seats || "",
    trip_cost: trip?.trip_cost || "",
  });

  // عدد المشاركين (من بيانات الرحلة إذا كانت موجودة)
  const participantsCount = trip?.participants_count ?? trip?.participants?.length ?? 0;

  // ✅ حساب المقاعد المتاحة تلقائياً
  const availableSeatsComputed = useMemo(() => {
    const total = Number(formData.total_seats) || 0;
    if (isEditing) {
      // عند التعديل: المقاعد المتاحة = الإجمالي - المسجلين
      return Math.max(0, total - participantsCount);
    } else {
      // عند الإنشاء: لا يوجد مسجلون، فالمتاحة = الإجمالي
      return total;
    }
  }, [formData.total_seats, participantsCount, isEditing]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["total_seats", "trip_cost"].includes(name) && parseFloat(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // تحويل datetime-local إلى صيغة الخادم
  const convertToBackendDateTime = (datetimeLocalValue) => {
    if (!datetimeLocalValue) return null;
    return datetimeLocalValue.replace("T", " ") + ":00";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const startTimeFormatted = convertToBackendDateTime(formData.start_time);
    const endTimeFormatted = convertToBackendDateTime(formData.end_time);

    if (!startTimeFormatted) {
      setError("يرجى إدخال وقت البداية بشكل صحيح");
      return;
    }
    if (!endTimeFormatted) {
      setError("يرجى إدخال وقت النهاية بشكل صحيح");
      return;
    }
    if (!formData.booking_start_date) {
      setError("يرجى إدخال تاريخ بداية الحجز");
      return;
    }
    if (!formData.booking_end_date) {
      setError("يرجى إدخال تاريخ نهاية الحجز");
      return;
    }
    if (!formData.total_seats || formData.total_seats <= 0) {
      setError("إجمالي المقاعد يجب أن يكون أكبر من 0");
      return;
    }

    // ✅ إنشاء payload يتضمن available_seats المحسوب
    const payload = {
      trip_type: formData.trip_type,
      start_time: startTimeFormatted,
      end_time: endTimeFormatted,
      booking_start_date: formData.booking_start_date,
      booking_end_date: formData.booking_end_date,
      total_seats: Number(formData.total_seats),
      available_seats: availableSeatsComputed, // ✅ إرسال القيمة المحسوبة
      trip_cost: parseFloat(formData.trip_cost) || 0,
    };

    console.log("🚀 البيانات المرسلة للخادم (مع available_seats محسوب):", payload);

    setLoading(true);
    try {
      if (isEditing) {
        await updateTrip(trip.id, payload);
      } else {
        await createTrip(payload);
      }
      onSuccess?.();
    } catch (err) {
      console.error("❌ خطأ:", err.response);
      let errorMessage = "حدث خطأ غير متوقع";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMessage = Object.entries(errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join("; ");
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else {
        errorMessage = JSON.stringify(err.response?.data);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // تحويل من صيغة الخادم إلى datetime-local للعرض
  const toDatetimeLocal = (dateTimeString) => {
    if (!dateTimeString) return "";
    return dateTimeString.replace(" ", "T").slice(0, 16);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
      dir="rtl"
      slotProps={{ paper: { sx: { borderRadius: 4, bgcolor: "background.paper", border: `1px solid ${mode === "dark" ? "#132f4c" : "#e0e0e0"}` } } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${mode === "dark" ? "#132f4c" : "#e0e0e0"}`, fontFamily: "Cairo", fontWeight: "bold" }}>
        {isEditing ? "تعديل الرحلة" : "إضافة رحلة جديدة"}
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2, fontFamily: "Cairo", whiteSpace: "pre-wrap" }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="trip_type"
                label="نوع الرحلة"
                value={formData.trip_type}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="trip_cost"
                label="تكلفة الرحلة (ليرة سورية)"
                type="number"
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                value={formData.trip_cost}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="start_time"
                label="وقت البداية"
                type="datetime-local"
                slotProps={{ inputLabel: { shrink: true } }}
                value={toDatetimeLocal(formData.start_time)}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="end_time"
                label="وقت النهاية"
                type="datetime-local"
                slotProps={{ inputLabel: { shrink: true } }}
                value={toDatetimeLocal(formData.end_time)}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="booking_start_date"
                label="تاريخ بداية الحجز"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formData.booking_start_date}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="booking_end_date"
                label="تاريخ نهاية الحجز"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formData.booking_end_date}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="total_seats"
                label="إجمالي المقاعد"
                type="number"
                slotProps={{ htmlInput: { min: 1 } }}
                value={formData.total_seats}
                onChange={handleChange}
                required
                helperText="أدخل العدد الإجمالي للمقاعد"
              />
            </Grid>

            {/* ✅ حقل المقاعد المتاحة: للقراءة فقط، محسوب تلقائياً، ويُرسل للخادم */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="المقاعد المتاحة (محسوبة تلقائياً)"
                value={availableSeatsComputed}
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: { bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }
                }}
                helperText={`يتم حسابها كـ: إجمالي المقاعد - عدد المسجلين (${participantsCount})`}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1, borderTop: `1px solid ${mode === "dark" ? "#132f4c" : "#e0e0e0"}` }}>
        <Button onClick={onClose} variant="outlined" sx={{ fontFamily: "Cairo", borderRadius: 2, borderColor: mode === "dark" ? "#00e5ff" : "#1976d2", color: mode === "dark" ? "#00e5ff" : "#1976d2" }}>إلغاء</Button>
        <Button onClick={handleSubmit} disabled={loading} variant="contained" sx={{ fontFamily: "Cairo", fontWeight: "bold", background: mode === "dark" ? "linear-gradient(135deg, #00e5ff 0%, #7209b7 100%)" : "linear-gradient(135deg, #1976d2 0%, #7209b7 100%)", color: "#fff", borderRadius: 2, px: 4 }}>
          {loading ? "جاري الحفظ..." : isEditing ? "حفظ التعديلات" : "إضافة الرحلة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TripForm;