import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Code2,
    Palette,
    Brain,
    Database,
    Smartphone,
    Globe,
    Award,
    Clock,
    Users,
    Star,
    ArrowRight,
    Menu,
    X,
    BookOpen,
    Target,
    Zap
} from 'lucide-react';
import Footer from '@/components/layout/footer';

export default function OurPrograms() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Données des formations (exemple)
    const formations = [
        {
            id: 1,
            title: "Développement Web Full Stack",
            description: "Maîtrisez les technologies front-end et back-end pour créer des applications web complètes et modernes.",
            category: "Développement Web",
            level: "Débutant à Avancé",
            duration: "6 mois",
            modules: 12,
            students: 150,
            rating: 4.8,
            icon: Globe,
            color: "blue",
            skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"],
            image: "/formations/web-dev.jpg"
        },
        {
            id: 2,
            title: "Intelligence Artificielle & Machine Learning",
            description: "Explorez l'IA, le machine learning et le deep learning avec des projets pratiques et des cas d'usage réels.",
            category: "Intelligence Artificielle",
            level: "Intermédiaire",
            duration: "8 mois",
            modules: 16,
            students: 89,
            rating: 4.9,
            icon: Brain,
            color: "purple",
            skills: ["Python", "TensorFlow", "Scikit-learn", "Deep Learning", "Computer Vision"],
            image: "/formations/ai-ml.jpg"
        },
        {
            id: 3,
            title: "Développement Mobile Native",
            description: "Créez des applications mobiles performantes pour iOS et Android avec les dernières technologies natives.",
            category: "Mobile",
            level: "Intermédiaire",
            duration: "5 mois",
            modules: 10,
            students: 76,
            rating: 4.7,
            icon: Smartphone,
            color: "green",
            skills: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
            image: "/formations/mobile-dev.jpg"
        },
        {
            id: 4,
            title: "Data Science & Analytics",
            description: "Analysez et visualisez les données pour prendre des décisions éclairées en entreprise.",
            category: "Data Science",
            level: "Débutant",
            duration: "7 mois",
            modules: 14,
            students: 112,
            rating: 4.6,
            icon: Database,
            color: "orange",
            skills: ["Python", "R", "SQL", "Tableau", "Power BI"],
            image: "/formations/data-science.jpg"
        },
        {
            id: 5,
            title: "Design UI/UX & Infographie",
            description: "Concevez des interfaces utilisateur attractives et une expérience utilisateur optimale.",
            category: "Design",
            level: "Débutant",
            duration: "4 mois",
            modules: 8,
            students: 95,
            rating: 4.8,
            icon: Palette,
            color: "pink",
            skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototyping"],
            image: "/formations/ui-ux.jpg"
        },
        {
            id: 6,
            title: "Cybersécurité & Ethical Hacking",
            description: "Protégez les systèmes informatiques et apprenez les techniques de sécurisation avancées.",
            category: "Sécurité",
            level: "Avancé",
            duration: "6 mois",
            modules: 12,
            students: 67,
            rating: 4.9,
            icon: Code2,
            color: "red",
            skills: ["Kali Linux", "Penetration Testing", "Network Security", "Cryptography"],
            image: "/formations/cybersecurity.jpg"
        }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-100 border-blue-200",
            purple: "from-purple-500 to-purple-600 text-purple-600 bg-purple-100 border-purple-200",
            green: "from-green-500 to-green-600 text-green-600 bg-green-100 border-green-200",
            orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-100 border-orange-200",
            pink: "from-pink-500 to-pink-600 text-pink-600 bg-pink-100 border-pink-200",
            red: "from-red-500 to-red-600 text-red-600 bg-red-100 border-red-200"
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <>
            <Head title="Nos Formations - Code212">
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
                                <a href="#" className="text-pink-400 font-medium text-sm xl:text-base">OUR PROGRAMS</a>
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
                                    <Link href="/" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">HOME</Link>
                                    <a href="#" className="block px-3 py-2 text-pink-400 bg-gray-700 rounded-md font-medium">OUR PROGRAMS</a>
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
                <section className="bg-gray-900 py-16 sm:py-20 pt-16 sm:pt-20 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 left-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-20 h-20 bg-blue-500 rounded-full opacity-25"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="mb-6">
                            <span className="text-pink-400 text-lg font-mono">&gt; Explorez nos formations_</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            NOS <span className="text-pink-400">FORMATIONS</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Découvrez notre catalogue de formations de pointe conçues pour vous préparer aux métiers d'avenir. 
                            Développez vos compétences avec des programmes innovants et des projets concrets.
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-pink-400 mb-2">6</div>
                                <div className="text-gray-300 text-sm font-medium">Formations</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                                <div className="text-gray-300 text-sm font-medium">Étudiants</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                                <div className="text-gray-300 text-sm font-medium">Taux de Réussite</div>
                            </div>
                            <div className="text-center bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all shadow-lg">
                                <div className="text-3xl font-bold text-green-400 mb-2">4.8</div>
                                <div className="text-gray-300 text-sm font-medium">Note Moyenne</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formations Section */}
                <section className="py-20 bg-gray-50 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-lg">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Catalogue de Formations</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Des programmes complets et actualisés pour maîtriser les technologies les plus demandées sur le marché.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {formations.map((formation) => {
                                const IconComponent = formation.icon;
                                const colorClasses = getColorClasses(formation.color);
                                
                                return (
                                    <div key={formation.id} className="bg-white rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100 group">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center">
                                                <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{formation.title}</h3>
                                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${colorClasses.split('text-')[1]} ${colorClasses.split('bg-')[1]} ${colorClasses.split('border-')[1]} border`}>
                                                        {formation.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                                <span className="text-sm font-medium text-gray-600">{formation.rating}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {formation.description}
                                        </p>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {formation.duration}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <BookOpen className="w-4 h-4 mr-2" />
                                                {formation.modules} modules
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="w-4 h-4 mr-2" />
                                                {formation.students} étudiants
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Target className="w-4 h-4 mr-2" />
                                                {formation.level}
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Compétences acquises:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {formation.skills.map((skill, index) => (
                                                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href="/login"
                                            className={`w-full bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:transform group-hover:scale-105 font-medium`}
                                        >
                                            Commencer cette formation
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-20">
                            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Prêt à commencer votre parcours ?</h3>
                                <p className="text-xl mb-8 opacity-90">
                                    Rejoignez des milliers d'étudiants qui ont transformé leur carrière avec nos formations.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    S'inscrire maintenant
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
