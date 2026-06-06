import React, { useState, useRef, useEffect } from "react";
import authService from "../services/authService";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { MarkEmailRead, ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // جلب الإيميل الممرر من صفحة الـ Signup لضمان ربطه بالرمز
  const userEmail = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = [useRef(), useRef(), useRef(), useRef(),useRef(),useRef()];

  // حماية الصفحة: إذا دخل المستخدم الصفحة بدون إيميل، نعيده للتسجيل
  useEffect(() => {
    if (!userEmail) {
      // يمكنك إلغاء تفعيل هذا السطر إذا كنت تريد اختبار التصميم فقط
      // navigate("/signup");
    }
  }, [userEmail, navigate]);

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(135deg, #050c14 0%, #0b1929 100%)",
      direction: "rtl",
    },
    card: {
      p: 3,
      borderRadius: "20px",
      bgcolor: "#0b1929",
      border: "1px solid #132f4c",
      textAlign: "center",
      transition: "0.4s",
      width: "100%",
      "&:hover": { borderColor: "#00e5ff" },
},
otpContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      mb: 4,
      flexWrap: "nowrap",
},
otpInput: {
      width: "clamp(42px, 10vw, 52px)",
      aspectRatio: "1 / 1",
      fontSize: "clamp(1.2rem, 6vw, 1.6rem)",
      fontWeight: "bold",
      textAlign: "center",
      color: "#00e5ff",
      backgroundColor: "#132f4c",
      border: "2px solid #1c3d5e",
      borderRadius: "12px",
      outline: "none",
      transition: "0.2s",
      "&:focus": {
        borderColor: "#00e5ff",
        boxShadow: "0 0 6px #00e5ff",
  },
},
    "@media (max-width: 500px)": {
      width: "50px",
      height: "50px",
      fontSize: "22px",
    },


  button: {
      mt: 2,
      py: 1.5,
      background: "linear-gradient(45deg, #00e5ff, #7209b7)",
      color: "white",
      fontWeight: "bold",
      borderRadius: "12px",
      fontFamily: "Cairo",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 12px 30px rgba(0, 229, 255, 0.4)",
      },
    },
    resendContainer: {
      mt: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontFamily: "Cairo",
    },
    resendButton: {
      color: "#00e5ff",
      fontWeight: "bold",
      fontSize: "0.9rem",
      fontFamily: "Cairo",
      minWidth: "auto",
      padding: 0,
      textTransform: "none",
      "&:hover": {
        color: "#7209b7",
        background: "none",
        textDecoration: "underline",
      },
    },
    backButton: {
      mt: 2,
      color: "#b0bec5",
      fontFamily: "Cairo",
      textTransform: "none",
      fontSize: "0.8rem",
      opacity: 0.7,
      "&:hover": { opacity: 1, color: "white", background: "none" },
    },
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

   // ✅ دالة إعادة إرسال الرمز (يجب تعديل المسار حسب الـ Backend)
  const handleResendCode = async () => {
    if (!userEmail) {
      setServerError("البريد الإلكتروني مفقود، الرجاء التسجيل مجدداً");
      return;
    }
    setResendLoading(true);
    setServerError("");
    try {
      await api.post("/resend-verification-code", { email: userEmail });
      setServerSuccess("تم إرسال رمز جديد إلى بريدك الإلكتروني");
      setTimeout(() => setServerSuccess(""), 5000);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "فشل إعادة الإرسال، حاول لاحقاً"
      );
    } finally {
      setResendLoading(false);
    }
  };

   // ✅ تعديل المسار الصحيح للتحقق من الرمز
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = otp.join("");

    if (finalCode.length < 6) {
      setServerError("يرجى إدخال الرمز المكون من 6 أرقام كاملة");
      return;
    }

    setLoading(true);
    setServerError("");
    setServerSuccess("");

    try {
      // 🛠️ غير المسار أدناه حسب الـ API الفعلي (مثلاً: /api/verify-email)
    const res = await authService.verifyEmail(userEmail, finalCode);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setServerSuccess("تم التأكيد بنجاح! جاري تسجيل دخولك...");
        setTimeout(() => navigate("/user-home"), 1500);
      } else {
        setServerSuccess("تم التأكيد بنجاح! يمكنك الآن تسجيل الدخول.");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setServerError(
        err.response?.data?.message || "الرمز غير صحيح أو منتهي الصلاحية"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={styles.card}>
          <MarkEmailRead sx={{ fontSize: 60, color: "#00e5ff", mb: 2 }} />

          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 1,
              fontFamily: "Cairo",
            }}
          >
            تأكيد الحساب
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#b0bec5", mb: 4, fontFamily: "Cairo" }}
          >
            أدخل رمز التحقق الذي أرسلناه إلى بريدك: <br />
            <span style={{ color: "#00e5ff" }}>{userEmail}</span>
          </Typography>

          <Box sx={{ minHeight: "55px", mb: 1 }}>
            {serverError && (
              <Alert severity="error" sx={{ fontFamily: "Cairo" }}>
                {serverError}
              </Alert>
            )}
            {serverSuccess && (
              <Alert severity="success" sx={{ fontFamily: "Cairo" }}>
                {serverSuccess}
              </Alert>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={styles.otpInput}
                  onFocus={(e) => (e.target.style.borderColor = "#00e5ff")}
                  onBlur={(e) => (e.target.style.borderColor = "#1c3d5e")}
                />
              ))}
            </Box>

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={styles.button}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "تأكيد الرمز"
              )}
            </Button>

            <Box sx={styles.resendContainer}>

              <Typography sx={{ color: "#b0bec5", fontSize: "0.9rem" }}>
                لم يصلك الرمز؟
              </Typography>

              <Button onClick={handleResendCode} disabled={resendLoading} sx={styles.resendButton} disableRipple>
                {resendLoading ? <CircularProgress size={18} sx={{ color: "#00e5ff" }} /> : "إعادة إرسال"}
              </Button>

            </Box>

            <Button
              fullWidth
              endIcon={<ArrowBack sx={{ mr: 1, fontSize: "18px" }} />}
              onClick={() => navigate("/signup")}
              sx={styles.backButton}
              disableRipple
            >
              العودة لتعديل البريد الإلكتروني
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailVerification;
