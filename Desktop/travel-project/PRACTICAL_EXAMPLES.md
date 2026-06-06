# 💡 أمثلة عملية للربط بين React و Laravel

## مثال 1: صفحة تسجيل دخول كاملة

**`src/components/login.jsx`:**
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('تم تسجيل الدخول بنجاح');
        
        // توجيه حسب دور المستخدم
        if (result.data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/user-home');
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          تسجيل الدخول
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ليس لديك حساب؟{' '}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              إنشاء حساب
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## مثال 2: صفحة قائمة الرحلات مع التصفية

**`src/pages/admin/TripsManagement.jsx`:**
```javascript
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import tripService from '@/services/tripService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TripForm from '@/components/dashboard/TripForm';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';

export default function TripsManagement() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'active' });
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deletingTrip, setDeletingTrip] = useState(null);

  // جلب الرحلات
  useEffect(() => {
    fetchTrips();
  }, [filters]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const data = await tripService.getAllTrips(filters);
      setTrips(data.trips || []);
    } catch (error) {
      toast.error('فشل تحميل الرحلات');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (tripData) => {
    try {
      await tripService.createTrip(tripData);
      toast.success('تم إنشاء الرحلة بنجاح');
      setShowForm(false);
      fetchTrips();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل الإنشاء');
    }
  };

  const handleUpdateTrip = async (tripData) => {
    try {
      await tripService.updateTrip(editingTrip.id, tripData);
      toast.success('تم تحديث الرحلة بنجاح');
      setEditingTrip(null);
      setShowForm(false);
      fetchTrips();
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل التحديث');
    }
  };

  const handleDeleteTrip = async () => {
    try {
      await tripService.deleteTrip(deletingTrip.id);
      toast.success('تم حذف الرحلة بنجاح');
      setDeletingTrip(null);
      fetchTrips();
    } catch (error) {
      toast.error('فشل الحذف');
    }
  };

  const handleStatusChange = async (tripId, newStatus) => {
    try {
      await tripService.updateTripStatus(tripId, newStatus);
      toast.success('تم تحديث الحالة');
      fetchTrips();
    } catch (error) {
      toast.error('فشل تحديث الحالة');
    }
  };

  const handleDuplicate = async (tripId) => {
    try {
      await tripService.duplicateTrip(tripId);
      toast.success('تم نسخ الرحلة بنجاح');
      fetchTrips();
    } catch (error) {
      toast.error('فشل النسخ');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الرحلات</h1>
        <button
          onClick={() => {
            setEditingTrip(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + إضافة رحلة جديدة
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="active">رحلات نشطة</option>
          <option value="archived">رحلات مؤرشفة</option>
          <option value="cancelled">رحلات ملغاة</option>
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            {editingTrip ? 'تعديل الرحلة' : 'رحلة جديدة'}
          </h2>
          <TripForm
            trip={editingTrip}
            onSubmit={editingTrip ? handleUpdateTrip : handleCreateTrip}
            onCancel={() => {
              setShowForm(false);
              setEditingTrip(null);
            }}
          />
        </div>
      )}

      {/* Trips List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow p-6">
            {trip.image_url && (
              <img
                src={trip.image_url}
                alt={trip.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
            <p className="text-gray-600 mb-2">{trip.description}</p>

            <div className="space-y-1 text-sm text-gray-700 mb-4">
              <p>📍 {trip.location}</p>
              <p>📅 من {trip.start_date} إلى {trip.end_date}</p>
              <p>💰 {trip.price} ريال</p>
              <p>👥 {trip.current_participants} / {trip.max_participants} مشارك</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={trip.status}
                onChange={(e) => handleStatusChange(trip.id, e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded"
              >
                <option value="active">نشطة</option>
                <option value="archived">مؤرشفة</option>
                <option value="cancelled">ملغاة</option>
              </select>

              <button
                onClick={() => {
                  setEditingTrip(trip);
                  setShowForm(true);
                }}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              >
                تعديل
              </button>

              <button
                onClick={() => handleDuplicate(trip.id)}
                className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
              >
                نسخ
              </button>

              <button
                onClick={() => setDeletingTrip(trip)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingTrip && (
        <DeleteConfirmModal
          title="حذف الرحلة"
          message={`هل أنت متأكد من حذف رحلة "${deletingTrip.title}"؟`}
          onConfirm={handleDeleteTrip}
          onCancel={() => setDeletingTrip(null)}
        />
      )}

      {trips.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد رحلات حالياً</p>
        </div>
      )}
    </div>
  );
}
```

---

## مثال 3: Hook مخصص لـ Trips

**`src/hooks/useTrips.js`:**
```javascript
import { useState, useEffect, useCallback } from 'react';
import tripService from '@/services/tripService';

export function useTrips(isAdmin = false) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = isAdmin
        ? await tripService.getAllTrips(filters)
        : await tripService.getMyTrips(filters);
      setTrips(data.trips || []);
    } catch (err) {
      setError(err.response?.data?.message || 'خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const createTrip = useCallback(async (tripData) => {
    try {
      const result = await tripService.createTrip(tripData);
      setTrips((prev) => [...prev, result.trip]);
      return result.trip;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateTrip = useCallback(async (id, tripData) => {
    try {
      const result = await tripService.updateTrip(id, tripData);
      setTrips((prev) =>
        prev.map((trip) => (trip.id === id ? result.trip : trip))
      );
      return result.trip;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteTrip = useCallback(async (id) => {
    try {
      await tripService.deleteTrip(id);
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  const bookTrip = useCallback(async (id) => {
    try {
      const result = await tripService.bookTrip(id);
      fetchTrips(); // تحديث القائمة
      return result;
    } catch (err) {
      throw err;
    }
  }, [fetchTrips]);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    bookTrip,
  };
}
```

**الاستخدام:**
```javascript
import { useTrips } from '@/hooks/useTrips';

function MyComponent() {
  const { trips, loading, createTrip, updateTrip, deleteTrip } = useTrips(true);

  if (loading) return <Spinner />;

  return (
    // component content
  );
}
```

---

## مثال 4: Context للإشعارات

**`src/contexts/NotificationContext.jsx`:**
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import notificationService from '@/services/notificationService';

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // جلب الإشعارات
  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getAll();
      setNotifications(data.notifications || []);
      
      const unread = data.notifications.filter(n => !n.read_at).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('خطأ في جلب الإشعارات:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // جلب الإشعارات كل 30 ثانية
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read_at: new Date() } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('خطأ:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: new Date() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('خطأ:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.delete(notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error('خطأ:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
```

**الاستخدام:**
```javascript
import { useNotifications } from '@/contexts/NotificationContext';

function Header() {
  const { notifications, unreadCount, markAsRead } = useNotifications();

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button className="text-2xl">🔔</button>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
```

---

## ⚠️ ملاحظات مهمة

1. **Error Handling**: استخدم try-catch دائماً
2. **Loading States**: أظهر spinner أثناء التحميل
3. **Toast Notifications**: أخبر المستخدم عن النتيجة
4. **Token Refresh**: يُتعامل معه تلقائياً في axios interceptor
5. **CORS**: تأكد من إعداد Laravel بشكل صحيح
