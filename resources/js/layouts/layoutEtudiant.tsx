import Navbar from '@/components/Navbar';

import { ReactNode } from 'react';

export default function LayoutEtudiant({children}: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
