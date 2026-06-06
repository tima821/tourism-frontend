import api from "../api/axios";

const notificationService = {
  getAll: async (limit = 50, offset = 0) => {
    const response = await api.get("/notifications", {
      params: { limit, offset },
    });
    return response.data;
  },

  getUnread: async () => {
    const response = await api.get("/notifications/unread");
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },

  delete: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  deleteAll: async () => {
    const response = await api.delete("/notifications");
    return response.data;
  },
};

export default notificationService;
