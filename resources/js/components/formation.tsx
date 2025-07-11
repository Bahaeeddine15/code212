import { ReactNode, useState } from 'react';

interface FormationCardProps {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: number;
  photo?: string;
  imageUrl?: string; // pour la compatibilité avec l'autre usage
}

export default function FormationCard({ 
  id,
  titre, 
  description,
  category, 
  niveau, 
  photo = "https://picsum.photos/300/200",
  imageUrl
}: FormationCardProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl || photo);

  const handleImageError = () => {
    // Fallback to Picsum if local image fails
    setImgSrc("https://picsum.photos/300/200");
  };

  return (
    <div className="p-4">
      <img 
        src={imgSrc}
        alt="Formation image" 
        width="300" 
        height="200" 
        style={{ 
          objectFit: 'cover',
          borderRadius: '4px',
          backgroundColor: '#e9ecef',
          border: '1px solid #dee2e6',
          width: '100%',
          height: '200px'
        }}
        onError={handleImageError}
      />
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 mb-2">
          <strong>🏆 CERTIFICATE</strong> | <strong>📊 Niveau {niveau}</strong>
        </p>
        
        <p className="text-sm text-blue-600 font-medium mb-2">
          <em>{category}</em>
        </p>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{titre}</h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="mt-4 flex gap-2">
          
          <button 
            onClick={() => window.location.href = `/etudiant/dashboard/formation/${id}`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}