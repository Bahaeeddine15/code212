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
        // Optional: only allow published
        if (isset($formation->status) && $formation->status !== 'published') {
            return back()->with('error', "Cette formation n'est pas encore publiée.");
        }

        $etudiant = Auth::guard('web')->user(); // Get student using web guard
        abort_unless($etudiant, 403, 'Non authentifié');

        // Prevent duplicates
        $exists = FormationRegistration::where([
            'etudiant_id' => $etudiant->id, // Changed from user_id
            'formation_id' => $formation->id,
        ])->exists();

        if ($exists) {
            return back()->with('info', "Vous êtes déjà inscrit(e) à cette formation.");
        }

        FormationRegistration::create([
            'etudiant_id'   => $etudiant->id, // Changed from user_id
            'formation_id'  => $formation->id,
            'registered_at' => now(),
            // Remove status - automatically approved
        ]);

        return back()->with('success', "Inscription réussie ! Vous avez maintenant accès à tous les modules.");
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
