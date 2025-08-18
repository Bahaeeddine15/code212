import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MainFooter } from '@/components/main-footer';
import {
    Target,
    Heart,
    Lightbulb,
    Users,
    Award,
    BookOpen,
    Globe,
    Code2,
    Cpu,
    Zap,
    Star,
    ChevronRight,
    Eye,
    Compass,
    ArrowRight
} from 'lucide-react';

export default function About() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="À propos - Code212">
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
                                <Link href="/" className="text-white text-2xl font-bold">
                                    C<span className="text-pink-500">O</span>DE<span className="text-pink-500">'212'</span>
                                </Link>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium">HOME</Link>
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium">OUR PROGRAMS</a>
                                <a href="#" className="text-pink-400 font-medium">À PROPOS</a>
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
                <section className="bg-gray-900 relative overflow-hidden py-20">
                    {/* Background Geometric Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 right-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-20 h-20 bg-blue-500 rounded-full opacity-25"></div>
                        <div className="absolute bottom-20 right-60 w-16 h-16 bg-green-500 rounded-full opacity-30"></div>
                        <div className="absolute top-60 left-20 w-12 h-12 bg-yellow-500 rounded-full opacity-40"></div>
                        
                        {/* Geometric patterns */}
                        <div className="absolute top-32 left-0 w-96 h-96 opacity-20">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                <polygon points="50,100 250,80 200,200 100,180" fill="url(#gradient3)" stroke="#ec4899" strokeWidth="2"/>
                                <polygon points="150,200 300,180 250,300 150,280" fill="url(#gradient4)" stroke="#8b5cf6" strokeWidth="2"/>
                                <defs>
                                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                                    </linearGradient>
                                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <div className="mb-6">
                                <span className="text-pink-400 text-lg font-mono">&gt; Découvrez qui nous sommes_</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                                À PROPOS DE
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">CODE212</span>
                            </h1>

                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                                Le centre d'autonomisation numérique de l'Université Ibn Zohr, 
                                où l'innovation rencontre la formation pour façonner l'avenir du digital.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Philosophie Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Notre Philosophie
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Lightbulb className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Continue</h3>
                                            <p className="text-gray-600">
                                                Nous croyons que l'innovation est le moteur de l'évolution technologique. 
                                                Notre approche encourage la créativité et l'expérimentation pour développer des solutions révolutionnaires.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration & Communauté</h3>
                                            <p className="text-gray-600">
                                                Le partage des connaissances et l'apprentissage collaboratif sont au cœur de notre philosophie. 
                                                Ensemble, nous construisons une communauté tech dynamique et inclusive.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence & Performance</h3>
                                            <p className="text-gray-600">
                                                Nous visons l'excellence dans chaque projet et formation. 
                                                Nos standards élevés garantissent une préparation optimale aux défis du monde professionnel.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Visual representation */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 relative overflow-hidden">
                                    <div className="absolute inset-0">
                                        <div className="absolute top-4 right-4 w-16 h-16 bg-pink-500 rounded-full opacity-20"></div>
                                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500 rounded-full opacity-30"></div>
                                        <div className="absolute top-1/2 right-8 w-8 h-8 bg-green-500 rounded-full opacity-40"></div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-center mb-8">
                                            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Code2 className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Code212 Philosophy</h3>
                                        </div>

                                        <div className="space-y-4 font-mono text-sm text-gray-300">
                                            <div className="text-gray-400">// Notre approche</div>
                                            <div className="text-blue-400">const <span className="text-yellow-400">philosophy</span> = {"{"}</div>
                                            <div className="text-gray-300 ml-4">innovation: <span className="text-green-400">'continue'</span>,</div>
                                            <div className="text-gray-300 ml-4">collaboration: <span className="text-green-400">'essentielle'</span>,</div>
                                            <div className="text-gray-300 ml-4">excellence: <span className="text-green-400">'toujours'</span>,</div>
                                            <div className="text-gray-300 ml-4">impact: <span className="text-purple-400">transformational</span></div>
                                            <div className="text-blue-400">{"}"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Notre Mission
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto"></div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Former les Leaders Tech</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Développer les compétences techniques et le leadership nécessaires pour exceller dans l'industrie technologique moderne et devenir les innovateurs de demain.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact Global</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Créer des solutions technologiques qui ont un impact positif sur la société et contribuent au développement durable de notre région et au-delà.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                                    <Compass className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transformation Digitale</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Accompagner la transformation numérique en formant des experts capables de répondre aux défis technologiques actuels et futurs.
                                </p>
                            </div>
                        </div>

                        {/* Mission Statement */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                Notre Vision d'Avenir
                            </h3>
                            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                                "Devenir le centre de référence en Afrique pour l'autonomisation numérique, 
                                en formant une nouvelle génération de talents tech capables de répondre aux défis 
                                de l'économie numérique mondiale tout en préservant nos valeurs locales."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Valeurs & Statistiques */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Nos Valeurs en Action
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                                <div className="text-gray-600">Étudiants Formés</div>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                                <div className="text-gray-600">Projets Réalisés</div>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                                <div className="text-gray-600">Programmes Actifs</div>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                                <div className="text-gray-600">Taux de Satisfaction</div>
                            </div>
                        </div>

                        {/* Values Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Passion</h3>
                                <p className="text-gray-600 text-sm">
                                    La passion pour la technologie guide chacune de nos actions et inspire nos étudiants.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Vision</h3>
                                <p className="text-gray-600 text-sm">
                                    Une vision claire de l'avenir technologique nous permet de préparer nos étudiants efficacement.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
                                <p className="text-gray-600 text-sm">
                                    L'innovation constante dans nos méthodes et programmes pour rester à la pointe.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Rejoignez l'Aventure Code212
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                            Découvrez comment notre approche unique peut transformer votre avenir dans le digital. 
                            Faites partie de la communauté qui façonne l'avenir technologique.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 inline-flex items-center justify-center"
                                >
                                    Commencer Maintenant
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            )}
                            <Link
                                href="/contact"
                                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center justify-center"
                            >
                                Nous Contacter
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <MainFooter />
            </div>
        </>
    );
}
