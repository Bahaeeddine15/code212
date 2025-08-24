<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EtudiantControllerAdmin extends Controller
{
    public function index()
    {
        $etudiants = Etudiant::select('id', 'name', 'email', 'ecole')->get();
        return Inertia::render('settings_admin/etudiant', [
            'etudiants' => $etudiants,
        ]);
    }

    public function resetPassword(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->password = Hash::make('code212');
        $etudiant->save();

        return back()->with('success', 'Password reset to code212 for ' . $etudiant->name);
    }

    /**
     * Update student's school
     */
    public function updateSchool(Request $request, $etudiantId)
    {
        $request->validate([
            'ecole' => 'required|string|max:255',
        ]);

        try {
            $etudiant = \App\Models\Etudiant::findOrFail($etudiantId);
            $etudiant->update([
                'ecole' => $request->ecole
            ]);

            return back()->with('success', 'École mise à jour avec succès pour ' . $etudiant->name);
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de la mise à jour de l\'école.');
        }
    }
}
