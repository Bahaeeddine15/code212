<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $user = Auth::guard('web')->user();

        // Get ALL certificates for user (generated AND not generated)
        $certificates = \App\Models\Certificate::where('student_id', $user->id)
            ->with(['formation:id,title'])
            ->orderBy('registered_date', 'desc')
            ->get()
            ->map(function ($certificate) {
                $formation = $certificate->formation;
                $isCompleted = false;

                // Check if formation is 100% completed
                if ($formation) {
                    $totalModules = $formation->modules()->count();
                    $completedModules = \App\Models\ModuleCompletion::where('etudiant_id', $certificate->student_id)
                        ->whereHas('module', function ($query) use ($formation) {
                            $query->where('formation_id', $formation->id);
                        })
                        ->count();

                    $isCompleted = $totalModules > 0 && $completedModules >= $totalModules;
                }

                return [
                    'id' => $certificate->id,
                    'code' => $certificate->code,
                    'formation_title' => $certificate->formation_title,
                    'formation_id' => $certificate->formation_id,
                    'registered_date' => $certificate->registered_date->toISOString(),
                    'issued_date' => $certificate->issued_date?->toISOString(),
                    'pdf_url' => $certificate->is_generated && $certificate->pdf_path ? route('certificates.download', $certificate->id) : null,
                    'preview_image' => $certificate->is_generated && $certificate->preview_image ? asset('storage/' . $certificate->preview_image) : null,
                    'student_name' => $certificate->student_name,
                    'verification_url' => $certificate->is_generated && $certificate->verification_code ? route('certificates.verify', $certificate->verification_code) : null,
                    'is_generated' => $certificate->is_generated,
                    'is_completed' => $isCompleted,
                ];
            });

        return Inertia::render('etudiant/Certificats', [
            'certificates' => $certificates,
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Verify certificate authenticity (public route)
     */
    public function verify($verificationCode)
    {
        $certificate = \App\Models\Certificate::where('verification_code', $verificationCode)
            ->where('is_generated', true)
            ->with(['student', 'formation'])
            ->first();

        if (!$certificate) {
            abort(404, 'Certificate not found or invalid verification code.');
        }

        return Inertia::render('etudiant/Certificats_verify', [
            'certificate' => [
                'code' => $certificate->code,
                'student_name' => $certificate->student_name,
                'formation_title' => $certificate->formation_title,
                'issued_date' => $certificate->issued_date->format('d/m/Y'),
                'verification_code' => $certificate->verification_code,
            ]
        ]);
    }

    /**
     * View certificate PDF in browser (with download option)
     */
    public function download(\App\Models\Certificate $certificate)
    {
        // Check if user owns this certificate
        if ($certificate->student_id !== Auth::id()) {
            abort(403, 'Unauthorized access to certificate.');
        }

        if (!$certificate->is_generated || !$certificate->pdf_path) {
            abort(404, 'Certificate not found or not generated yet.');
        }

        $filePath = storage_path('app/' . $certificate->pdf_path);

        if (!file_exists($filePath)) {
            abort(404, 'Certificate file not found.');
        }

        // Return the PDF to be displayed in browser instead of forcing download
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="certificate_' . $certificate->code . '.pdf"'
        ]);
    }
}
