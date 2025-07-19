import { Head, Link } from '@inertiajs/react';


interface Formation {
    id: number;
    titre: string;
    description: string;
    category: string;
    niveau: number;
    photo?: string;
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    formation: Formation;
}

export default function Show({ formation }: ShowProps) {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "https://picsum.photos/800/400";
    };

    return (
        <>
            <Head title={`Formation - ${formation.titre}`} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Bouton retour */}
                    <div className="mb-6">
                        <Link 
                            href="/etudiant/dashboard"
                            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            ← Retour au Dashboard
                        </Link>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Image de la formation */}
                        <div className="w-full h-64 md:h-80">
                            <img 
                                src={formation.photo || "https://picsum.photos/800/400"}
                                alt={formation.titre}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        </div>
                        
                        {/* Contenu de la formation */}
                        <div className="p-6 md:p-8">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                    {formation.category}
                                </span>
                                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                                    🏆 Certification
                                </span>
                                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                                    📊 Niveau {formation.niveau}
                                </span>
                            </div>
                            
                            {/* Titre */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {formation.titre}
                            </h1>
                            
                            {/* Description */}
                            <div className="prose max-w-none mb-8">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {formation.description}
                                </p>
                            </div>
                            
                            {/* Informations supplémentaires */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Objectifs</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Maîtriser les concepts fondamentaux</li>
                                        <li>• Acquérir des compétences pratiques</li>
                                        <li>• Obtenir une certification reconnue</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">📋 Prérequis</h3>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>• Motivation et engagement</li>
                                        <li>• Accès à un ordinateur</li>
                                        <li>• Connexion internet stable</li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Boutons d'action */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                                    🚀 S'inscrire à cette formation
                                </button>
                                <button 
                                    onClick={() => window.history.back()}
                                    className="flex-1 px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    ← Retour à la liste
                                </button>
                            </div>
                            
                            {/* Informations de formation */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium">Durée:</span> 40h
                                    </div>
                                    <div>
                                        <span className="font-medium">Format:</span> En ligne
                                    </div>
                                    <div>
                                        <span className="font-medium">Langue:</span> Français
                                    </div>
                                    <div>
                                        <span className="font-medium">Support:</span> 24/7
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
