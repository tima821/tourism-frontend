# 🧳 مشروع تطبيق الرحلات السياحية

مشروع تخرج لتطبيق رحلات سياحية مع لوحة تحكم للمسؤولين وواجهة للمستخدمين العاديين.

## 🎯 نظرة عامة

| الجزء | التقنية | الحالة |
|-------|---------|--------|
| **Frontend** | React 19 + Vite | ✅ مكتمل |
| **Backend** | Laravel 11 | ⚙️ قيد الإعداد |
| **Database** | MySQL/PostgreSQL | ⚙️ قيد الإعداد |
| **API** | RESTful with JWT | ⚙️ قيد الإعداد |

---

## 📋 المتطلبات

### Frontend
- Node.js 18+
- npm أو yarn

### Backend
- PHP 8.1+
- Laravel 11
- Composer
- MySQL/PostgreSQL

---

## 🚀 البدء السريع

### 1️⃣ تشغيل Frontend

```bash
# تثبيت الحزم
npm install

# تشغيل سيرفر التطوير
npm run dev

# يعمل على: http://localhost:5173
```

### 2️⃣ تشغيل Backend (Laravel)

```bash
# تثبيت الحزم
composer install

# نسخ ملف البيئة
cp .env.example .env

# توليد مفتاح التطبيق
php artisan key:generate

# توليد JWT secret
php artisan jwt:secret

# تشغيل الـ migrations
php artisan migrate

# تشغيل السيرفر
php artisan serve

# يعمل على: http://localhost:8000
```

---

## 📚 الملفات التوثيقية

| الملف | الوصف |
|------|--------|
| **LARAVEL_INTEGRATION.md** | متطلبات API من جانب Laravel |
| **LARAVEL_SETUP.md** | خطوات إعداد Laravel كاملة |
| **API_USAGE_GUIDE.md** | كيفية استخدام Services في React |
| **PRACTICAL_EXAMPLES.md** | أمثلة عملية وكاملة |

---

## 🏗️ هيكل المشروع

### Frontend Structure
```
src/
├── api/
│   └── axios.js                 # إعدادات Axios
├── services/
│   ├── authService.js           # خدمات المصادقة
│   ├── tripService.js           # خدمات الرحلات
│   └── notificationService.js   # خدمات الإشعارات
├── contexts/
│   ├── AuthContext.jsx          # إدارة المصادقة
│   └── NotificationContext.jsx  # إدارة الإشعارات
├── components/
│   ├── login.jsx
│   ├── signup.jsx
│   ├── Layout/
│   ├── dashboard/
│   └── common/
├── pages/
│   ├── user/
│   └── admin/
├── hooks/
│   └── useTrips.js
└── App.jsx
```

---

## 🔐 المصادقة

يستخدم التطبيق **JWT (JSON Web Token)** للمصادقة:

1. المستخدم يُسجل دخول بـ email و password
2. الخادم يُرسل JWT token
3. Token يُحفظ في localStorage
4. يُرسل مع كل طلب في header: `Authorization: Bearer {token}`
5. إذا انتهى الصلاحية → إعادة توجيه للـ login

---

## 📡 الـ Endpoints الرئيسية

### المصادقة
```
POST   /api/auth/register          - إنشاء حساب جديد
POST   /api/auth/login             - تسجيل دخول
POST   /api/auth/logout            - تسجيل خروج
GET    /api/auth/me                - بيانات المستخدم الحالي
POST   /api/auth/refresh-token     - تجديد التوكن
```

### الرحلات (للمسؤول)
```
GET    /api/admin/trips            - قائمة جميع الرحلات
GET    /api/admin/trips/{id}       - تفاصيل رحلة
POST   /api/admin/trips            - إنشاء رحلة جديدة
PUT    /api/admin/trips/{id}       - تحديث رحلة
DELETE /api/admin/trips/{id}       - حذف رحلة
PATCH  /api/admin/trips/{id}/status - تغيير الحالة
POST   /api/admin/trips/{id}/duplicate - نسخ رحلة
```

### الرحلات (للمستخدم)
```
GET    /api/user/trips             - رحلاتي المحفوظة
GET    /api/user/trips/{id}        - تفاصيل رحلة
POST   /api/user/trips/{id}/book   - حجز رحلة
```

---

## 🔧 Services المتاحة

### AuthService
```javascript
import authService from '@/services/authService';

await authService.login(email, password);
await authService.register(userData);
await authService.logout();
await authService.getMe();
await authService.verifyEmail(code);
await authService.forgotPassword(email);
await authService.resetPassword(token, password, passwordConfirm);
```

### TripService
```javascript
import tripService from '@/services/tripService';

await tripService.getAllTrips(filters);        // للمسؤول
await tripService.getTripById(id);
await tripService.createTrip(tripData);
await tripService.updateTrip(id, tripData);
await tripService.deleteTrip(id);
await tripService.updateTripStatus(id, status);
await tripService.duplicateTrip(id);
await tripService.getMyTrips(filters);         // للمستخدم
await tripService.bookTrip(tripId);
await tripService.searchTrips(query, filters);
```

### NotificationService
```javascript
import notificationService from '@/services/notificationService';

await notificationService.getAll(limit, offset);
await notificationService.getUnread();
await notificationService.markAsRead(notificationId);
await notificationService.markAllAsRead();
await notificationService.delete(notificationId);
```

---

## 🪝 Hooks المتاحة

### useAuth
```javascript
import { useAuth } from '@/contexts/AuthContext';

const { user, role, loading, login, register, logout } = useAuth();
```

### useTrips
```javascript
import { useTrips } from '@/hooks/useTrips';

const { trips, loading, createTrip, updateTrip, deleteTrip } = useTrips(isAdmin);
```

### useNotifications
```javascript
import { useNotifications } from '@/contexts/NotificationContext';

const { notifications, unreadCount, markAsRead } = useNotifications();
```

---

## 🔍 أمثلة سريعة

### مثال: تسجيل دخول
```javascript
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password123');
    if (result.success) {
      console.log('User:', result.data);
    }
  };
}
```

### مثال: جلب الرحلات
```javascript
import { useTrips } from '@/hooks/useTrips';

function TripsPage() {
  const { trips, loading } = useTrips(true); // true للمسؤول

  if (loading) return <Spinner />;
  return trips.map(trip => <TripCard key={trip.id} trip={trip} />);
}
```

### مثال: الإشعارات
```javascript
import { useNotifications } from '@/contexts/NotificationContext';

function Header() {
  const { unreadCount } = useNotifications();

  return <span>📬 {unreadCount}</span>;
}
```

---

## ⚙️ ملفات الإعدادات

### `.env`
```
VITE_API_URL=http://127.0.0.1:8000/api
```

### `vite.config.js`
تم إعداده بـ React و Tailwind CSS

### `tailwind.config.js`
معدات لـ RTL (النصوص من اليمين لليسار)

---

## 🐛 معالجة الأخطاء

Axios interceptor يتعامل تلقائياً مع:

| الحالة | الكود | الإجراء |
|--------|------|--------|
| انتهت الجلسة | 401 | إعادة توجيه للـ login |
| صلاحيات غير كافية | 403 | عرض رسالة خطأ |
| غير موجود | 404 | عرض رسالة خطأ |
| خطأ خادم | 500+ | عرض رسالة خطأ |

---

## 📱 الواجهات المتاحة

### للمستخدم العادي
- ✅ تسجيل دخول/تسجيل
- ✅ التحقق من البريد
- ✅ نسيان كلمة المرور
- ✅ الصفحة الرئيسية
- ✅ استعراض الرحلات
- ✅ حجز رحلة
- ✅ الإشعارات

### للمسؤول
- ✅ لوحة التحكم
- ✅ إدارة الرحلات (CRUD)
- ✅ تغيير حالة الرحلات
- ✅ نسخ الرحلات
- ✅ عرض الإحصائيات
- ✅ الطلبات المعلقة

---

## 🧪 الاختبار

### اختبار في المتصفح
```javascript
// افتح console واكتب:
import authService from './services/authService';
await authService.login('admin@example.com', 'password');
```

### اختبار مع Postman
1. اذهب للـ POST `/api/auth/login`
2. أرسل البيانات: `{ "email": "...", "password": "..." }`
3. احفظ التوكن
4. استخدمه في الطلبات التالية

---

## 📝 قائمة التحقق قبل الإطلاق

### Backend
- [ ] Laravel مثبت
- [ ] Database مُعدّة
- [ ] JWT secret مُولّد
- [ ] CORS مُفعّل
- [ ] جميع الـ migrations تمّت
- [ ] جميع الـ Controllers مكتوبة
- [ ] جميع الـ Routes مُسجلة

### Frontend
- [ ] جميع الـ services مُختبرة
- [ ] AuthContext يعمل بشكل صحيح
- [ ] جميع الصفحات مُنسقة
- [ ] Tailwind CSS مُطبقة
- [ ] error handling مُضاف

---

## 🤝 المساهمة

إذا كان لديك ملاحظات أو تحسينات:
1. اختبر التغييرات
2. تأكد من عدم وجود أخطاء
3. وثّق التغييرات

---

## 📞 الدعم

للمساعدة في:
- **Axios و API calls**: اطلع على `API_USAGE_GUIDE.md`
- **أمثلة عملية**: اطلع على `PRACTICAL_EXAMPLES.md`
- **إعداد Laravel**: اطلع على `LARAVEL_SETUP.md`
- **متطلبات الـ API**: اطلع على `LARAVEL_INTEGRATION.md`

---

## 📄 الترخيص

حقوق محفوظة © 2024

---

**آخر تحديث**: 2026-05-21
