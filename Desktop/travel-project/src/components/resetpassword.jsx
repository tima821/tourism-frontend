import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || !confirm) {
      setError("الرجاء إدخال كلمة المرور في كلا الحقلين");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (password.length < 6) {
      setError("يجب أن تكون كلمة المرور 6 أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      await api.post("/reset-password", { token, password });
      setSuccess("تم تغيير كلمة المرور بنجاح");
      setTimeout(() => navigate("/login"), 1500);
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
      <div className="custom-card w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: "white" }}>
          إعادة تعيين كلمة المرور
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-right">
            <label className="block mb-1 font-medium text-white">
              كلمة المرور الجديدة
            </label>
            <div className="input-wrapper">
              {/* ✅ تم تصحيح: custom-input-field بدلاً من input-field */}
              <input
                type="password"
                className="custom-input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-right">
            <label className="block mb-1 font-medium text-white">
              تأكيد كلمة المرور
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                className="custom-input-field"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "جاري الحفظ..." : "تغيير كلمة المرور"}
          </button>
        </form>
        <div className="mt-4">
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
