// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://barbecue-utilize-feast.ngrok-free.dev/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
//   withCredentials: true,
// });

// // إضافة التوكن لكل طلب
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // معالجة الأخطاء والاستجابات
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_info");
//       toast.error("انتهت الجلسة، الرجاء تسجيل الدخول مرة أخرى");
//       window.location.href = "/login";
//     } else if (error.response?.status === 403) {
//       toast.error("ليس لديك صلاحية للقيام بهذا الإجراء");
//     } else if (error.response?.status === 404) {
//       toast.error("المورد المطلوب غير موجود");
//     } else if (error.response?.status === 422) {
//       const errors = error.response?.data?.errors;
//       if (errors) {
//         Object.values(errors).forEach((err) => {
//           if (Array.isArray(err)) {
//             err.forEach((msg) => toast.error(msg));
//           }
//         });
//       }
//     } else if (error.response?.status >= 500) {
//       toast.error("خطأ في الخادم، حاول لاحقاً");
//     } else if (!error.response) {
//       toast.error("فشل الاتصال بالخادم");
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://barbecue-utilize-feast.ngrok-free.dev/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
    "X-Requested-With": "XMLHttpRequest",   // إضافة هامة لـ Laravel
  },
  // withCredentials: false  // أو احذفها نهائياً
});

// إضافة التوكن Bearer
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// معالجة الاستجابات (خاصة 422 validation من Laravel)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user_info");
    //   toast.error("انتهت الجلسة، الرجاء تسجيل الدخول مرة أخرى");
    //   window.location.href = "/login";
    // } 
     if (error.response?.status === 403) {
      toast.error("ليس لديك صلاحية للقيام بهذا الإجراء");
    } else if (error.response?.status === 404) {
      toast.error("المورد المطلوب غير موجود");
    } else if (error.response?.status === 422) {
      // تنسيق أخطاء validation من Laravel
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((err) => {
          if (Array.isArray(err)) {
            err.forEach((msg) => toast.error(msg));
          } else if (typeof err === "string") {
            toast.error(err);
          }
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } else if (error.response?.status >= 500) {
      toast.error("خطأ في الخادم، حاول لاحقاً");
    } else if (!error.response) {
      toast.error("فشل الاتصال بالخادم");
    }
    return Promise.reject(error);
  }
);

export default api;