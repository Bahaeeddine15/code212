import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                                <Link href="/" className="text-white text-xl sm:text-2xl font-bold">
                                    C<span className="text-pink-500">O</span>DE<span className="text-pink-500">'212'</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation Menu */}
                            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">HOME</Link>
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">OUR PROGRAMS</a>
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
                                    <a href="#" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">OUR PROGRAMS</a>
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
                                <div className="flex items-center mb-6">
                                    <Users className="w-8 h-8 text-pink-400 mr-4" />
                                    <h3 className="text-2xl font-bold text-white">Adhésion aux Clubs</h3>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Prénom</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Nom</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="votre.email@exemple.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            placeholder="+212 6XX XXX XXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Club d'intérêt</label>
                                        <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none">
                                            <option value="">Sélectionnez un club</option>
                                            <option value="ia">Club IA</option>
                                            <option value="esport">Club E-Sport</option>
                                            <option value="infographie">Club Infographie</option>
                                            <option value="dev">Club Dev</option>
                                            <option value="entrepreneur">Club Entrepreneur</option>
                                            <option value="social">Club Social</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Niveau d'étude</label>
                                        <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none">
                                            <option value="">Sélectionnez votre niveau</option>
                                            <option value="bac">Baccalauréat</option>
                                            <option value="bac+1">Bac+1</option>
                                            <option value="bac+2">Bac+2</option>
                                            <option value="bac+3">Bac+3</option>
                                            <option value="bac+4">Bac+4</option>
                                            <option value="bac+5">Bac+5 et plus</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Motivation</label>
                                        <textarea
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none"
                                            rows={4}
                                            placeholder="Expliquez votre motivation à rejoindre ce club..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Envoyer ma demande d'adhésion
                                    </button>
                                </form>
                            </div>

                            {/* Partnership Form */}
                            <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <Building2 className="w-8 h-8 text-blue-400 mr-4" />
                                    <h3 className="text-2xl font-bold text-white">Formulaire de Partenariat</h3>
                                </div>

                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-white font-medium mb-2">Nom de l'organisation</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="Nom de votre entreprise/institution"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Contact principal</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Nom du responsable"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Poste</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Fonction du contact"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white font-medium mb-2">Email professionnel</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="contact@entreprise.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-medium mb-2">Téléphone</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="+212 5XX XXX XXX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Type de partenariat</label>
                                        <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none">
                                            <option value="">Sélectionnez le type</option>
                                            <option value="academique">Partenariat Académique</option>
                                            <option value="industriel">Partenariat Industriel</option>
                                            <option value="stage">Offres de stage</option>
                                            <option value="emploi">Recrutement</option>
                                            <option value="sponsoring">Sponsoring d'événements</option>
                                            <option value="formation">Formations spécialisées</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Secteur d'activité</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="IT, Finance, Industrie, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Description du projet de partenariat</label>
                                        <textarea
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            rows={4}
                                            placeholder="Décrivez votre projet de partenariat, vos objectifs et ce que vous proposez..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-white font-medium mb-2">Site web (optionnel)</label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="https://www.votre-entreprise.com"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Envoyer la demande de partenariat
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
