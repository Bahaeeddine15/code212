import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Compteur animé pour les statistiques
import { useEffect, useState } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    className?: string;
}

function CountUp({ end, duration = 2, className = "" }: CountUpProps) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const increment = end / (duration * 60);8
        const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(0);
                start = 0;
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(interval);
    }, [end, duration]);
    return <span className={className}>{count.toLocaleString()}+</span>;
}
import { MainFooter } from '@/components/main-footer';
import {
    Code2,
    Users,
    Award,
    BookOpen,
    Cpu,
    Globe,
    ChevronRight,
    Play,
    Calendar,
    MapPin,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Code212 - Center of Digital Empowerment">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
                <link rel="stylesheet" href="/css/animations.css" />
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
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">HOME</a>
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">OUR PROGRAMS</a>
                                <Link href="/about" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">À PROPOS</Link>
                                <Link href="/clubs-partners" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">CLUBS ET PARTENAIRES</Link>
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
                                    <a href="#" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">HOME</a>
                                    <a href="#" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">OUR PROGRAMS</a>
                                    <Link href="/about" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">À PROPOS</Link>
                                    <Link href="/clubs-partners" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">CLUBS ET PARTENAIRES</Link>
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
                <section className="bg-gray-900 relative overflow-hidden min-h-screen flex items-center pt-16 sm:pt-20">
                    {/* Background Geometric Elements */}
                    <div className="absolute inset-0">
                        {/* Gradient circles and shapes */}
                        <div className="absolute top-20 right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 right-40 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-blue-500 rounded-full opacity-25"></div>
                        <div className="absolute bottom-20 right-60 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-500 rounded-full opacity-30"></div>
                        <div className="absolute top-60 right-80 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-yellow-500 rounded-full opacity-40"></div>

                        {/* Geometric lines/polygons */}
                        <div className="absolute top-32 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 opacity-20">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                <polygon points="100,50 300,80 250,200 150,180" fill="url(#gradient1)" stroke="#ec4899" strokeWidth="2"/>
                                <polygon points="200,150 350,180 300,300 200,280" fill="url(#gradient2)" stroke="#8b5cf6" strokeWidth="2"/>
                                <defs>
                                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                                    </linearGradient>
                                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left Side - Content */}
                            <div className="text-center lg:text-left">
                                <div className="mb-4 sm:mb-6">
                                    <span className="text-pink-400 text-base sm:text-lg font-mono">&gt; Hello World_</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                                    <span className="animated-gradient">CENTER OF</span>
                                    <br />
                                    <span className="animated-gradient">DIGITAL</span>
                                    <br />
                                    <span className="animated-gradient">EMPOWERMENT</span>
                                </h1>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
                                    {!auth.user && (
                                        <Link
                                            href={route('login')}
                                            className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center"
                                        >
                                            LOGIN
                                        </Link>
                                    )}
                                    <button className="border border-gray-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center justify-center">
                                        <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                                        Watch Demo
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Visual/Image */}
                            <div className="relative">
                                {/* Code/Tech Visual */}
                                <div className="relative">
                                    {/* Background card with WE DO CODE text */}
                                    <div className="absolute top-20 right-0 bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-lg transform rotate-12 z-20 float-sticker">
                                        <div className="text-white font-bold text-2xl">WE</div>
                                        <div className="text-white font-bold text-2xl">DO</div>
                                        <div className="text-white font-bold text-2xl">CODE</div>
                                        <div className="text-pink-200 text-sm mt-2">AI EMPOWERED</div>
                                    </div>

                                    {/* Main content area */}
                                    <div className="bg-gray-800 rounded-2xl p-8 relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex space-x-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            </div>
                                            <div className="text-gray-400 text-sm">CODE212</div>
                                        </div>

                                        {/* Code content */}
                                        <div className="space-y-3 font-mono text-sm">
                                            <div className="text-gray-400">// Welcome to Code212</div>
                                            <div className="text-blue-400">function <span className="text-yellow-400">empowerStudents</span>() {"{"}</div>
                                            <div className="text-gray-300 ml-4">const skills = [</div>
                                            <div className="text-green-400 ml-8">'coding', 'innovation',</div>
                                            <div className="text-green-400 ml-8">'digital_transformation'</div>
                                            <div className="text-gray-300 ml-4">];</div>
                                            <div className="text-purple-400 ml-4">return <span className="text-pink-400">success</span>;</div>
                                            <div className="text-blue-400">{"}"}</div>
                                        </div>

                                        {/* Person silhouette or avatar */}
                                        <div className="mt-8 flex justify-center">
                                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <Code2 className="w-12 h-12 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional decorative elements */}
                                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-30 z-0"></div>
                                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-500 rounded-full opacity-40 z-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Présentation avant les espaces */}
                <section className="py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center">
                            <img src="/images/build-break-become.png" alt="Build Break Become" className="rounded-2xl shadow-2xl w-full max-w-2xl h-auto object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 text-gray-900">
                            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                                Préparez votre avenir avec les certifications CODE 212
                            </h2>
                            <p className="text-lg mb-4">
                                Les certifications CODE 212 ouvrent la porte aux carrières technologiques de demain. Elles couvrent un large éventail de compétences techniques et vous préparent à évoluer dans un monde numérique en constante évolution.<br /><br />
                                Conçues pour répondre aux besoins du marché, elles vous apportent des savoir-faire pratiques, spécialisés et très demandés par les recruteurs. Avec ces certifications, vous augmentez votre valeur professionnelle et accédez à des opportunités dans les entreprises tech, startups, agences digitales, organisations publiques et bien plus encore.<br /><br />
                                Mais nous allons plus loin que la simple formation. Chez CODE 212, vous bénéficiez d’un accompagnement personnalisé avec une équipe dédiée à votre réussite, d’un plan de carrière sur mesure pour atteindre vos objectifs, de formations toujours à jour adaptées aux tendances du secteur, ainsi que d’un accès illimité aux ressources pour progresser à votre rythme.<br /><br />
                                <span className="font-bold text-blue-700">Avec CODE 212, vous ne suivez pas seulement une formation : vous construisez votre avenir dans la tech.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-12 sm:py-16 bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                            <div className="p-4">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-400 mb-2">
                                    <CountUp end={176} duration={2} className="text-pink-400" />
                                </div>
                                <div className="text-sm sm:text-base text-gray-300">Total Institutions</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">
                                    <CountUp end={123320} duration={2.5} className="text-purple-400" />
                                </div>
                                <div className="text-sm sm:text-base text-gray-300">Total Students</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                                    <CountUp end={46} duration={1.5} className="text-blue-400" />
                                </div>
                                <div className="text-sm sm:text-base text-gray-300">Total Trackers</div>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl font-bold text-green-400 mb-2">
                                    <CountUp end={104} duration={2} className="text-green-400" />
                                </div>
                                <div className="text-gray-300">Total Certificates</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Spaces Section */}
                <section className="py-20 bg-white w-full">
                    <div className="w-full px-4 sm:px-8 lg:px-16">
                        <div className="text-center mb-16 w-full">
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight w-full">
                                Des espaces pensés pour stimuler l’innovation
                            </h2>
                        </div>
                        <div className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
                                {/* CODAGE */}
                                <div className="bg-blue-50 p-8 rounded-2xl flex flex-col items-start shadow-md">
                                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                        <Code2 className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">CODAGE</h3>
                                    <p className="text-gray-700 mb-4">Cet espace est équipé de 100 machines modernes, permettant aux étudiants de travailler sur des projets de programmation et de développement.</p>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Développement Web</li>
                                        <li>• Programmation</li>
                                        <li>• Collaboration</li>
                                        <li>• Innovation</li>
                                    </ul>
                                </div>
                                {/* PRÉSENTATIONS */}
                                <div className="bg-purple-50 p-8 rounded-2xl flex flex-col items-start shadow-md">
                                    <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">PRÉSENTATIONS</h3>
                                    <p className="text-gray-700 mb-4">Espace dédié aux présentations et démonstrations avec équipements audiovisuels de pointe pour partager et présenter les projets.</p>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Présentations interactives</li>
                                        <li>• Démonstrations</li>
                                        <li>• Conférences</li>
                                        <li>• Pitch sessions</li>
                                    </ul>
                                </div>
                                {/* ROBOTIQUE */}
                                <div className="bg-green-50 p-8 rounded-2xl flex flex-col items-start shadow-md">
                                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                                        <Cpu className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">ROBOTIQUE</h3>
                                    <p className="text-gray-700 mb-4">Laboratoire de robotique équipé pour la conception, le prototypage et le développement d'objets connectés et systèmes robotiques.</p>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• IoT Development</li>
                                        <li>• Prototypage</li>
                                        <li>• Systèmes embarqués</li>
                                        <li>• Intelligence artificielle</li>
                                    </ul>
                                </div>
                                {/* RECHERCHE */}
                                <div className="bg-blue-100 p-8 rounded-2xl flex flex-col items-start shadow-md">
                                    <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">RECHERCHE</h3>
                                    <p className="text-gray-700 mb-4">Espace dédié à la recherche, à l’exploration scientifique et à l’innovation technologique.</p>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Projets scientifiques</li>
                                        <li>• Veille technologique</li>
                                        <li>• Publications</li>
                                        <li>• Partenariats académiques</li>
                                    </ul>
                                </div>
                                {/* CRÉATIVITÉ */}
                                <div className="bg-pink-100 p-8 rounded-2xl flex flex-col items-start shadow-md">
                                    <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">CRÉATIVITÉ</h3>
                                    <p className="text-gray-700 mb-4">Espace pour stimuler la créativité, l’expression artistique et le design innovant.</p>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Design graphique</li>
                                        <li>• Projets artistiques</li>
                                        <li>• Ateliers créatifs</li>
                                        <li>• Collaboration interdisciplinaire</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-16 sm:py-20 bg-gray-50 w-full">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
                                🚀 Des formations certifiantes pour façonner les métiers du numérique de demain !
                            </h2>
                        </div>

                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                                        CODEUR & DÉVELOPPEUR
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Formation complète en développement web et logiciel
                                    </p>
                                </div>

                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                                        DATA SPECIALISTS
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Spécialisation en analyse et science des données
                                    </p>
                                </div>

                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                                        IOT DEVELOPER/ARCHITECT
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Développement d'objets connectés et systèmes IoT
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                        <Award className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        SYSTÈMES ET SÉCURITÉ
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Sécurité informatique et administration systèmes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Events Section */}
                {/* Events Section removed */}

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white relative overflow-hidden">
                    {/* Floating animated shapes */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-30 animate-float-slow blur-2xl"></div>
                    <div className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-blue-500 to-green-400 rounded-full opacity-20 animate-float-fast blur-xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-20 animate-float-mid blur-lg"></div>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                            Rejoignez l'Aventure Code212
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            Découvrez comment notre approche unique peut transformer votre avenir dans le digital. Faites partie de la communauté qui façonne l'avenir technologique.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 hover:from-pink-400 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
                                    style={{ minWidth: '220px' }}
                                >
                                    Commencer Maintenant <span className='ml-2'>→</span>
                                </Link>
                            )}
                            <Link
                                href={route('contact')}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                style={{ minWidth: '220px' }}
                            >
                                Nous Contacter <span className='ml-2'>→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

import type React from 'react';
import Footer from '@/components/layout/footer';
function useInView(ref: React.RefObject<Element>, options = {}) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            options
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);
    return inView;
}
