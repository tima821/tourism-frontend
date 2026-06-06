// import { createContext, useContext, useState, useEffect } from "react";
// import authService from "../services/authService";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");
//       const userInfo = localStorage.getItem("user_info");

//       if (token && userInfo) {
//         try {
//           const userData = JSON.parse(userInfo);
//           setUser(userData);
//           setRole(userData.role || "user");
//         } catch (error) {
//           console.error("Auth error:", error);
//           localStorage.removeItem("token");
//           localStorage.removeItem("user_info");
//         }
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

//  const login = async (email, password) => {
//   try {
//     const response = await authService.login(email, password);
//     // افترض أن الاستجابة تحتوي على { user, token } أو { data: { user, token } }
//     const userData = response.user || response.data?.user || response.data;
//     const token = response.token || response.data?.token;
    
//     if (!userData || !token) {
//       throw new Error("Invalid response structure from server");
//     }
    
//     // تخزين في localStorage
//     localStorage.setItem("token", token);
//     localStorage.setItem("user_info", JSON.stringify(userData));
    
//     // تحديث الحالة
//     setUser(userData);
//     setRole(userData.role || "user");   // ✅ استخدم userData.role
    
//     return { success: true, data: userData };
//   } catch (error) {
//     const errorMsg = error.response?.data?.message || "فشل تسجيل الدخول";
//     return { success: false, error: errorMsg };
//   }
// };

//   const register = async (userData) => {
//     try {
//       const response = await authService.register(userData);
//       return { success: true, data: response };
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "فشل التسجيل";
//       return { success: false, error: errorMsg };
//     }
//   };

//   const logout = async () => {
//     try {
//       await authService.logout();
//     } finally {
//       setUser(null);
//       setRole(null);
//     }
//   };

//   const verifyEmail = async (email, code) => {
//     try {
//       const response = await authService.verifyEmail(email, code);
//       return { success: true, data: response };
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "فشل التحقق";
//       return { success: false, error: errorMsg };
//     }
//   };

//   const forgotPassword = async (email) => {
//     try {
//       const response = await authService.forgotPassword(email);
//       return { success: true, message: response.message };
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "فشلت العملية";
//       return { success: false, error: errorMsg };
//     }
//   };

//   const resetPassword = async (email, code, password, passwordConfirmation) => {
//     try {
//       const response = await authService.resetPassword(
//         email,
//         code,
//         password,
//         passwordConfirmation
//       );
//       return { success: true, message: response.message };
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "فشلت إعادة التعيين";
//       return { success: false, error: errorMsg };
//     }
//   };

//   const verifyCode = async (email, code) => {
//     try {
//       const response = await authService.verifyCode(email, code);
//       return { success: true, data: response };
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "كود غير صحيح";
//       return { success: false, error: errorMsg };
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         role,
//         loading,
//         login,
//         register,
//         logout,
//         verifyEmail,
//         forgotPassword,
//         verifyCode,
//         resetPassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };






import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user_info");

      if (token && userInfo) {
        try {
          const userData = JSON.parse(userInfo);
          setUser(userData);
          setRole(userData.role || "user");
        } catch (error) {
          console.error("Auth error:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user_info");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // authService.login يقوم بتخزين token و user_info تلقائياً
      const response = await authService.login(email, password);
      
      // استخراج بيانات المستخدم من الرد (قد يكون response.user أو response.data)
      const userData = response.user || response.data || null;
      if (!userData) {
        throw new Error("No user data received");
      }
      
      // تحديث الحالة من البيانات التي خزنت بالفعل في localStorage
      setUser(userData);
      setRole(userData.role || "user");
      
      return { success: true, data: userData };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "فشل تسجيل الدخول";
      return { success: false, error: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, data: response };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "فشل التسجيل";
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setRole(null);
    }
  };

  const verifyEmail = async (email, code) => {
    try {
      const response = await authService.verifyEmail(email, code);
      return { success: true, data: response };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "فشل التحقق";
      return { success: false, error: errorMsg };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return { success: true, message: response.message };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "فشلت العملية";
      return { success: false, error: errorMsg };
    }
  };

  const resetPassword = async (email, code, password, passwordConfirmation) => {
    try {
      const response = await authService.resetPassword(
        email,
        code,
        password,
        passwordConfirmation
      );
      return { success: true, message: response.message };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "فشلت إعادة التعيين";
      return { success: false, error: errorMsg };
    }
  };

  const verifyCode = async (email, code) => {
    try {
      const response = await authService.verifyCode(email, code);
      return { success: true, data: response };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "كود غير صحيح";
      return { success: false, error: errorMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        register,
        logout,
        verifyEmail,
        forgotPassword,
        verifyCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
