<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;
use Illuminate\Support\Facades\Log; // Add logging

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        Log::info('Registration request received', $request->all()); // Log incoming request

        // Validate request
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $formation = Formation::find($request->formation_id);
        if (!$formation) {
            Log::error('Formation not found', ['formation_id' => $request->formation_id]);
            return response()->json(['error' => 'Formation not found'], 404);
        }

        try {
            $formation->users()->attach($request->user_id);
            Log::info('User attached to formation', [
                'formation_id' => $request->formation_id,
                'user_id' => $request->user_id
            ]);
        } catch (\Exception $e) {
            Log::error('Error attaching user to formation', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Registration failed'], 500);
        }

        return response()->json(['message' => 'Registration successful']);
    }
}
