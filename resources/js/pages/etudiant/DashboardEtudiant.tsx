import LayoutEtudiant from '@/layouts/layoutEtudiant';

export default function StudentDashboard() {
  return (
    <LayoutEtudiant>
      <h1 className="text-2xl font-bold mb-4">Welcome, Student!</h1>
      <p>This is your personalized dashboard.</p>
    </LayoutEtudiant>
  );
}
