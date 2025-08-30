<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;
use App\Models\FormationRegistration;
use Illuminate\Support\Facades\Auth;

class FormationRegistrationController extends Controller
{
    // Register current student for a formation
    public function store(Request $request, Formation $formation)
    {
        $user = Auth::guard('web')->user();

        if (!$user) {
            return back()->withErrors(['error' => 'Vous devez être connecté.']);
        }

        // Optional: only allow published
        if (isset($formation->status) && $formation->status !== 'published') {
            return back()->with('error', "Cette formation n'est pas encore publiée.");
        }

        // Check if already registered
        $existingRegistration = FormationRegistration::where('formation_id', $formation->id)
            ->where('etudiant_id', $user->id)
            ->first();

        if ($existingRegistration) {
            return back()->withErrors(['error' => 'Vous êtes déjà inscrit à cette formation.']);
        }

        // Create registration
        FormationRegistration::create([
            'formation_id' => $formation->id,
            'etudiant_id' => $user->id,
            'registered_at' => now(),
        ]);

        // AUTO-CREATE CERTIFICATE (not generated yet)
        \App\Models\Certificate::create([
            'code' => 'CERT-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT),
            'student_id' => $user->id,
            'formation_id' => $formation->id,
            'student_name' => $user->name,
            'formation_title' => $formation->title,
            'registered_date' => now(),
            'is_generated' => false, // Not generated yet!
        ]);

        return back()->with('success', 'Inscription réussie !');
    }

    // Unregister (optional)
    public function destroy(Request $request, Formation $formation)
    {
        $etudiant = Auth::guard('web')->user(); // Get student using web guard
        abort_unless($etudiant, 403, 'Non authentifié');

        FormationRegistration::where('etudiant_id', $etudiant->id) // Changed from user_id
            ->where('formation_id', $formation->id)
            ->delete();

        return back()->with('success', "Vous êtes désinscrit(e) de la formation.");
    }
}
