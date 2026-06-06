# 🎓 أمثلة استخدام سريعة

## 🔐 المصادقة

### تسجيل دخول
```javascript
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password123');
    
    if (result.success) {
      console.log('المستخدم:', result.data);
    } else {
      console.error('الخطأ:', result.error);
    }
  };

  return <button onClick={handleLogin}>دخول</button>;
}
```

### تسجيل جديد
```javascript
import { useAuth } from '@/contexts/AuthContext';

function SignupPage() {
  const { register } = useAuth();

  const handleSignup = async () => {
    const result = await register({
      name: 'محمد',
      email: 'user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    });

    if (result.success) {
      // توجيه لـ email verification
      navigate('/email-verification');
    }
  };
}
```

### التحقق من البريد
```javascript
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

function VerifyEmailPage() {
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (code) => {
    const result = await verifyEmail(email, code);
    if (result.success) {
      navigate('/login');
    }
  };
}
```

### نسيان كلمة المرور
```javascript
import { useAuth } from '@/contexts/AuthContext';

function ForgotPasswordPage() {
  const { forgotPassword, verifyCode, resetPassword } = useAuth();

  // الخطوة 1: إرسال البريد
  const handleSendEmail = async (email) => {
    const result = await forgotPassword(email);
    if (result.success) {
      // انتقل لصفحة إدخال الكود
    }
  };

  // الخطوة 2: التحقق من الكود
  const handleVerifyCode = async (email, code) => {
    const result = await verifyCode(email, code);
    if (result.success) {
      // الكود صحيح، انتقل لإدخال كلمة المرور الجديدة
    }
  };

  // الخطوة 3: إعادة تعيين كلمة المرور
  const handleResetPassword = async (email, code, newPassword) => {
    const result = await resetPassword(
      email,
      code,
      newPassword,
      newPassword
    );
    if (result.success) {
      navigate('/login');
    }
  };
}
```

### تسجيل خروج
```javascript
import { useAuth } from '@/contexts/AuthContext';

function Header() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <p>مرحبا {user?.name}</p>
      <button onClick={handleLogout}>خروج</button>
    </div>
  );
}
```

---

## 🎒 الرحلات

### جلب الرحلات
```javascript
import { useTrips } from '@/hooks/useTrips';
import { useEffect } from 'react';

function TripsPage() {
  const { trips, loading, fetchTrips } = useTrips(false); // false = مستخدم عادي

  useEffect(() => {
    fetchTrips({ page: 1, limit: 10 });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id}>
          <h3>{trip.title}</h3>
          <p>{trip.price} ريال</p>
        </div>
      ))}
    </div>
  );
}
```

### إنشاء رحلة (للمسؤول)
```javascript
import { useTrips } from '@/hooks/useTrips';

function CreateTripPage() {
  const { createTrip } = useTrips(true); // true = مسؤول

  const handleCreate = async () => {
    try {
      const newTrip = await createTrip({
        title: 'رحلة إلى مصر',
        description: 'رحلة سياحية رائعة',
        start_date: '2024-06-15',
        end_date: '2024-06-20',
        location: 'القاهرة',
        price: 2500,
        max_participants: 20,
        image_url: 'url/to/image'
      });
      toast.success('تم الإنشاء بنجاح');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return <button onClick={handleCreate}>إنشاء</button>;
}
```

### تحديث رحلة
```javascript
const { updateTrip } = useTrips(true);

const handleUpdate = async (tripId) => {
  try {
    await updateTrip(tripId, {
      title: 'عنوان جديد',
      price: 3000
    });
    toast.success('تم التحديث');
  } catch (error) {
    toast.error('فشل التحديث');
  }
};
```

### حذف رحلة
```javascript
const { deleteTrip } = useTrips(true);

const handleDelete = async (tripId) => {
  if (confirm('هل أنت متأكد؟')) {
    try {
      await deleteTrip(tripId);
      toast.success('تم الحذف');
    } catch (error) {
      toast.error('فشل الحذف');
    }
  }
};
```

### حجز رحلة (للمستخدم)
```javascript
import tripService from '@/services/tripService';

async function handleBookTrip(tripId) {
  try {
    const result = await tripService.bookTrip(tripId);
    toast.success('تم الحجز بنجاح');
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}
```

---

## 🔔 الإشعارات

```javascript
import { useNotifications } from '@/contexts/NotificationContext';

function NotificationsPanel() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  return (
    <div>
      <h3>الإشعارات ({unreadCount})</h3>
      
      <button onClick={markAllAsRead}>
        وضّع الكل كمقروء
      </button>

      <div>
        {notifications.map(notif => (
          <div key={notif.id} onClick={() => markAsRead(notif.id)}>
            <p>{notif.message}</p>
            <button onClick={() => deleteNotification(notif.id)}>
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🛡️ Axios مباشر (إذا لزم الأمر)

```javascript
import api from '@/api/axios';

// GET request
const data = await api.get('/trips');

// POST request
const response = await api.post('/trips', tripData);

// PUT request
const response = await api.put(`/trips/${id}`, updatedData);

// DELETE request
await api.delete(`/trips/${id}`);

// PATCH request
await api.patch(`/trips/${id}/status`, { status: 'active' });

// مع parameters
const data = await api.get('/trips', { 
  params: { page: 1, limit: 10 } 
});
```

---

## ✅ نصائح مهمة

1. **استخدم hooks**: لا تستدعي API مباشرة، استخدم `useTrips` و `useAuth`
2. **معالجة الأخطاء**: استخدم try-catch دائماً
3. **Toast Messages**: أخبر المستخدم عن النتيجة
4. **Loading States**: اعرض spinner أثناء التحميل
5. **Token**: يُحفظ تلقائياً بعد login

---

## 🎯 مثال كامل

```javascript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function CompleteExample() {
  const { login, user, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('مرحبا ' + result.data.name);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div>
        <h1>مرحبا {user.name}</h1>
        <button onClick={logout}>خروج</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="البريد الإلكتروني"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="كلمة المرور"
      />
      <button disabled={loading} type="submit">
        {loading ? 'جاري...' : 'دخول'}
      </button>
    </form>
  );
}
```
