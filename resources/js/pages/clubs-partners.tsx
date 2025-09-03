import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { MainFooter } from '@/components/main-footer';
import { useState } from 'react';
import {
    Users,
    Building2,
    Mail,
    ExternalLink,
    Send,
    Award,
    Gamepad2,
    Palette,
    Brain,
    Code2,
    Briefcase,
    GraduationCap,
    Heart,
    Star,
    Menu,
    X
} from 'lucide-react';
import Footer from '@/components/layout/footer';

// Define Club type locally since it's not exported from @/types
type Club = {
    id: number;
    name: string;
    logo?: string;
    school?: string;
};

export default function ClubsPartners() {
    const { auth, flash, clubs } = usePage<SharedData & { clubs?: Club[] }>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    // Form pour le partenariat
    const { 
        data: partenaireData, 
        setData: setPartenaireData, 
        post: postPartenaire, 
        processing: processingPartenaire, 
        reset: resetPartenaire,
        errors: partenaireErrors 
    } = useForm({
        nom_organisation: '',
        contact_principal: '',
        poste: '',
        email_professionnel: '',
        telephone: '',
        type_partenariat: '',
        secteur_activite: '',
        description_projet: '',
        site_web: '',
    });


    const handlePartenaireSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        postPartenaire('/partenaire', {
            onSuccess: (response) => {
                resetPartenaire();
            },
            onError: (errors) => {
                console.error('Erreurs de validation partenaire:', errors);
            },
            onFinish: () => {
            }
        });
    };

    // Form pour l'adhésion au club (modifié pour partenariat officiel)
    const {
        data: clubData,
        setData: setClubData,
        post: postClub,
        processing: processingClub,
        reset: resetClub,
        errors: clubErrors
    } = useForm({
        nom_organisation: '',
        contact_principal: '',
        email: '',
        telephone: '',
        description_projet: '',
    });

    const handleClubSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postClub('/club-adhesion', {
            onSuccess: () => {
                resetClub();
            },
            onError: (errors) => {
                console.error('Erreurs de validation club:', errors);
            },
            onFinish: () => {}
        });
    };

    return (
        <>
            <Head title="Clubs et Partenaires - Code212">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gray-900">
                {/* Header/Navigation */}
                <header className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16 sm:h-20">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <Link href="/" className="flex items-center">
                                    <img 
                                        src="/cd212.png" 
                                        alt="CODE212 Logo" 
                                        className="h-12 w-auto object-contain"
                                    />
                                </Link>
                            </div>

                            {/* Desktop Navigation Menu */}
                            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">ACCUEIL</Link>
                                <Link href="/nos-programmes" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">NOS PROGRAMMES</Link>
                                <Link href="/about" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">À PROPOS</Link>
                                <a href="#" className="text-pink-400 font-medium text-sm xl:text-base">CLUBS ET PARTENAIRES</a>
                                <Link href="/contact" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">CONTACT</Link>
                            </nav>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-white hover:text-pink-400 transition-colors p-2"
                                >
                                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>

                            {/* Auth Buttons */}
                            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-pink-600 text-white px-4 py-2 xl:px-6 xl:py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm xl:text-base"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-2 xl:space-x-3">
                                        <Link
                                            href={route('register')}
                                            className="text-white px-4 py-2 xl:px-6 xl:py-3 rounded-lg hover:bg-opacity-80 transition-colors font-medium text-sm xl:text-base"
                                            style={{ backgroundColor: '#A927B7' }}
                                        >
                                            SIGN UP
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="bg-blue-600 text-white px-4 py-2 xl:px-6 xl:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm xl:text-base"
                                        >
                                            LOGIN
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Mobile Navigation Menu */}
                        {mobileMenuOpen && (
                            <div className="lg:hidden bg-gray-800 border-t border-gray-700">
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                    <Link href="/" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">ACCUEIL</Link>
                                    <Link href="/nos-programmes" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">NOS PROGRAMMES</Link>
                                    <Link href="/about" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">À PROPOS</Link>
                                    <a href="#" className="block px-3 py-2 text-pink-400 bg-gray-700 rounded-md font-medium">CLUBS ET PARTENAIRES</a>
                                    <Link href="/contact" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">CONTACT</Link>
                                    
                                    {/* Mobile Auth Buttons */}
                                    <div className="pt-4 border-t border-gray-600">
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="block w-full bg-pink-600 text-white px-3 py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium text-center"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <div className="space-y-2">
                                                <Link
                                                    href={route('register')}
                                                    className="block w-full text-white px-3 py-2 rounded-lg hover:bg-opacity-80 transition-colors font-medium text-center"
                                                    style={{ backgroundColor: '#A927B7' }}
                                                >
                                                    SIGN UP
                                                </Link>
                                                <Link
                                                    href={route('login')}
                                                    className="block w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                                                >
                                                    LOGIN
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gray-900 py-16 sm:py-20 pt-16 sm:pt-20 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 left-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-20 h-20 bg-blue-500 rounded-full opacity-25"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="mb-6">
                            <span className="text-pink-400 text-lg font-mono">&gt; Rejoignez notre écosystème_</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            CLUBS ET <span className="text-pink-400">PARTENAIRES</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Découvrez notre écosystème dynamique de clubs étudiants passionnés et nos partenaires prestigieux 
                            qui enrichissent l'expérience éducative à Code212. Rejoignez une communauté qui transforme l'avenir du numérique.
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-pink-400 mb-2">6+</div>
                                <div className="text-gray-300 text-sm font-medium">Clubs Actifs</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">250+</div>
                                <div className="text-gray-300 text-sm font-medium">Membres</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                                <div className="text-gray-300 text-sm font-medium">Partenaires</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                                <div className="text-gray-300 text-sm font-medium">Événements/an</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clubs Section */}
                {clubs && clubs.length > 0 && (
                    <section id="clubs" className="py-20 bg-gray-50 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-lg">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Clubs Étudiants</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Découvrez les clubs étudiants partenaires de Code212.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {clubs.map((club) => (
                                    <div key={club.id} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col items-center">
                                        {club.logo && (
                                            <img
                                                src={club.logo.startsWith('http') ? club.logo : `/storage/${club.logo}`}
                                                alt={club.name}
                                                className="w-24 h-24 object-contain mb-4 rounded-full bg-gray-100"
                                            />
                                        )}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                                        <div className="text-gray-500 text-sm mb-2">{club.school}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Partners Section */}
                <section id="partners" className="py-20 bg-gray-900 relative">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-40 left-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
                        <div className="absolute bottom-40 right-20 w-32 h-32 bg-green-500 rounded-full opacity-10 blur-xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-6">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nos Partenaires</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Un réseau de partenaires prestigieux et innovants qui enrichissent votre formation 
                                et ouvrent des opportunités exceptionnelles pour votre avenir professionnel.
                            </p>
                        </div>
                        {/* Industry Partners */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <Building2 className="w-8 h-8 text-green-400 mr-3" />
                                Partenaires Industriels
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Huawei */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/huawei-logo.png" alt="Huawei" className="w-32 h-32 object-contain mb-4 mx-auto" />
                                </div>
                                {/* Oracle */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/oracle-logo.png" alt="Oracle" className="w-32 h-32 object-contain mb-4 mx-auto" />
                                </div>
                                {/* Cisco */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/cisco-logo.png" alt="Cisco" className="w-32 h-32 object-contain mb-4 mx-auto" />
                                </div>
                                {/* Fortinet */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/fortinet-logo.png" alt="Fortinet" className="w-40 h-40 object-contain mb-4 mx-auto" />
                                </div>
                                {/* Leyton */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/leyton-logo.png" alt="Leyton" className="w-32 h-32 object-contain mb-4 mx-auto" />
                                </div>
                                {/* DXC Technology */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/dxc-logo.png" alt="DXC Technology" className="w-40 h-40 object-contain mb-4 mx-auto" />
                                </div>
                                {/* CDG */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/cdg-logo.png" alt="CDG" className="w-32 h-32 object-contain mb-4 mx-auto" />
                                </div>
                                {/* NearSecure */}
                                <div className="bg-white rounded-lg p-8 hover:bg-gray-50 transition-colors shadow-lg flex flex-col items-center justify-center">
                                    <img src="/images/nearsecure-logo.png" alt="NearSecure" className="w-40 h-40 object-contain mb-4 mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partnership/Membership Forms Section */}
                <section id="forms" className="py-20 bg-gray-800 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-xl"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                            }}></div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mb-6">
                                <Send className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Rejoignez Notre Écosystème</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Devenez partenaire ou rejoignez nos clubs pour une expérience enrichissante 
                                qui transformera votre parcours académique et professionnel.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Partnership Form */}
                            <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
                                {/* Messages Flash pour le formulaire de partenariat */}
                                {flash?.partenaire_success && (
                                    <div className="mb-6 p-4 bg-green-600 text-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium">{flash.partenaire_success}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {((flash?.partenaire_error) || (partenaireErrors && Object.keys(partenaireErrors).length > 0)) && (
                                    <div className="mb-6 p-4 bg-red-600 text-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                {flash?.partenaire_error && (
                                                    <p className="text-sm font-medium">{flash.partenaire_error}</p>
                                                )}
                                                {partenaireErrors && Object.keys(partenaireErrors).length > 0 && (
                                                    <div>
                                                        <p className="text-sm font-medium mb-2">Erreurs de validation :</p>
                                                        <ul className="text-sm space-y-1">
                                                            {Object.entries(partenaireErrors).map(([field, error]) => (
                                                                <li key={field}>• {Array.isArray(error) ? error[0] : error}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center mb-6">
                                    <Building2 className="w-8 h-8 text-blue-400 mr-4" />
                                    <h3 className="text-2xl font-bold text-white">Formulaire de Partenariat</h3>
                                </div>

                                <form onSubmit={handlePartenaireSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Nom de l'organisation</label>
                                        <input
                                            type="text"
                                            value={partenaireData.nom_organisation}
                                            onChange={(e) => setPartenaireData('nom_organisation', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="Nom de votre entreprise/institution"
                                            required
                                        />
                                        {partenaireErrors.nom_organisation && <p className="text-red-400 text-sm mt-1">{partenaireErrors.nom_organisation}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Contact principal</label>
                                            <input
                                                type="text"
                                                value={partenaireData.contact_principal}
                                                onChange={(e) => setPartenaireData('contact_principal', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Nom du responsable"
                                                required
                                            />
                                            {partenaireErrors.contact_principal && <p className="text-red-400 text-sm mt-1">{partenaireErrors.contact_principal}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Poste</label>
                                            <input
                                                type="text"
                                                value={partenaireData.poste}
                                                onChange={(e) => setPartenaireData('poste', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Fonction du contact (CEO, DRH, Directeur...)"
                                                required
                                            />
                                            {partenaireErrors.poste && <p className="text-red-400 text-sm mt-1">{partenaireErrors.poste}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Email professionnel</label>
                                            <input
                                                type="email"
                                                value={partenaireData.email_professionnel}
                                                onChange={(e) => setPartenaireData('email_professionnel', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="contact@entreprise.com"
                                                required
                                            />
                                            {partenaireErrors.email_professionnel && <p className="text-red-400 text-sm mt-1">{partenaireErrors.email_professionnel}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Téléphone</label>
                                            <input
                                                type="tel"
                                                value={partenaireData.telephone}
                                                onChange={(e) => setPartenaireData('telephone', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="+212 5XX XXX XXX"
                                                required
                                            />
                                            {partenaireErrors.telephone && <p className="text-red-400 text-sm mt-1">{partenaireErrors.telephone}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Type de partenariat</label>
                                        <select 
                                            value={partenaireData.type_partenariat}
                                            onChange={(e) => setPartenaireData('type_partenariat', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            required
                                        >
                                            <option value="">Sélectionnez le type</option>
                                            <option value="Partenariat Académique">Partenariat Académique</option>
                                            <option value="Partenariat Industriel">Partenariat Industriel</option>
                                            <option value="Offres de stage">Offres de stage</option>
                                            <option value="Recrutement">Recrutement</option>
                                            <option value="Sponsoring d'événements">Sponsoring d'événements</option>
                                            <option value="Formations spécialisées">Formations spécialisées</option>
                                            <option value="Innovation & R&D">Innovation & R&D</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                        {partenaireErrors.type_partenariat && <p className="text-red-400 text-sm mt-1">{partenaireErrors.type_partenariat}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Secteur d'activité</label>
                                        <input
                                            type="text"
                                            value={partenaireData.secteur_activite}
                                            onChange={(e) => setPartenaireData('secteur_activite', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="IT, Finance, Industrie, Santé, E-commerce..."
                                            required
                                        />
                                        {partenaireErrors.secteur_activite && <p className="text-red-400 text-sm mt-1">{partenaireErrors.secteur_activite}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Description du projet de partenariat</label>
                                        <textarea
                                            value={partenaireData.description_projet}
                                            onChange={(e) => setPartenaireData('description_projet', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            rows={4}
                                            placeholder="Décrivez votre projet de partenariat, vos objectifs, ce que vous proposez et ce que vous attendez de la collaboration avec CODE212..."
                                            required
                                        />
                                        {partenaireErrors.description_projet && <p className="text-red-400 text-sm mt-1">{partenaireErrors.description_projet}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Site web (optionnel)</label>
                                        <input
                                            type="url"
                                            value={partenaireData.site_web}
                                            onChange={(e) => setPartenaireData('site_web', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="https://www.votre-entreprise.com"
                                        />
                                        {partenaireErrors.site_web && <p className="text-red-400 text-sm mt-1">{partenaireErrors.site_web}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processingPartenaire}
                                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {processingPartenaire ? 'Envoi en cours...' : 'Envoyer la demande de partenariat'}
                                    </button>
                                </form>
                            </div>
                            {/* Club Membership Form (modifié pour partenariat officiel) */}
                            <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
                                {/* Messages Flash pour le formulaire club partenaire */}
                                {flash?.club_success && (
                                    <div className="mb-6 p-4 bg-green-600 text-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium">{flash.club_success}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {((flash?.club_error) || (clubErrors && Object.keys(clubErrors).length > 0)) && (
                                    <div className="mb-6 p-4 bg-red-600 text-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                {flash?.club_error && (
                                                    <p className="text-sm font-medium">{flash.club_error}</p>
                                                )}
                                                {clubErrors && Object.keys(clubErrors).length > 0 && (
                                                    <div>
                                                        <p className="text-sm font-medium mb-2">Erreurs de validation :</p>
                                                        <ul className="text-sm space-y-1">
                                                            {Object.entries(clubErrors).map(([field, error]) => (
                                                                <li key={field}>• {Array.isArray(error) ? error[0] : error}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center mb-6">
                                    <Users className="w-8 h-8 text-pink-400 mr-4" />
                                    <h3 className="text-2xl font-bold text-white">Votre club souhaite devenir partenaire de Code212 ?</h3>
                                </div>

                                <form onSubmit={handleClubSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Nom du club</label>
                                        <input
                                            type="text"
                                            value={clubData.nom_organisation}
                                            onChange={(e) => setClubData('nom_organisation', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="Nom de votre club"
                                            required
                                        />
                                        {clubErrors.nom_organisation && <p className="text-red-400 text-sm mt-1">{clubErrors.nom_organisation}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">Nom du responsable</label>
                                        <input
                                            type="text"
                                            value={clubData.contact_principal}
                                            onChange={(e) => setClubData('contact_principal', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="Nom du responsable du club"
                                            required
                                        />
                                        {clubErrors.contact_principal && <p className="text-red-400 text-sm mt-1">{clubErrors.contact_principal}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">Email de contact</label>
                                        <input
                                            type="email"
                                            value={clubData.email}
                                            onChange={(e) => setClubData('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="contact@club.com"
                                            required
                                        />
                                        {clubErrors.email && <p className="text-red-400 text-sm mt-1">{clubErrors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            value={clubData.telephone}
                                            onChange={(e) => setClubData('telephone', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="+212 6XX XXX XXX"
                                            required
                                        />
                                        {clubErrors.telephone && <p className="text-red-400 text-sm mt-1">{clubErrors.telephone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white font-medium mb-2">Pourquoi souhaitez-vous devenir partenaire de Code212 ?</label>
                                        <textarea
                                            value={clubData.description_projet}
                                            onChange={(e) => setClubData('description_projet', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            rows={4}
                                            placeholder="Expliquez votre motivation, vos attentes et ce que votre club souhaite apporter à Code212."
                                            required
                                        />
                                        {clubErrors.description_projet && <p className="text-red-400 text-sm mt-1">{clubErrors.description_projet}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processingClub}
                                        className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {processingClub ? 'Envoi en cours...' : "Envoyer la demande club partenaire"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
