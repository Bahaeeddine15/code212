<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Etudiant;
use App\Models\Formation;

class CertificateAdminController extends Controller
{
    protected $certificateService;

    public function __construct(CertificateService $certificateService)
    {
        $this->certificateService = $certificateService;
    }

    /**
     * Display certificates management page
     */
    public function index(Request $request)
    {
        $query = Certificate::with(['student', 'formation']);

        // Filter by formation if specified
        if ($request->has('formation_id') && $request->formation_id) {
            $query->where('formation_id', $request->formation_id);
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'generated') {
                $query->where('is_generated', true);
            } elseif ($request->status === 'pending') {
                $query->where('is_generated', false);
            }
        }

        $certificates = $query->orderBy('registered_date', 'desc')->paginate(20);

        // Transform data for frontend
        $certificatesData = $certificates->through(function ($certificate) {
            $canGenerate = $this->certificateService->canGenerateCertificate($certificate);

            return [
                'id' => $certificate->id,
                'code' => $certificate->code,
                'student_name' => $certificate->student_name,
                'student_email' => $certificate->student->email ?? 'N/A',
                'formation_title' => $certificate->formation_title,
                'registered_date' => $certificate->registered_date->format('d/m/Y'),
                'issued_date' => $certificate->issued_date?->format('d/m/Y'),
                'is_generated' => $certificate->is_generated,
                'can_generate' => $canGenerate,
                'pdf_url' => $certificate->is_generated && $certificate->pdf_path
                    ? asset('storage/' . $certificate->pdf_path) : null,
                'verification_code' => $certificate->verification_code,
            ];
        });

        // Get formations for filter dropdown
        $formations = Formation::select('id', 'title')->get();

        return Inertia::render('dashboard_admin/Certificates', [
            'certificates' => $certificatesData,
            'formations' => $formations,
            'filters' => [
                'formation_id' => $request->formation_id,
                'status' => $request->status,
            ]
        ]);
    }

    /**
     * Generate a single certificate
     */
    public function generate(Certificate $certificate)
    {
        // Check if certificate can be generated
        if (!$this->certificateService->canGenerateCertificate($certificate)) {
            return back()->withErrors([
                'error' => 'Cannot generate certificate. Student has not completed all modules.'
            ]);
        }

        // Generate the certificate
        $result = $this->certificateService->generateCertificate($certificate);

        if ($result['success']) {
            return back()->with('success', 'Certificate generated successfully!');
        } else {
            return back()->withErrors(['error' => $result['message']]);
        }
    }

    /**
     * Bulk generate certificates
     */
    public function bulkGenerate(Request $request)
    {
        $request->validate([
            'certificate_ids' => 'required|array',
            'certificate_ids.*' => 'exists:certificates,id'
        ]);

        $results = $this->certificateService->bulkGenerateCertificates($request->certificate_ids);

        $successCount = collect($results)->where('result.success', true)->count();
        $totalCount = count($results);

        if ($successCount === $totalCount) {
            return back()->with('success', "All {$totalCount} certificates generated successfully!");
        } else {
            $failCount = $totalCount - $successCount;
            return back()->with('warning', "{$successCount} certificates generated successfully, {$failCount} failed.");
        }
    }

    /**
     * Download certificate PDF
     */
    public function download(Certificate $certificate)
    {
        if (!$certificate->is_generated || !$certificate->pdf_path) {
            abort(404, 'Certificate not found or not generated yet.');
        }

        $filePath = storage_path('app/' . $certificate->pdf_path);

        if (!file_exists($filePath)) {
            abort(404, 'Certificate file not found.');
        }

        return response()->download($filePath, "certificate_{$certificate->code}.pdf");
    }

    /**
     * Show statistics
     */
    public function statistics()
    {
        $stats = [
            'total_certificates' => Certificate::count(),
            'generated_certificates' => Certificate::where('is_generated', true)->count(),
            'pending_certificates' => Certificate::where('is_generated', false)->count(),
            'certificates_this_month' => Certificate::whereMonth('created_at', now()->month)->count(),
            'top_formations' => Certificate::selectRaw('formation_title, COUNT(*) as count')
                ->groupBy('formation_title')
                ->orderBy('count', 'desc')
                ->take(5)
                ->get(),
        ];

        return response()->json($stats);
    }

    /**
     * Delete certificate (admin only)
     */
    public function destroy(Certificate $certificate)
    {
        // Delete PDF and preview files if they exist
        if ($certificate->pdf_path) {
            $pdfPath = storage_path('app/' . $certificate->pdf_path);
            if (file_exists($pdfPath)) {
                unlink($pdfPath);
            }
        }

        if ($certificate->preview_image) {
            $previewPath = storage_path('app/' . $certificate->preview_image);
            if (file_exists($previewPath)) {
                unlink($previewPath);
            }
        }

        $certificate->delete();

        return back()->with('success', 'Certificate deleted successfully.');
    }

    /**
     * Generate certificate for a specific student and formation
     */
    public function generateForStudent(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:etudiant,id',
            'formation_id' => 'required|exists:formations,id'
        ]);

        // Find or create certificate record
        $certificate = Certificate::where('student_id', $request->student_id)
            ->where('formation_id', $request->formation_id)
            ->first();

        if (!$certificate) {
            // Create certificate if it doesn't exist
            $student = Etudiant::find($request->student_id);
            $formation = Formation::find($request->formation_id);

            $certificate = Certificate::create([
                'code' => 'CERT-' . date('Y') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT),
                'student_id' => $student->id,
                'formation_id' => $formation->id,
                'student_name' => $student->name,
                'formation_title' => $formation->title,
                'registered_date' => now(),
                'is_generated' => false,
            ]);
        }

        // Check if certificate can be generated
        if (!$this->certificateService->canGenerateCertificate($certificate)) {
            return back()->withErrors([
                'error' => 'Cannot generate certificate. Student has not completed all modules.'
            ]);
        }

        // Generate the certificate
        $result = $this->certificateService->generateCertificate($certificate);

        if ($result['success']) {
            return back()->with('success', 'Certificate generated successfully!');
        } else {
            return back()->withErrors(['error' => $result['message']]);
        }
    }
}
