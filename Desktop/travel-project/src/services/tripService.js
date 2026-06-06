import api from "../api/axios";

const tripService = {
  // للحصول على جميع الرحلات
  getAllTrips: async (filters = {}) => {
    try {
      const response = await api.get("/trips", { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // الحصول على رحلة واحدة
  getTripById: async (id) => {
    try {
      const response = await api.get(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // إنشاء رحلة جديدة (للمسؤول)
  createTrip: async (tripData) => {
    try {
      const response = await api.post("/trips", tripData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // تحديث رحلة (للمسؤول)
  updateTrip: async (id, tripData) => {
    try {
      const response = await api.put(`/trips/${id}`, tripData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // حذف رحلة (للمسؤول)
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/trips/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // تغيير حالة الرحلة (للمسؤول)
  updateTripStatus: async (id, status) => {
    try {
      const response = await api.patch(`/trips/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // نسخ رحلة (للمسؤول)
  duplicateTrip: async (id) => {
    try {
      const response = await api.post(`/trips/${id}/duplicate`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // البحث والتصفية
  searchTrips: async (query, filters = {}) => {
    try {
      const response = await api.get("/trips", {
        params: { search: query, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default tripService;

