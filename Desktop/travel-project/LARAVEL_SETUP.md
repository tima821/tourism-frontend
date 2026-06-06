# 🛠️ إعدادات Laravel المطلوبة

## 1️⃣ الحزم المطلوبة

```bash
composer require tymon/jwt-auth
composer require fruitcake/laravel-cors
```

---

## 2️⃣ إعدادات CORS

**`config/cors.php`:**
```php
'allowed_origins' => ['*'],
// أو لتحديد الـ origin فقط:
'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
],

'supports_credentials' => true,

'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,
```

---

## 3️⃣ إعدادات JWT

**`config/jwt.php`:**
```php
return [
    'secret' => env('JWT_SECRET'),
    'algorithms' => ['HS256'],
    'required_claims' => ['iat', 'nbf', 'exp', 'data'],
    'leeway' => env('JWT_LEEWAY', 0),
    'ttl' => env('JWT_TTL', 60),
    'refresh_ttl' => env('JWT_REFRESH_TTL', 20160),
    'algo' => env('JWT_ALGO', 'HS256'),
    'show_black_list_exception' => env('JWT_SHOW_BLACKLIST_EXCEPTION', false),
];
```

**`.env`:**
```
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_TTL=60
JWT_REFRESH_TTL=20160
```

---

## 4️⃣ نموذج User

**`app/Models/User.php`:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,
            'email' => $this->email,
        ];
    }

    public function trips()
    {
        return $this->belongsToMany(Trip::class, 'trip_bookings');
    }
}
```

---

## 5️⃣ Controller للمصادقة

**`app/Http/Controllers/AuthController.php`:**
```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => 'user',
        ]);

        $token = auth()->login($user);

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات الدخول غير صحيحة',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => auth()->user(),
        ]);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح',
        ]);
    }

    public function me()
    {
        return response()->json([
            'success' => true,
            'user' => auth()->user(),
        ]);
    }

    public function refreshToken()
    {
        $token = auth()->refresh();
        return response()->json([
            'success' => true,
            'token' => $token,
        ]);
    }

    public function verifyEmail(Request $request)
    {
        // يمكنك إضافة منطق التحقق من البريد هنا
        return response()->json([
            'success' => true,
            'message' => 'تم التحقق من البريد بنجاح',
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // أرسل بريد إعادة التعيين
        // Mail::send(new ResetPasswordMail($user, $token));

        return response()->json([
            'success' => true,
            'message' => 'تم إرسال رابط إعادة التعيين للبريد',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // تحقق من التوكن وأعد تعيين كلمة المرور
        // ...

        return response()->json([
            'success' => true,
            'message' => 'تم إعادة تعيين كلمة المرور',
        ]);
    }
}
```

---

## 6️⃣ Routes

**`routes/api.php`:**
```php
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// مسارات عامة
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// مسارات محمية
Route::middleware('auth:jwt')->group(function () {
    // المصادقة
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken']);
    Route::post('/auth/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

    // مسارات المسؤول
    Route::middleware('admin')->group(function () {
        Route::apiResource('/admin/trips', TripController::class, [
            'only' => ['index', 'show', 'store', 'update', 'destroy']
        ]);
        Route::patch('/admin/trips/{trip}/status', [TripController::class, 'updateStatus']);
        Route::post('/admin/trips/{trip}/duplicate', [TripController::class, 'duplicate']);
    });

    // مسارات المستخدم العادي
    Route::group([], function () {
        Route::get('/user/trips', [TripController::class, 'getUserTrips']);
        Route::get('/user/trips/{trip}', [TripController::class, 'show']);
        Route::post('/user/trips/{trip}/book', [TripController::class, 'bookTrip']);
    });

    // الإشعارات
    Route::apiResource('/notifications', NotificationController::class, [
        'only' => ['index', 'destroy']
    ]);
    Route::get('/notifications/unread', [NotificationController::class, 'getUnread']);
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications', [NotificationController::class, 'deleteAll']);
});

Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
```

---

## 7️⃣ Middleware

**`app/Http/Middleware/Admin.php`:**
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->role === 'admin') {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'ليس لديك صلاحية للقيام بهذا الإجراء',
        ], 403);
    }
}
```

---

## 8️⃣ Migration للرحلات

**`database/migrations/xxxx_create_trips_table.php`:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('location');
            $table->decimal('price', 10, 2);
            $table->integer('max_participants');
            $table->integer('current_participants')->default(0);
            $table->enum('status', ['active', 'archived', 'cancelled'])->default('active');
            $table->string('image_url')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
```

---

## 9️⃣ تشغيل الخادم

```bash
# بدء الخادم
php artisan serve

# يجب أن يعمل على: http://localhost:8000
```

---

## ✅ قائمة الفحص

- [ ] تثبيت JWT auth و CORS
- [ ] إعدادات CORS صحيحة
- [ ] Models معرّفة
- [ ] Controllers مكتوبة
- [ ] Routes مُسجلة
- [ ] Migrations تم تشغيلها
- [ ] Middleware معرّف
- [ ] .env مع JWT_SECRET
- [ ] الخادم يعمل على localhost:8000
