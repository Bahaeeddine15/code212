import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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
    ArrowRight
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Code212 - Center of Digital Empowerment">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gray-900">
                {/* Header/Navigation */}
                <header className="bg-gray-900 relative z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="text-white text-2xl font-bold">
                                    C<span className="text-pink-500">O</span>DE<span className="text-pink-500">'212'</span>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium">HOME</a>
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium">OUR PROGRAMS</a>
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium">CODE EVENTS</a>
                                <Link href="/clubs-partners" className="text-white hover:text-pink-400 transition-colors font-medium">CLUBS ET PARTENAIRES</Link>
                                <Link href="/contact" className="text-white hover:text-pink-400 transition-colors font-medium">CONTACT</Link>
                            </nav>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('register')}
                                            className="text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors font-medium"
                                            style={{ backgroundColor: '#A927B7' }}
                                        >
                                            SIGN UP
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            LOGIN
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gray-900 relative overflow-hidden min-h-screen flex items-center">
                    {/* Background Geometric Elements */}
                    <div className="absolute inset-0">
                        {/* Gradient circles and shapes */}
                        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 right-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-20 h-20 bg-blue-500 rounded-full opacity-25"></div>
                        <div className="absolute bottom-20 right-60 w-16 h-16 bg-green-500 rounded-full opacity-30"></div>
                        <div className="absolute top-60 right-80 w-12 h-12 bg-yellow-500 rounded-full opacity-40"></div>

                        {/* Geometric lines/polygons */}
                        <div className="absolute top-32 right-0 w-96 h-96 opacity-20">
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
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Content */}
                            <div>
                                <div className="mb-6">
                                    <span className="text-pink-400 text-lg font-mono">&gt; Hello World_</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                    CENTER OF
                                    <br />
                                    <span className="text-white">DIGITAL</span>
                                    <br />
                                    <span className="text-white">EMPOWERMENT</span>
                                </h1>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    {!auth.user && (
                                        <Link
                                            href={route('login')}
                                            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center"
                                        >
                                            LOGIN
                                        </Link>
                                    )}
                                    <button className="border border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center justify-center">
                                        <Play className="mr-2 w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Visual/Image */}
                            <div className="relative">
                                {/* Code/Tech Visual */}
                                <div className="relative">
                                    {/* Background card with WE DO CODE text */}
                                    <div className="absolute top-20 right-0 bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-lg transform rotate-12 z-20">
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

                {/* Statistics Section */}
                <section className="py-16 bg-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-pink-400 mb-2">176+</div>
                                <div className="text-gray-300">Total Institutions</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-purple-400 mb-2">123,320+</div>
                                <div className="text-gray-300">Total Students</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-400 mb-2">46+</div>
                                <div className="text-gray-300">Total Trackers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">104+</div>
                                <div className="text-gray-300">Total Certificates</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spaces Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Chaque Espace Favorise L'innovation
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Nos espaces sont équipés de technologies modernes pour offrir
                                un environnement d'apprentissage optimal
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Coding Space */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Code2 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">CODAGE</h3>
                                <p className="text-gray-700 mb-6">
                                    Cet espace est équipé de 100 machines modernes, permettant aux étudiants de
                                    travailler sur des projets de programmation et de développement.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Développement Web</li>
                                    <li>• Programmation</li>
                                    <li>• Collaboration</li>
                                    <li>• Innovation</li>
                                </ul>
                            </div>

                            {/* Presentation Space */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
                                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">PRÉSENTATIONS</h3>
                                <p className="text-gray-700 mb-6">
                                    Espace dédié aux présentations et démonstrations avec équipements audiovisuels
                                    de pointe pour partager et présenter les projets.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Présentations interactives</li>
                                    <li>• Démonstrations</li>
                                    <li>• Conférences</li>
                                    <li>• Pitch sessions</li>
                                </ul>
                            </div>

                            {/* Robotics Space */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Cpu className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">ROBOTIQUE</h3>
                                <p className="text-gray-700 mb-6">
                                    Laboratoire de robotique équipé pour la conception, le prototypage
                                    et le développement d'objets connectés et systèmes robotiques.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• IoT Development</li>
                                    <li>• Prototypage</li>
                                    <li>• Systèmes embarqués</li>
                                    <li>• Intelligence artificielle</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Nos Programmes de Formation
                            </h2>
                            <p className="text-xl text-gray-600">
                                Des formations certifiantes pour les métiers du numérique de demain
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Code2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    CODEUR & DÉVELOPPEUR
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Formation complète en développement web et logiciel
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Globe className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    DATA SPECIALISTS
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Spécialisation en analyse et science des données
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    IOT DEVELOPER/ARCHITECT
                                </h3>
                                <p className="text-gray-600 text-sm">
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
                </section>

                {/* Events Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Check Our Last Events In Code212
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                                <div className="flex items-center mb-4">
                                    <Calendar className="w-6 h-6 mr-2" />
                                    <span className="text-sm opacity-90">Événement récent</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Semaine Fortinet</h3>
                                <p className="mb-6 opacity-90">
                                    Formation intensive en cybersécurité avec Fortinet
                                </p>
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Plus de détails
                                </button>
                            </div>

                            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
                                <div className="flex items-center mb-4">
                                    <Users className="w-6 h-6 mr-2" />
                                    <span className="text-sm opacity-90">Compétition</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">University E-sport Battle</h3>
                                <p className="mb-6 opacity-90">
                                    Tournoi inter-universitaire de e-sport et gaming
                                </p>
                                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Plus de détails
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Get Your Free Registration At The Code212 Center Of Ibnou Zohr University
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    GET STARTED
                                </Link>
                            )}
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                CONTACT US
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <MainFooter />
            </div>
        </>
    );
}
