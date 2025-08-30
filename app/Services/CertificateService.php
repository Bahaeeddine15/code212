<?php

namespace App\Services;

use App\Models\Certificate;
use App\Models\Etudiant;
use App\Models\Formation;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CertificateService
{
    /**
     * Generate a PDF certificate for a student
     */
    public function generateCertificate(Certificate $certificate)
    {
        try {
            // Get student and formation data
            $student = $certificate->student;
            $formation = $certificate->formation;

            if (!$student || !$formation) {
                throw new \Exception('Student or Formation not found');
            }

            // Prepare certificate data
            $certificateData = [
                'studentName' => $student->name,
                'formationTitle' => $formation->title,
                'certificateCode' => $certificate->code,
                'completionDate' => Carbon::now()->format('d/m/Y'),
                'duration' => $this->calculateFormationDuration($formation),
            ];

            // Generate the HTML from the Blade template
            $html = view('certificates.template', $certificateData)->render();

            // Generate unique filename
            $filename = 'certificate_' . $certificate->code . '_' . time() . '.pdf';
            $filepath = storage_path('app/certificates/' . $filename);

            // Generate PDF using Browsershot/Puppeteer
            Browsershot::html($html)
                ->format('A4')
                ->landscape()
                ->margins(0, 0, 0, 0)
                ->waitUntilNetworkIdle()
                ->setOption('args', [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--no-first-run',
                    '--disable-extensions',
                    '--disable-plugins',
                    '--disable-images'
                ])
                ->setOption('printBackground', true)
                ->scale(0.8)  // Scale down to ensure single page
                ->save($filepath);

            // Generate preview image
            $previewPath = $this->generatePreviewImage($html, $certificate->code);

            // Update certificate record
            $certificate->update([
                'pdf_path' => 'certificates/' . $filename,
                'preview_image' => $previewPath,
                'is_generated' => true,
                'issued_date' => Carbon::now(),
                'verification_code' => Str::random(32),
            ]);

            return [
                'success' => true,
                'pdf_path' => $filepath,
                'preview_path' => $previewPath,
                'message' => 'Certificate generated successfully!'
            ];
        } catch (\Exception $e) {
            \Log::error('Certificate generation failed: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => 'Certificate generation failed: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Generate preview image for certificate
     */
    private function generatePreviewImage($html, $certificateCode)
    {
        try {
            $previewFilename = 'preview_' . $certificateCode . '_' . time() . '.png';
            $previewPath = storage_path('app/certificate-previews/' . $previewFilename);

            Browsershot::html($html)
                ->setNodeBinary('/usr/local/bin/node')
                ->setNpmBinary('/usr/local/bin/npm')
                ->format('A4')
                ->landscape()
                ->margins(0, 0, 0, 0)
                ->waitUntilNetworkIdle()
                ->screenshot()
                ->save($previewPath);

            return 'certificate-previews/' . $previewFilename;
        } catch (\Exception $e) {
            \Log::error('Preview generation failed: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Calculate formation duration based on modules
     */
    private function calculateFormationDuration(Formation $formation)
    {
        // You can customize this logic based on your needs
        $moduleCount = $formation->modules()->count();
        $estimatedHours = $moduleCount * 5; // 5 hours per module estimate

        return $estimatedHours ?: 40; // Default to 40 hours
    }

    /**
     * Bulk generate certificates for multiple students
     */
    public function bulkGenerateCertificates(array $certificateIds)
    {
        $results = [];

        foreach ($certificateIds as $certificateId) {
            $certificate = Certificate::find($certificateId);

            if ($certificate) {
                $result = $this->generateCertificate($certificate);
                $results[] = [
                    'certificate_id' => $certificateId,
                    'student_name' => $certificate->student_name,
                    'result' => $result
                ];
            }
        }

        return $results;
    }

    /**
     * Check if certificate can be generated
     */
    public function canGenerateCertificate(Certificate $certificate)
    {
        // Check if student completed all modules
        $formation = $certificate->formation;

        if (!$formation) {
            return false;
        }

        $totalModules = $formation->modules()->count();
        $completedModules = \App\Models\ModuleCompletion::where('etudiant_id', $certificate->student_id)
            ->whereHas('module', function ($query) use ($formation) {
                $query->where('formation_id', $formation->id);
            })
            ->count();

        return $totalModules > 0 && $completedModules >= $totalModules;
    }
}
