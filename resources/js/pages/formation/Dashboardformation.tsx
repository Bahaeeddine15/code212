import Layoutformation from '@/layouts/layoutformation';
import { Head } from '@inertiajs/react';
import FormationCard from '../../components/formation';

interface Formation {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: number;
  photo: string;
  created_at: string;
  updated_at: string;
}

interface DashboardProps {
  formations: Formation[];
}

export default function Dashboardformation({ formations }: DashboardProps) {
  return (
    <Layoutformation formations={formations}>
      <Head title="Dashboard Formation" />
      
      <div style={{ padding: '20px' }}>
        <h1>Welcome, Student!</h1>
        <p>This is your formation liste.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          {formations && formations.map((formation) => (
            <FormationCard
              key={formation.id}
              id={formation.id}
              titre={formation.titre}
              description={formation.description}
              category={formation.category}
              niveau={formation.niveau}
              photo={formation.photo}
            />
          ))}
        </div>
      </div>
    </Layoutformation>
  );
}
