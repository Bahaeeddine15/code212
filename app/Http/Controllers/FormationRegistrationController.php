<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;
use App\Models\FormationRegistration;

class FormationRegistrationController extends Controller
    {
        // Register current user for a formation
        public function store(Request $request, Formation $formation)
        {
            // Optional: only allow published
            if (isset($formation->status) && $formation->status !== 'published') {
                return back()->with('error', "Cette formation n'est pas encore publiée.");
            }

            $userId = $request->user()->id;     // 👈 current logged-in student
            

            // Prevent duplicates
            $exists = FormationRegistration::where([
                'user_id' => $userId,
                'formation_id' => $formation->id,
            ])->exists();

            if ($exists) {
                return back()->with('info', "Vous êtes déjà inscrit(e) à cette formation.");
            }

            FormationRegistration::create([
                'user_id'      => $userId,         // 👈 REQUIRED
                'formation_id' => $formation->id,
                'status'       => 'pending',
            ]);

            return back()->with('success', "Inscription enregistrée. En attente de validation.");
        }

        // Unregister (optional)
        public function destroy(Request $request, Formation $formation)
        {
            $userId = $request->user()->id;

            FormationRegistration::where('user_id',$userId)
                ->where('formation_id',$formation->id)
                ->delete();

            return back()->with('success', "Vous êtes désinscrit(e) de la formation.");
        }
}

