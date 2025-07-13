import { Link } from '@inertiajs/react';

interface FormationCardProps {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: number;
  photo?: string;
  imageUrl?: string;
}

export default function FormationCard({ 
  id, 
  titre, 
  description, 
  category, 
  niveau, 
  photo, 
  imageUrl 
}: FormationCardProps) {
  const finalImageUrl = photo || imageUrl || "https://via.placeholder.com/300x200";

  return (
    <Link 
      href={`/formations/${id}`} 
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-48">
        <img 
          src={finalImageUrl}
          alt={titre}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x200";
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            Niveau {niveau}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{titre}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-medium">🏆 Certification</span>
          <span className="text-blue-600 text-sm hover:underline">
            Voir détails →
          </span>
        </div>
      </div>
    </Link>
  );
}