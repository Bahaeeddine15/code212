<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequestAdmin; // ✅ Use admin-specific request
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileControllerAdmin extends Controller
{
    /**
     * Show the admin's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $admin = auth('admin')->user();

        return Inertia::render('settings_admin/profile', [
            'mustVerifyEmail' => $admin instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'admin' => $admin,
        ]);
    }

    /**
     * Update the admin's profile settings.
     */
    public function update(ProfileUpdateRequestAdmin $request): RedirectResponse // ✅ Use admin request
    {
        $admin = auth('admin')->user();
        $admin->fill($request->validated());

        if ($admin->isDirty('email')) {
            $admin->email_verified_at = null;
        }

        $admin->save();

        return redirect()->route('admin.settings.profile.edit')
            ->with('status', 'profile-updated');
    }

    /**
     * Delete the admin's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password:admin'],
        ]);

        $admin = auth('admin')->user();

        auth('admin')->logout();

        $admin->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
