// import api from "../api/axios";

// const authService = {
//   register: async (userData) => {
//     const response = await api.post("/register", userData);
//     if (response.data.token) {
//       localStorage.setItem("token", response.data.token);

//       const userData = response.data.user || response.data.data;
//     // تأكد من وجود role
//     if (!userData.role) userData.role = "user"; // قيمة افتراضية 

//       localStorage.setItem("user_info", JSON.stringify(response.data.user || response.data.data));
//     }
//     return response.data;
//   },

//   login: async (email, password) => {
//     const response = await api.post("/login", { email, password });
//     if (response.data.token) {
//       localStorage.setItem("token", response.data.token);

//       const userData = response.data.user || response.data.data;
//     // تأكد من وجود role
//     if (!userData.role) userData.role = "user"; // قيمة افتراضية 

//       localStorage.setItem("user_info", JSON.stringify(response.data.user || response.data.data));
//     }
//     return response.data;
//   },

//   logout: async () => {
//     try {
//       await api.post("/logout");
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user_info");
//     }
//   },

//   me: async () => {
//     const response = await api.get("/me");
//     return response.data;
//   },

//   getCurrentUser: () => {
//     const userInfo = localStorage.getItem("user_info");
//     return userInfo ? JSON.parse(userInfo) : null;
//   },

//   forgotPassword: async (email) => {
//     const response = await api.post("/forget-password", { email });
//     return response.data;
//   },

//   verifyCode: async (email, code) => {
//     const response = await api.post("/verify-code", { email, code });
//     return response.data;
//   },

//   resetPassword: async (email, code, password, passwordConfirmation) => {
//     const response = await api.post("/reset-password", {
//       email,
//       code,
//       password,
//       password_confirmation: passwordConfirmation,
//     });
//     return response.data;
//   },

//   verifyEmail: async (email, code) => {
//     const response = await api.post("/verify-account", { email, code });
//     return response.data;
//   },
// };

// export default authService;



import api from "../api/axios";

const authService = {
  register: async (userData) => {
    const response = await api.post("/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      let user = response.data.user || response.data.data;
      if (user) {
        // تحويل user_type إلى role
        user.role = user.user_type === 'admin' ? 'admin' : 'user';
      }
      localStorage.setItem("user_info", JSON.stringify(user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      let user = response.data.user || response.data.data;
      if (user) {
        // ✅ تحويل user_type إلى role
        user.role = user.user_type === 'admin' ? 'admin' : 'user';
      }
      localStorage.setItem("user_info", JSON.stringify(user));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user_info");
    }
  },

  me: async () => {
    const response = await api.get("/me");
    return response.data;
  },

  getCurrentUser: () => {
    const userInfo = localStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/forget-password", { email });
    return response.data;
  },

  verifyCode: async (email, code) => {
    const response = await api.post("/verify-code", { email, code });
    return response.data;
  },

  resetPassword: async (email, code, password, passwordConfirmation) => {
    const response = await api.post("/reset-password", {
      email,
      code,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response.data;
  },

  verifyEmail: async (email, code) => {
    const response = await api.post("/verify-account", { email, code });
    return response.data;
  },
};

export default authService;
