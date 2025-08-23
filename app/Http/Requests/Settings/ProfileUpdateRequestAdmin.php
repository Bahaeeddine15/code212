<?php
// filepath: c:\xampp\htdocs\code212\app\Http\Requests\Settings\ProfileUpdateRequestAdmin.php

namespace App\Http\Requests\Settings;

use App\Models\User; // ✅ Use User model for admin
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequestAdmin extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                // ✅ Use User model for admin (since admins are in users table)
                Rule::unique(User::class, 'email')->ignore(auth('admin')->user()->id),
            ],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('admin')->check();
    }
}
