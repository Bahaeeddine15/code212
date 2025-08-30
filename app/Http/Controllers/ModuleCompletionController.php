<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\ModuleCompletion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModuleCompletionController extends Controller
{
    public function toggle(Module $module)
    {
        $user = Auth::guard('web')->user();

        if (!$user) {
            return back()->withErrors(['error' => 'Vous devez être connecté.']);
        }

        // ADD: Check if user is registered for this formation
        $isRegistered = \App\Models\FormationRegistration::where('formation_id', $module->formation_id)
            ->where('etudiant_id', $user->id)
            ->exists();

        if (!$isRegistered) {
            return back()->withErrors(['error' => 'Vous devez être inscrit à cette formation.']);
        }

        $completion = ModuleCompletion::where('etudiant_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        if ($completion) {
            $completion->delete();
            $message = 'Module marqué comme non terminé';
            $completed = false;
        } else {
            ModuleCompletion::create([
                'etudiant_id' => $user->id,
                'module_id' => $module->id,
                'completed_at' => now(),
            ]);
            $message = 'Module marqué comme terminé';
            $completed = true;
        }

        // ADD: Return with completion status
        return back()->with([
            'success' => $message,
            'module_completion' => [
                'module_id' => $module->id,
                'completed' => $completed
            ]
        ]);
    }
}
