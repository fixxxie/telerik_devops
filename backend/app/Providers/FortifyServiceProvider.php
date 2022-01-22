<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;

use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;

class CustomLoginResponse implements LoginResponse
{
    public function toResponse($request)
    {
        $user = auth()->user();
        return response()->json(['status' => true, 'user' => $user]);
    }
}

class CustomLogoutResponse implements LogoutResponse
{
    public function toResponse($request)
    {
        return response()->json(['status' => true, 'message' => 'Logout successful.']);
    }
}

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(LoginResponse::class, CustomLoginResponse::class);
        $this->app->singleton(LogoutResponse::class, CustomLogoutResponse::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        RateLimiter::for(
            'login', function (Request $request) {
                $email = (string) $request->email;

                return Limit::perMinute(5)->by($email.$request->ip());
            }
        );
    }
}
