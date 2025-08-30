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

export default function ClubsPartners() {
    const { auth, flash } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Form pour l'adhésion aux clubs
    const { data, setData, post, processing, reset, errors: clubErrors } = useForm({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        club_interesse: '',
        niveau_etude: '',
        motivation: '',
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/club-adhesion', {
            onSuccess: (response) => {
                reset();
            },
            onError: (errors) => {
                console.error('Erreurs de validation club:', errors);
            },
            onFinish: () => {
            }
        });
    };

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
                                <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">HOME</Link>
                                <Link href="/our-programs" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">OUR PROGRAMS</Link>
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
                                    <Link href="/" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">HOME</Link>
                                    <Link href="/our-programs" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">OUR PROGRAMS</Link>
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
                                Des communautés dynamiques pour développer vos passions, compétences et créer des liens durables 
                                avec des étudiants partageant les mêmes intérêts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Club IA */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Brain className="w-12 h-12 text-purple-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club IA</h3>
                                        <p className="text-purple-500 font-medium">Intelligence Artificielle</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Explorez l'univers de l'intelligence artificielle, du machine learning et du deep learning. 
                                    Participez à des projets innovants et des compétitions.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">45+ membres</span>
                                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Club E-Sport */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Gamepad2 className="w-12 h-12 text-green-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club E-Sport</h3>
                                        <p className="text-green-500 font-medium">Gaming & Compétition</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Rejoignez notre équipe e-sport et participez aux tournois nationaux et internationaux. 
                                    Développement de jeux vidéo et streaming inclus.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">60+ membres</span>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Club Infographie */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Palette className="w-12 h-12 text-pink-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club Infographie</h3>
                                        <p className="text-pink-500 font-medium">Design & Créativité</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Libérez votre créativité avec le design graphique, l'animation 3D, l'UI/UX design 
                                    et la création de contenu visuel.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">35+ membres</span>
                                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Club Development */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Code2 className="w-12 h-12 text-blue-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club Dev</h3>
                                        <p className="text-blue-500 font-medium">Développement Web & Mobile</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Maîtrisez les dernières technologies de développement. Hackathons, projets open-source 
                                    et workshops techniques au programme.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">80+ membres</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Club Entrepreneuriat */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Briefcase className="w-12 h-12 text-yellow-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club Entrepreneur</h3>
                                        <p className="text-yellow-500 font-medium">Business & Innovation</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Développez votre esprit entrepreneurial. Création de startups, business plan, 
                                    pitching et networking avec des professionnels.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">25+ membres</span>
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Club Social */}
                            <div className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <Heart className="w-12 h-12 text-red-500 mr-4" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Club Social</h3>
                                        <p className="text-red-500 font-medium">Communauté & Solidarité</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Actions solidaires, événements communautaires et initiatives sociales. 
                                    Construisons ensemble un impact positif.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">50+ membres</span>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center shadow-md">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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

                        {/* Academic Partners */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <GraduationCap className="w-8 h-8 text-blue-400 mr-3" />
                                Partenaires Académiques
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-lg p-6 text-center hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-2">Université Mohammed VI</h4>
                                    <p className="text-gray-600 text-sm">Partenariat recherche et développement</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 text-center hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-2">ENSAM Casablanca</h4>
                                    <p className="text-gray-600 text-sm">Échanges étudiants et projets</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 text-center hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-2">42 School</h4>
                                    <p className="text-gray-600 text-sm">Méthodologie pédagogique innovante</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 text-center hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-2">ISCAE</h4>
                                    <p className="text-gray-600 text-sm">Formation en entrepreneuriat</p>
                                </div>
                            </div>
                        </div>

                        {/* Industry Partners */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <Building2 className="w-8 h-8 text-green-400 mr-3" />
                                Partenaires Industriels
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">Microsoft</h4>
                                            <p className="text-blue-500 text-sm font-medium">Technology Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        Certifications Azure, licences Office 365 et accès aux technologies cloud
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Partenaire Premium</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-orange-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">Amazon Web Services</h4>
                                            <p className="text-orange-500 text-sm font-medium">Cloud Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        Crédits AWS, formations certifiantes et accès aux services cloud
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Partenaire Éducation</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-purple-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">Google for Education</h4>
                                            <p className="text-purple-500 text-sm font-medium">Education Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        Google Workspace, crédits Google Cloud et programmes de certification
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Partenaire Officiel</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-red-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">Oracle Academy</h4>
                                            <p className="text-red-500 text-sm font-medium">Database Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        Formations bases de données, certifications Oracle et licences gratuites
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Académie Certifiée</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">NVIDIA</h4>
                                            <p className="text-green-500 text-sm font-medium">AI Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        Accès aux GPUs pour l'IA, formations deep learning et certifications
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Partenaire IA</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-indigo-500 rounded-lg mr-4 flex items-center justify-center shadow-md">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-bold">GitHub</h4>
                                            <p className="text-indigo-500 text-sm font-medium">Development Partner</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        GitHub Education Pack, comptes premium et outils de développement
                                    </p>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-gray-600 text-sm">Campus Program</span>
                                    </div>
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
                            {/* Club Membership Form */}
                            <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
                                {/* Messages Flash pour le formulaire d'adhésion */}
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
                                    <h3 className="text-2xl font-bold text-white">Adhésion aux Clubs</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Prénom</label>
                                            <input
                                                type="text"
                                                value={data.prenom}
                                                onChange={(e) => setData('prenom', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                                placeholder="Votre prénom"
                                                required
                                            />
                                            {clubErrors.prenom && <p className="text-red-400 text-sm mt-1">{clubErrors.prenom}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Nom</label>
                                            <input
                                                type="text"
                                                value={data.nom}
                                                onChange={(e) => setData('nom', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                                placeholder="Votre nom"
                                                required
                                            />
                                            {clubErrors.nom && <p className="text-red-400 text-sm mt-1">{clubErrors.nom}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="votre.email@exemple.com"
                                            required
                                        />
                                        {clubErrors.email && <p className="text-red-400 text-sm mt-1">{clubErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            value={data.telephone}
                                            onChange={(e) => setData('telephone', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="+212 6XX XXX XXX"
                                            required
                                        />
                                        {clubErrors.telephone && <p className="text-red-400 text-sm mt-1">{clubErrors.telephone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Club d'intérêt</label>
                                        <select 
                                            value={data.club_interesse}
                                            onChange={(e) => setData('club_interesse', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            required
                                        >
                                            <option value="">Sélectionnez un club</option>
                                            <option value="Club IA">Club IA - Intelligence Artificielle</option>
                                            <option value="Club E-Sport">Club E-Sport - Gaming & Compétition</option>
                                            <option value="Club Infographie">Club Infographie - Design & Créativité</option>
                                            <option value="Club Dev">Club Dev - Développement Web & Mobile</option>
                                            <option value="Club Entrepreneur">Club Entrepreneur - Business & Innovation</option>
                                            <option value="Club Social">Club Social - Communauté & Solidarité</option>
                                        </select>
                                        {clubErrors.club_interesse && <p className="text-red-400 text-sm mt-1">{clubErrors.club_interesse}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Niveau d'étude</label>
                                        <select 
                                            value={data.niveau_etude}
                                            onChange={(e) => setData('niveau_etude', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            required
                                        >
                                            <option value="">Sélectionnez votre niveau</option>
                                            <option value="Baccalauréat">Baccalauréat</option>
                                            <option value="Bac+1">Bac+1</option>
                                            <option value="Bac+2">Bac+2</option>
                                            <option value="Bac+3">Bac+3 (Licence)</option>
                                            <option value="Bac+4">Bac+4 (Master 1)</option>
                                            <option value="Bac+5 et plus">Bac+5 et plus (Master 2, Doctorat)</option>
                                        </select>
                                        {clubErrors.niveau_etude && <p className="text-red-400 text-sm mt-1">{clubErrors.niveau_etude}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Motivation</label>
                                        <textarea
                                            value={data.motivation}
                                            onChange={(e) => setData('motivation', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            rows={4}
                                            placeholder="Expliquez votre motivation à rejoindre ce club, vos objectifs, vos compétences ou expériences pertinentes..."
                                            required
                                        />
                                        {clubErrors.motivation && <p className="text-red-400 text-sm mt-1">{clubErrors.motivation}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {processing ? 'Envoi en cours...' : 'Envoyer ma demande d\'adhésion'}
                                    </button>
                                </form>
                            </div>

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
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
