// // src/hooks/useTrips.js
// import { useState, useEffect, useCallback } from "react";
// import tripService from "../services/tripService";
// import toast from "react-hot-toast";

// // ❌ تم حذف دالة mapToBackendFields نهائياً

// const useTrips = () => {
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     search: "",
//     status: "all",
//     destination: "",
//     sortBy: "created_at",
//     sortOrder: "desc",
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0,
//   });

//   const fetchTrips = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {
//         ...filters,
//         page: pagination.page,
//         limit: pagination.limit,
//       };
//       const response = await tripService.getAllTrips(params);
//       console.log("🔍 Full API Response:", response);

//       let tripsArray = [];
//       if (Array.isArray(response)) {
//         tripsArray = response;
//       } else if (response?.data && Array.isArray(response.data)) {
//         tripsArray = response.data;
//       } else if (response?.trips && Array.isArray(response.trips)) {
//         tripsArray = response.trips;
//       } else if (response?.data?.data && Array.isArray(response.data.data)) {
//         tripsArray = response.data.data;
//         if (response.data.pagination) {
//           setPagination(response.data.pagination);
//         }
//       } else if (Array.isArray(response?.results)) {
//         tripsArray = response.results;
//       } else {
//         console.warn("Unexpected API response structure:", response);
//         tripsArray = [];
//       }

//       // ✅ التأكد من وجود participants_count في كل رحلة (قيمة افتراضية 0)
//       tripsArray = tripsArray.map(trip => ({
//         ...trip,
//         participants_count: trip.participants_count ?? trip.participants?.length ?? 0
//       }));

//       setTrips(tripsArray);

//       if (response?.pagination) {
//         setPagination(response.pagination);
//       } else if (response?.data?.pagination) {
//         setPagination(response.data.pagination);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "حدث خطأ في جلب الرحلات");
//       toast.error("فشل في تحميل الرحلات");
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, pagination.page, pagination.limit]);

//   useEffect(() => {
//     fetchTrips();
//   }, [fetchTrips]);

//   // ✅ تم تعديل createTrip: لم نعد نستخدم mapToBackendFields
//   const createTrip = async (tripData) => {
//     setLoading(true);
//     try {
//       // tripData جاهز بالصيغة الصحيحة من TripForm
//       const newTrip = await tripService.createTrip(tripData);
//       toast.success("تم إنشاء الرحلة بنجاح");
//       await fetchTrips();
//       return newTrip;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "فشل في إنشاء الرحلة");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ تم تعديل updateTrip: إرسال البيانات مباشرة
//   const updateTrip = async (id, tripData) => {
//     setLoading(true);
//     try {
//       const updatedTrip = await tripService.updateTrip(id, tripData);
//       toast.success("تم تحديث الرحلة بنجاح");
//       await fetchTrips();
//       return updatedTrip;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "فشل في تحديث الرحلة");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteTrip = async (id) => {
//     try {
//       await tripService.deleteTrip(id);
//       toast.success("تم حذف الرحلة بنجاح");
//       await fetchTrips();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "فشل في حذف الرحلة");
//       throw err;
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await tripService.updateTripStatus(id, status);
//       toast.success(`تم تغيير حالة الرحلة إلى ${getStatusText(status)}`);
//       await fetchTrips();
//     } catch (err) {
//       toast.error("فشل في تحديث حالة الرحلة");
//       throw err;
//     }
//   };

//   const duplicateTrip = async (id) => {
//     setLoading(true);
//     try {
//       const newTrip = await tripService.duplicateTrip(id);
//       toast.success("تم نسخ الرحلة بنجاح");
//       await fetchTrips();
//       return newTrip;
//     } catch (err) {
//       toast.error("فشل في نسخ الرحلة");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateFilters = (newFilters) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const changePage = (page) => {
//     setPagination((prev) => ({ ...prev, page }));
//   };

//   const changeLimit = (limit) => {
//     setPagination((prev) => ({ ...prev, limit, page: 1 }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       search: "",
//       status: "all",
//       destination: "",
//       sortBy: "created_at",
//       sortOrder: "desc",
//     });
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const getStatusText = (status) => {
//     const statusMap = {
//       pending: "قيد الانتظار",
//       confirmed: "مؤكدة",
//       completed: "منتهية",
//       cancelled: "ملغية",
//     };
//     return statusMap[status] || status;
//   };

//   return {
//     trips,
//     loading,
//     error,
//     filters,
//     pagination,
//     fetchTrips,
//     createTrip,
//     updateTrip,
//     deleteTrip,
//     updateStatus,
//     duplicateTrip,
//     updateFilters,
//     changePage,
//     changeLimit,
//     resetFilters,
//     getStatusText,
//   };
// };

// export default useTrips;



import { useState, useEffect, useCallback, useRef } from "react";
import tripService from "../services/tripService";
import toast from "react-hot-toast";

const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    destination: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  // ✅ فصل state الترقيم: page, limit, total, pages
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  // ✅ منع التحديث المتكرر باستخدام ref
  const isMounted = useRef(true);
  const fetchId = useRef(0);

  const fetchTrips = useCallback(async () => {
    const currentFetchId = ++fetchId.current;
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...filters,
        page,
        limit,
      };
      const response = await tripService.getAllTrips(params);
      
      // تجاهل الاستجابة إذا لم تعد الحالية (لتجنب سباق)
      if (currentFetchId !== fetchId.current) return;

      // استخراج مصفوفة الرحلات بشكل مرن
      let tripsArray = [];
      if (Array.isArray(response)) {
        tripsArray = response;
      } else if (response?.data && Array.isArray(response.data)) {
        tripsArray = response.data;
      } else if (response?.trips && Array.isArray(response.trips)) {
        tripsArray = response.trips;
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        tripsArray = response.data.data;
        if (response.data.pagination) {
          setTotal(response.data.pagination.total || 0);
          setPages(response.data.pagination.pages || 0);
        }
      } else if (Array.isArray(response?.results)) {
        tripsArray = response.results;
      } else {
        console.warn("Unexpected API response structure:", response);
        tripsArray = [];
      }

      // إضافة participants_count إذا كان مفقودًا
      tripsArray = tripsArray.map(trip => ({
        ...trip,
        participants_count: trip.participants_count ?? trip.participants?.length ?? 0
      }));

      if (isMounted.current) {
        setTrips(tripsArray);
        // تحديث معلومات الترقيم من أي مكان آخر إذا لم تكن موجودة
        if (response?.pagination) {
          setTotal(response.pagination.total || 0);
          setPages(response.pagination.pages || 0);
        } else if (response?.data?.pagination) {
          setTotal(response.data.pagination.total || 0);
          setPages(response.data.pagination.pages || 0);
        }
      }
    } catch (err) {
      if (currentFetchId !== fetchId.current) return;
      const msg = err.response?.data?.message || "حدث خطأ في جلب الرحلات";
      setError(msg);
      toast.error(msg);
    } finally {
      if (isMounted.current && currentFetchId === fetchId.current) {
        setLoading(false);
      }
    }
  }, [filters, page, limit]);

  // ✅ جلب البيانات عند تغيير الفلاتر أو الصفحة
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // دالة مساعدة لتحديث الفلاتر وإعادة الصفحة إلى 1
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      destination: "",
      sortBy: "created_at",
      sortOrder: "desc",
    });
    setPage(1);
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // ✅ عملية الإنشاء مع تحديث يدوي
  const createTrip = async (tripData) => {
    setLoading(true);
    try {
      const newTrip = await tripService.createTrip(tripData);
      toast.success("تم إنشاء الرحلة بنجاح");
      // إعادة جلب نفس الصفحة (عادة الصفحة 1 إذا كنا في الصفحة الأولى)
      await fetchTrips();
      return newTrip;
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في إنشاء الرحلة");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ عملية التحديث مع تحديث يدوي
  const updateTrip = async (id, tripData) => {
    setLoading(true);
    try {
      const updatedTrip = await tripService.updateTrip(id, tripData);
      toast.success("تم تحديث الرحلة بنجاح");
      await fetchTrips(); // إعادة جلب نفس الصفحة
      return updatedTrip;
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في تحديث الرحلة");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await tripService.deleteTrip(id);
      toast.success("تم حذف الرحلة بنجاح");
      await fetchTrips();
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في حذف الرحلة");
      throw err;
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await tripService.updateTripStatus(id, status);
      toast.success(`تم تغيير حالة الرحلة إلى ${getStatusText(status)}`);
      await fetchTrips();
    } catch (err) {
      toast.error("فشل في تحديث حالة الرحلة");
      throw err;
    }
  };

  const duplicateTrip = async (id) => {
    setLoading(true);
    try {
      const newTrip = await tripService.duplicateTrip(id);
      toast.success("تم نسخ الرحلة بنجاح");
      await fetchTrips();
      return newTrip;
    } catch (err) {
      toast.error("فشل في نسخ الرحلة");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: "قيد الانتظار",
      confirmed: "مؤكدة",
      completed: "منتهية",
      cancelled: "ملغية",
    };
    return statusMap[status] || status;
  };

  return {
    trips,
    loading,
    error,
    filters,
    pagination: { page, limit, total, pages },
    fetchTrips,         // يمكن استدعاؤها يدويًا
    createTrip,
    updateTrip,
    deleteTrip,
    updateStatus,
    duplicateTrip,
    updateFilters,
    changePage,
    changeLimit,
    resetFilters,
    getStatusText,
  };
};

export default useTrips;