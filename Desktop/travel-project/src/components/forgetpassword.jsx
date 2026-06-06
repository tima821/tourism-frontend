import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }
    setLoading(true);
    try {
      await api.post("/forgot-password", { email });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div className="custom-card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "white" }}>
          نسيت كلمة المرور
        </h2>
        <p className="text-center mb-4" style={{ color: "var(--text-muted)" }}>
          أدخل بريدك الإلكتروني لإرسال رمز استعادة كلمة المرور
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-right text-white">
              البريد الإلكتروني
            </label>
            <div className="input-wrapper">
              <EmailIcon style={{ color: "var(--text-muted)" }} />
              {/* ✅ تم تصحيح: custom-input-field بدلاً من input-field */}
              <input
                type="email"
                className="custom-input-field"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            العودة لتسجيل الدخول
          </span>
        </div>
      </div>
    </div>
  );
}
