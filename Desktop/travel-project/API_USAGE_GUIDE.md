# 🚀 دليل استخدام الـ Services والـ API

## 📁 هيكل الملفات

```
src/
├── api/
│   └── axios.js              # إعدادات Axios المركزية ✅
├── services/
│   ├── authService.js        # خدمات المصادقة 🆕
│   ├── tripService.js        # خدمات الرحلات
│   └── notificationService.js # خدمات الإشعارات 🆕
└── contexts/
    └── AuthContext.jsx       # إدارة حالة المستخدم
```

---

## 🔐 Authentication Service

### تسجيل الدخول
```javascript
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    
    if (result.success) {
      console.log('تم تسجيل الدخول:', result.data);
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
  };
  
  return (
    // form component
  );
}
```

### التسجيل (إنشاء حساب جديد)
```javascript
import { useAuth } from '@/contexts/AuthContext';

function SignUpPage() {
  const { register } = useAuth();

  const handleSignUp = async (userData) => {
    const result = await register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.passwordConfirm,
    });
    
    if (result.success) {
      navigate('/email-verification');
    }
  };
  
  return (
    // form component
  );
}
```

### التحقق من البريد الإلكتروني
```javascript
import { useAuth } from '@/contexts/AuthContext';

function VerifyEmailPage() {
  const { verifyEmail } = useAuth();

  const handleVerify = async (code) => {
    const result = await verifyEmail(code);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };
  
  return (
    // verification component
  );
}
```

### نسيان كلمة المرور
```javascript
import { useAuth } from '@/contexts/AuthContext';

function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const handleForgot = async (email) => {
    const result = await forgotPassword(email);
    
    if (result.success) {
      toast.success('تم إرسال رابط إعادة التعيين للبريد');
      navigate('/reset-password');
    }
  };
  
  return (
    // form component
  );
}
```

### إعادة تعيين كلمة المرور
```javascript
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleReset = async (password) => {
    const result = await resetPassword(
      token,
      password,
      password // تأكيد كلمة المرور
    );
    
    if (result.success) {
      navigate('/login');
    }
  };
  
  return (
    // form component
  );
}
```

### تسجيل الخروج
```javascript
import { useAuth } from '@/contexts/AuthContext';

function Header() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <button onClick={handleLogout}>تسجيل خروج</button>
  );
}
```

---

## 🎒 Trip Service

### الحصول على جميع الرحلات (للمسؤول)
```javascript
import tripService from '@/services/tripService';
import { useEffect, useState } from 'react';

function TripsManagement() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getAllTrips({
          status: 'active',
          page: 1,
          limit: 10
        });
        setTrips(data.trips);
      } catch (error) {
        toast.error('فشل تحميل الرحلات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, []);

  return (
    // trips list component
  );
}
```

### إنشاء رحلة جديدة
```javascript
import tripService from '@/services/tripService';

async function handleCreateTrip(tripData) {
  try {
    const result = await tripService.createTrip({
      title: 'رحلة إلى مصر',
      description: 'وصف الرحلة',
      start_date: '2024-06-15',
      end_date: '2024-06-20',
      location: 'القاهرة',
      price: 2500,
      max_participants: 20,
      image_url: 'url/to/image'
    });
    
    toast.success('تم إنشاء الرحلة بنجاح');
    return result.trip;
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}
```

### تحديث رحلة
```javascript
import tripService from '@/services/tripService';

async function handleUpdateTrip(tripId, updates) {
  try {
    const result = await tripService.updateTrip(tripId, updates);
    toast.success('تم تحديث الرحلة');
    return result.trip;
  } catch (error) {
    toast.error('فشل التحديث');
  }
}
```

### تغيير حالة الرحلة
```javascript
import tripService from '@/services/tripService';

async function handleChangeStatus(tripId, newStatus) {
  try {
    // newStatus: 'active', 'archived', 'cancelled'
    await tripService.updateTripStatus(tripId, newStatus);
    toast.success('تم تحديث الحالة');
  } catch (error) {
    toast.error('فشل تحديث الحالة');
  }
}
```

### حذف رحلة
```javascript
import tripService from '@/services/tripService';

async function handleDeleteTrip(tripId) {
  if (confirm('هل أنت متأكد من حذف الرحلة؟')) {
    try {
      await tripService.deleteTrip(tripId);
      toast.success('تم حذف الرحلة');
    } catch (error) {
      toast.error('فشل الحذف');
    }
  }
}
```

### نسخ رحلة
```javascript
import tripService from '@/services/tripService';

async function handleDuplicateTrip(tripId) {
  try {
    const result = await tripService.duplicateTrip(tripId);
    toast.success('تم نسخ الرحلة بنجاح');
    return result.trip;
  } catch (error) {
    toast.error('فشل النسخ');
  }
}
```

### الحصول على رحلاتي (للمستخدم العادي)
```javascript
import tripService from '@/services/tripService';

async function getMyTrips() {
  try {
    const data = await tripService.getMyTrips();
    return data.trips;
  } catch (error) {
    console.error('خطأ في جلب الرحلات:', error);
  }
}
```

### حجز رحلة
```javascript
import tripService from '@/services/tripService';

async function handleBookTrip(tripId) {
  try {
    const result = await tripService.bookTrip(tripId);
    toast.success('تم حجز الرحلة بنجاح');
    return result;
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}
```

### البحث عن رحلات
```javascript
import tripService from '@/services/tripService';

async function searchTrips(query) {
  try {
    const data = await tripService.searchTrips(query, {
      start_date: '2024-06-01',
      end_date: '2024-12-31',
      min_price: 1000,
      max_price: 5000,
    });
    return data.trips;
  } catch (error) {
    console.error('خطأ في البحث:', error);
  }
}
```

---

## 🔔 Notification Service

### الحصول على الإشعارات
```javascript
import notificationService from '@/services/notificationService';

async function getNotifications() {
  try {
    const data = await notificationService.getAll(50, 0);
    return data.notifications;
  } catch (error) {
    console.error('خطأ في جلب الإشعارات:', error);
  }
}
```

### الحصول على الإشعارات غير المقروءة
```javascript
import notificationService from '@/services/notificationService';

async function getUnreadCount() {
  try {
    const data = await notificationService.getUnread();
    return data.count;
  } catch (error) {
    return 0;
  }
}
```

### تعليم إشعار كمقروء
```javascript
import notificationService from '@/services/notificationService';

async function markNotificationAsRead(notificationId) {
  try {
    await notificationService.markAsRead(notificationId);
  } catch (error) {
    console.error('خطأ:', error);
  }
}
```

### تعليم جميع الإشعارات كمقروءة
```javascript
import notificationService from '@/services/notificationService';

async function markAllAsRead() {
  try {
    await notificationService.markAllAsRead();
    toast.success('تم تعليم الجميع كمقروء');
  } catch (error) {
    toast.error('فشلت العملية');
  }
}
```

---

## ⚠️ معالجة الأخطاء

جميع الـ services تستخدم Axios الذي لديه interceptor يتعامل مع الأخطاء تلقائياً:

- **401**: انتهت الجلسة → إعادة توجيه للـ login
- **403**: لا توجد صلاحيات
- **404**: المورد غير موجود
- **500+**: خطأ في الخادم

```javascript
import tripService from '@/services/tripService';

async function example() {
  try {
    const result = await tripService.getAllTrips();
  } catch (error) {
    // الخطأ سيكون له:
    // error.response.status - رمز الخطأ
    // error.response.data - بيانات الخطأ من Laravel
    // error.message - رسالة الخطأ
    
    console.log(error.response?.data?.message);
  }
}
```

---

## 🔑 إدارة التوكن

التوكن يُحفظ تلقائياً في `localStorage` بعد تسجيل الدخول:

```javascript
// احصل على التوكن
const token = localStorage.getItem('token');

// احصل على بيانات المستخدم
const user = JSON.parse(localStorage.getItem('user_info'));

// حذف التوكن (عند تسجيل الخروج)
localStorage.removeItem('token');
localStorage.removeItem('user_info');
```

---

## 🧪 اختبار الـ API

### مثال: اختبار تسجيل الدخول
```javascript
// 1. افتح console في المتصفح
// 2. اكتب:

import authService from './services/authService';
await authService.login('admin@example.com', 'password123');

// يجب أن ترى استجابة تحتوي على token و user
```

---

## 📝 ملاحظات مهمة

1. **جميع الـ requests محمية**: تأكد من وجود Bearer token صحيح
2. **CORS**: تأكد من تفعيل CORS في Laravel
3. **Environment**: استخدم `.env` لتعريف `VITE_API_URL`
4. **Error Handling**: استخدم try-catch دائماً عند استدعاء الـ services
