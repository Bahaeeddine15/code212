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
            return back()->with('error', 'Vous devez être connecté.');
        }

        $completion = ModuleCompletion::where('etudiant_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        if ($completion) {
            $completion->delete();
            $message = 'Module marqué comme non terminé';
        } else {
            ModuleCompletion::create([
                'etudiant_id' => $user->id,
                'module_id' => $module->id,
                'completed_at' => now(),
            ]);
            $message = 'Module marqué comme terminé';
        }

        return back()->with('success', $message);
    }
}
