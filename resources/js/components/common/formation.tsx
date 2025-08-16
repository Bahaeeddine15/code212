import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; 

interface FormationCardProps {
  id: number;
  titre: string;
  description: string;
  category: string;
  niveau: string;
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
  imageUrl,
}: FormationCardProps) {
  // Build a robust image URL when only a filename is provided
  const raw = (photo || imageUrl || '').trim();
  const isAbsolute = raw.startsWith('http') || raw.startsWith('/') || raw.startsWith('data:');
  const preferred = raw ? (isAbsolute ? raw : `/images/formations/${raw}`) : '/images/formations/placeholder-300x200.png';
  const placeholder = '/images/formations/placeholder-300x200.png';

  return (
    <Link
      href={`/formations/${id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-[#1a1a1c]"
    >
      <div className="w-full h-48">
        <img
          src={preferred}
          alt={titre}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const current = e.currentTarget.getAttribute('src') || '';
            // If first attempt was /images/formations/<file> and failed, try /images/formation/<file>
            if (raw && !isAbsolute && current.includes('/images/formations/') && !current.includes('/images/formation/')) {
              e.currentTarget.src = `/images/formation/${raw}`;
              return;
            }
            e.currentTarget.src = placeholder;
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            Niveau: {niveau}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{titre}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{description}</p>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-1 text-green-600 font-medium">
        
            <span>Formation Certifiante</span>
          </div>

     
          <span className="text-sm font-medium text-blue-600 hover:underline">Voir détails →</span>
        </div>
      </div>
    </Link>
  );
}
