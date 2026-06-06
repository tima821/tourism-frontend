import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(135deg, #050c14 0%, #0b1929 100%)",
      overflow: "hidden",
    },

    card: {
      p: 4,
      borderRadius: "20px",
      bgcolor: "#0b1929",
      border: "1px solid #132f4c",
      transition: "0.4s",

      "&:hover": {
        borderColor: "#00e5ff",
      },
    },

    input: {
      mb: 1,

      "& .MuiInputLabel-root": {
        color: "#b0bec5",
        fontFamily: "Cairo",
        right: 25,
        left: "auto",
        transformOrigin: "right",
      },

      "& .MuiInputLabel-shrink": {
        transform: "translate(0, -1.5px) scale(0.75)",
      },

      "& .MuiFilledInput-root": {
        bgcolor: "#132f4c",
        borderRadius: "12px",
        color: "white",
        direction: "rtl",
        paddingRight: "16px",

        "&:before, &:after": {
          display: "none",
        },

        "&:hover": {
          bgcolor: "#1a3a5a",
        },
      },

      "& .MuiFormHelperText-root": {
        textAlign: "right",
        fontFamily: "Cairo",
        minHeight: "20px",
        marginRight: "14px",
        marginTop: "4px",
      },
    },

    button: {
      mt: 2,
      mb: 2,
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
  };

  const getFieldError = (name, value) => {
    if (name === "email") {
      if (!value) return "البريد الإلكتروني مطلوب";

      if (!/\S+@\S+\.\S+/.test(value)) {
        return "صيغة البريد غير صحيحة";
      }
    }

    if (name === "password") {
      if (!value) return "كلمة المرور مطلوبة";

      if (value.length < 6) {
        return "6 محارف على الأقل";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: getFieldError(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: getFieldError(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تنظيف رسالة الخطأ السابقة
    setServerError("");

    const eErr = getFieldError("email", formData.email);
    const pErr = getFieldError("password", formData.password);

    if (eErr || pErr) {
      setErrors({
        email: eErr,
        password: pErr,
      });

      setTouched({
        email: true,
        password: true,
      });

      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success("تم تسجيل الدخول بنجاح");

        // التوجيه حسب دور المستخدم
        if (result.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-home");
        }
      } else {
        setServerError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "بيانات الدخول غير صحيحة";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={styles.card}>
          <Typography
            variant="h4"
            sx={{
              color: "#00e5ff",
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
              fontFamily: "Cairo",
            }}
          >
            تسجيل الدخول
          </Typography>

          <Box sx={{ minHeight: "50px", mb: 1 }}>
            {serverError && (
              <Alert
                severity="error"
                sx={{
                  fontFamily: "Cairo",
                  direction: "rtl",
                }}
              >
                {serverError}
              </Alert>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              name="email"
              label="البريد الإلكتروني"
              variant="filled"
              value={formData.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={(touched.email && errors.email) || " "}
              sx={styles.input}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email
                        sx={{
                          color: "#00e5ff",
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              variant="filled"
              value={formData.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={(touched.password && errors.password) || " "}
              sx={styles.input}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: "#b0bec5" }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>

                      <Lock
                        sx={{
                          color: "#00e5ff",
                          ml: 1,
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={styles.button}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "دخول"
              )}
            </Button>

            <Button
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{
                color: "#b0bec5",
                fontFamily: "Cairo",
                textTransform: "none",
                mt: 1,
              }}
            >
              إنشاء حساب جديد
            </Button>

            <Button
              fullWidth
              onClick={() => navigate("/forgot")}
              sx={{
                color: "#00e5ff",
                fontFamily: "Cairo",
                textTransform: "none",
                fontSize: "0.85rem",
                opacity: 0.8,

                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              نسيت كلمة المرور؟
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
