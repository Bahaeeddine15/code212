import { ReactNode } from 'react';

export default function LayoutEtudiant({children}: { children: ReactNode }) {
  return (
    <div>
      <main className="p-6">{children}</main>
    </div>
  );
}
