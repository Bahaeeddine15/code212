import Navbar from '@/components/navigation/Navbar';
import FormationCard from '@/components/common/formation';
import { ReactNode } from 'react';

interface Formation {
  id: number;
  titre: string;
  description: string;
  niveau: number;
  photo: string;
}

interface Props {
  children: ReactNode;
  formations?: Formation[];
}

export default function Layoutformation({ children, formations = [] }: Props) {
  return (
    <div>
      <Navbar />
      <main className="p-6">{children}</main>
      
      {/* Grille de formations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {formations.map((formation) => (
          <div key={formation.id} style={{
            border: '2px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <FormationCard
              id={formation.id}
              titre={formation.titre}
              description={formation.description}
              category="Formation"
              niveau={formation.niveau}
              imageUrl={formation.photo ? 
                (formation.photo.startsWith('/') ? formation.photo : `/images/formations/${formation.photo}`) : 
                "https://via.placeholder.com/300x200/cccccc/ffffff?text=No+Image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
