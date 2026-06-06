# 🔗 دليل الربط مع Laravel API

## المتطلبات من جانب Laravel

تأكد من وجود هذه الـ Endpoints في Laravel:

### 1️⃣ المصادقة (Authentication)
```
POST   /api/auth/register       - تسجيل مستخدم جديد
POST   /api/auth/login          - تسجيل دخول
POST   /api/auth/logout         - تسجيل خروج
GET    /api/auth/me             - الحصول على بيانات المستخدم الحالي
POST   /api/auth/refresh-token  - تجديد التوكن
POST   /api/auth/forgot-password - نسيان كلمة المرور
POST   /api/auth/reset-password  - إعادة تعيين كلمة المرور
POST   /api/auth/verify-email    - التحقق من البريد الإلكتروني
```

### 2️⃣ الرحلات (Trips) - للمسؤولين
```
GET    /api/admin/trips              - قائمة الرحلات
GET    /api/admin/trips/{id}         - تفاصيل رحلة
POST   /api/admin/trips              - إنشاء رحلة جديدة
PUT    /api/admin/trips/{id}         - تحديث رحلة
DELETE /api/admin/trips/{id}         - حذف رحلة
PATCH  /api/admin/trips/{id}/status  - تغيير حالة الرحلة
POST   /api/admin/trips/{id}/duplicate - نسخ رحلة
```

### 3️⃣ الرحلات - للمستخدمين العاديين
```
GET    /api/user/trips         - رحلاتي
GET    /api/user/trips/{id}    - تفاصيل رحلة
POST   /api/user/trips/{id}/book - حجز رحلة
```

### 4️⃣ الإشعارات
```
GET    /api/notifications              - الإشعارات
PATCH  /api/notifications/{id}/read    - تعليم كمقروء
DELETE /api/notifications/{id}         - حذف إشعار
```

---

## معايير الاستجابة (Response Format)

### ✅ نجاح العملية
```json
{
  "success": true,
  "data": { /* البيانات */ },
  "message": "تم النجاح"
}
```

### ❌ فشل العملية
```json
{
  "success": false,
  "errors": { /* الأخطاء */ },
  "message": "رسالة الخطأ"
}
```

---

## رسائل الخطأ المتوقعة

| الحالة | الرمز | المعنى |
|--------|------|--------|
| غير صحيح | 401 | التوكن منتهي الصلاحية أو غير موجود |
| الوصول مرفوض | 403 | لا تملك صلاحية للقيام بهذا الإجراء |
| غير موجود | 404 | المورد غير موجود |
| خطأ التحقق | 422 | بيانات غير صحيحة |
| خطأ الخادم | 500 | خطأ في الخادم |

---

## التوكن (Bearer Token)

جميع الطلبات المحمية تحتاج رأس:
```
Authorization: Bearer {token}
```

التوكن يُحفظ تلقائياً في `localStorage` بعد تسجيل الدخول.

---

## CORS Configuration

تأكد من تفعيل CORS في Laravel:

```php
// config/cors.php
'allowed_origins' => [
    'http://localhost:5173',  // Vite dev server
    'http://127.0.0.1:5173',
],

'supports_credentials' => true,
```

---

## متطلبات البيانات

### 📋 Trip Model
```json
{
  "id": 1,
  "title": "رحلة إلى مصر",
  "description": "وصف الرحلة",
  "start_date": "2024-06-15",
  "end_date": "2024-06-20",
  "location": "القاهرة",
  "price": 2500,
  "max_participants": 20,
  "current_participants": 15,
  "status": "active", // active, archived, cancelled
  "image_url": "url/to/image",
  "created_at": "2024-05-20T10:00:00Z",
  "updated_at": "2024-05-20T10:00:00Z"
}
```

### 👤 User Model
```json
{
  "id": 1,
  "name": "محمد",
  "email": "user@example.com",
  "phone": "966500000000",
  "role": "user", // user, admin
  "email_verified": true,
  "created_at": "2024-05-20T10:00:00Z"
}
```

---

## اختبار الـ API

استخدم **Postman** أو **Thunder Client** لاختبار الـ endpoints

1. اذهب لـ POST `/api/auth/login`
2. أرسل البيانات:
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```
3. احفظ التوكن من الاستجابة
4. استخدمه في الطلبات التالية برأس `Authorization: Bearer {token}`
