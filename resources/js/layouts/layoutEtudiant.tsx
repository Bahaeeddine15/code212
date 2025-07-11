import { ReactNode } from 'react';

interface LayoutEtudiantProps {
  children: ReactNode;
}

export default function LayoutEtudiant({ children }: LayoutEtudiantProps) {
  return (
    <div>
      <main className="p-6">{children}</main>
    </div>
  );
}
