# ❓ الأسئلة الشائعة وحلولها

## 🔧 الإعدادات

### Q: أين أحط ngrok URL؟
**A:** في ملف `.env`:
```
VITE_API_URL=https://barbecue-utilize-feast.ngrok-free.dev/api
```

### Q: الـ ngrok URL تغيّر؟
**A:** كل مرة تشغّل ngrok من جديد يتغير الـ URL. اطلب من صاحب الباك الـ URL الجديد وحدّث `.env`.

### Q: كيف أعيد تشغيل السيرفر؟
**A:**
```bash
# أوقف السيرفر
Ctrl + C

# شغّل من جديد
npm run dev
```

---

## 🔐 المصادقة

### Q: كيف أسجل دخول؟
**A:**
```javascript
const { login } = useAuth();
const result = await login('email@example.com', 'password123');
```

### Q: كيف أحفظ بيانات المستخدم؟
**A:** يُحفظ تلقائياً في `localStorage`:
```javascript
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user_info'));
```

### Q: التوكن انتهت صلاحيته؟
**A:** سجّل دخول من جديد. الـ axios interceptor يعيد توجيهك تلقائياً.

### Q: كيف أحذف البيانات عند تسجيل الخروج؟
**A:**
```javascript
const { logout } = useAuth();
await logout();
// يحذف كل البيانات تلقائياً
```

---

## 🎒 الرحلات

### Q: كيف أجلب الرحلات؟
**A:**
```javascript
import tripService from '@/services/tripService';

const trips = await tripService.getAllTrips();
```

### Q: كيف أصفّي الرحلات؟
**A:**
```javascript
const trips = await tripService.getAllTrips({
  status: 'active',
  page: 1,
  limit: 10
});
```

### Q: كيف أبحث عن رحلات؟
**A:**
```javascript
const results = await tripService.searchTrips('مصر', {
  start_date: '2024-06-01',
  end_date: '2024-12-31'
});
```

### Q: كيف أحجز رحلة؟
**A:**
```javascript
const result = await tripService.bookTrip(tripId);
```

---

## ❌ الأخطاء الشائعة

### Q: خطأ "CORS Error"؟
**A:**
- السبب: ngrok URL خاطئ أو Laravel لم يفعّل CORS
- الحل: تحقق من `.env` و استقسِ من صاحب الباك عن CORS

### Q: خطأ "401 Unauthorized"?
**A:**
- السبب: التوكن انتهت صلاحيته أو غير موجود
- الحل: سجّل دخول من جديد

### Q: خطأ "422 Validation Error"?
**A:**
- السبب: البيانات المرسلة غير صحيحة
- الحل: افحص البيانات:
```javascript
// مثال صحيح:
await register({
  name: 'محمد',
  email: 'user@example.com',
  password: 'password123',
  password_confirmation: 'password123'
});
```

### Q: خطأ "Network Error"?
**A:**
- السبب: Laravel server معطل أو ngrok tunnel مقفول
- الحل:
  1. تأكد من `php artisan serve` يعمل
  2. تأكد من ngrok tunnel نشط

### Q: لا تظهر رسائل الخطأ؟
**A:** اضف toast import:
```javascript
import toast from 'react-hot-toast';

// ثم استخدم:
toast.error('رسالة الخطأ');
toast.success('رسالة النجاح');
```

---

## 🧪 الاختبار

### Q: كيف أختبر API من المتصفح؟
**A:** افتح Console واكتب:
```javascript
import authService from './services/authService';
await authService.login('email@example.com', 'password');
```

### Q: كيف أختبر من Postman؟
**A:**
1. افتح Postman
2. اختر POST
3. الـ URL: `https://barbecue-utilize-feast.ngrok-free.dev/api/auth/login`
4. JSON body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
5. أرسل

---

## 📱 الأداء

### Q: الطلب بطيء؟
**A:**
- ngrok أبطأ من localhost
- هذا طبيعي أثناء التطوير
- عند الـ deployment ستكون سريعة

### Q: كيف أتجاهل رسائل الخطأ؟
**A:** أضف `.catch()`:
```javascript
try {
  await login(email, password);
} catch (error) {
  // تم التعامل مع الخطأ
}
```

---

## 🔒 الأمان

### Q: هل التوكن آمن في localStorage؟
**A:** نعم، إذا كان الموقع على HTTPS (كما ngrok). جرّب استخدام httpOnly cookies على الـ production.

### Q: كيف أحمي الـ endpoints المحمية؟
**A:** استخدم ProtectedRoute:
```javascript
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/login" />;
};

// استخدم:
<Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

---

## 🐛 استكشاف الأخطاء

### خطأ: "Cannot read property 'login' of undefined"
```javascript
// ❌ خطأ - لم تستخدم الـ hook بشكل صحيح
function MyComponent() {
  const auth = useAuth(); // لا تستخدمه خارج provider
}

// ✅ صحيح
function MyComponent() {
  const { login } = useAuth();
}

// ✅ صحيح - لكن لا تنسَ AuthProvider في App.jsx
```

### خطأ: "VITE_API_URL is undefined"
```javascript
// ✅ الحل: استخدم import.meta.env
console.log(import.meta.env.VITE_API_URL);

// تأكد من `.env` يحتوي:
// VITE_API_URL=https://...
```

### خطأ: "Token not sent with request"
```javascript
// السبب: axios interceptor لم يقرأ التوكن
// الحل: استخدم AuthProvider في App.jsx:

<AuthProvider>
  <NotificationProvider>
    <App />
  </NotificationProvider>
</AuthProvider>
```

---

## 💡 نصائح إضافية

### استخدم react-hot-toast للإخطار
```javascript
import toast from 'react-hot-toast';

toast.success('نجح');
toast.error('خطأ');
toast.loading('جاري...');
```

### استخدم useNavigate للتوجيه
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard'); // توجيه
navigate(-1); // للخلف
```

### استخدم useState للـ forms
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

---

## 📞 اتصل بـ Backend Developer

إذا واجهت مشاكل غير محلولة:
1. شارك screenshot من error
2. شارك Console output
3. شارك الكود اللي فيه المشكلة
4. اسأل عن API response format
