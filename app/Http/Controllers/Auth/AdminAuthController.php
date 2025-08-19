<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthController extends Controller
{
    /**
     * Display the admin login view.
     */
    public function showLoginForm(): Response
    {
        return Inertia::render('auth/login-admin', [
            'canResetPassword' => true,
            'status' => session('status'),
        ]);
    }

    /**
     * Display the admin registration view.
     */
    public function showRegisterForm(): Response
    {
        return Inertia::render('auth/register-admin');
    }

    /**
     * Handle an admin login request.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        }

        // Failed login: redirect back to admin login with error
        return redirect()->route('admin.login')
            ->withInput($request->only('email', 'remember'))
            ->withErrors([
                'email' => 'Identifiants invalides.',
            ]);
    }

    /**
     * Handle an admin registration request.
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Use the admin guard for login!
        Auth::guard('admin')->login($user);

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Destroy an admin session.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
