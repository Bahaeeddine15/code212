import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MainFooter } from '@/components/main-footer';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Clock,
    User,
    MessageSquare,
    Building2,
    Calendar,
    Users,
    Monitor,
    BookOpen,
    Video,
    Globe
} from 'lucide-react';

export default function Contact() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Contact - Code212">
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
                                <a href="#" className="text-white hover:text-pink-400 transition-colors font-medium">CODE EVENTS</a>
                                <Link href="/clubs-partners" className="text-white hover:text-pink-400 transition-colors font-medium">CLUBS ET PARTENAIRES</Link>
                                <a href="#" className="text-pink-400 font-medium">CONTACT</a>
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
                <section className="bg-gray-900 py-20 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-40 left-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-32 right-32 w-20 h-20 bg-purple-500 rounded-full opacity-25"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="mb-6">
                            <span className="text-blue-400 text-lg font-mono">&gt; Contactez-nous_</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                            NOUS <span className="text-blue-400">CONTACTER</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Une question ? Un projet ? Besoin d'informations sur nos formations ? 
                            Notre équipe est là pour vous accompagner dans votre parcours vers l'excellence numérique.
                        </p>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center mb-6">
                                    <MessageSquare className="w-8 h-8 text-blue-500 mr-4" />
                                    <h2 className="text-2xl font-bold text-gray-900">Formulaire de Contact</h2>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 font-medium mb-2">Prénom *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 font-medium mb-2">Nom *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="votre.email@exemple.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            placeholder="+212 6XX XXX XXX"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Sujet *</label>
                                        <select 
                                            required
                                            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                        >
                                            <option value="">Choisissez un sujet</option>
                                            <option value="information">Demande d'information</option>
                                            <option value="inscription">Inscription</option>
                                            <option value="formation">Nos formations</option>
                                            <option value="partenariat">Partenariat</option>
                                            <option value="technique">Support technique</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Message *</label>
                                        <textarea
                                            required
                                            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                                            rows={6}
                                            placeholder="Décrivez votre demande en détail..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg"
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        Envoyer le message
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info & Map */}
                            <div className="space-y-8">
                                {/* Contact Cards */}
                                <div className="grid gap-6">
                                    {/* Location Card */}
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <MapPin className="w-6 h-6 text-pink-500 mr-3" />
                                            <h3 className="text-xl font-bold text-gray-900">Notre Adresse</h3>
                                        </div>
                                        <p className="text-gray-600 mb-2">Code212 - Center of Digital Empowerment</p>
                                        <p className="text-gray-600 mb-2">123 Boulevard Mohammed V</p>
                                        <p className="text-gray-600">Casablanca 20000, Maroc</p>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <Phone className="w-6 h-6 text-green-500 mr-3" />
                                            <h3 className="text-xl font-bold text-gray-900">Contacts Utiles</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 text-blue-500 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Email général</p>
                                                    <p className="text-gray-900 font-medium">contact@code212.ma</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-green-500 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Téléphone</p>
                                                    <p className="text-gray-900 font-medium">+212 5XX XXX XXX</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-4 h-4 text-purple-500 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Admissions</p>
                                                    <p className="text-gray-900 font-medium">admissions@code212.ma</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Building2 className="w-4 h-4 text-orange-500 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Partenariats</p>
                                                    <p className="text-gray-900 font-medium">partners@code212.ma</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Container */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                    <div className="p-6 pb-0">
                                        <div className="flex items-center mb-4">
                                            <Globe className="w-6 h-6 text-blue-500 mr-3" />
                                            <h3 className="text-xl font-bold text-gray-900">Localisation</h3>
                                        </div>
                                    </div>
                                    {/* Map Placeholder - In real implementation, you would use Google Maps or Mapbox */}
                                    <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                            <p className="text-gray-600 font-medium">Carte interactive</p>
                                            <p className="text-sm text-gray-500">Code212 Campus - Casablanca</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schedule Section */}
                <section className="py-20 bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Horaires & Modalités</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Découvrez nos différentes modalités de formation adaptées à votre emploi du temps
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Présentiel */}
                            <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-colors">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Présentiel</h3>
                                    <p className="text-blue-400 font-medium">Sur Campus</p>
                                </div>
                                
                                <div className="space-y-4 text-gray-300">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 text-blue-400 mr-3" />
                                        <span className="text-sm">Lundi - Vendredi</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-blue-400 mr-3" />
                                        <span className="text-sm">9h00 - 17h00</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-blue-400 mr-3" />
                                        <span className="text-sm">Samedi: 9h00 - 13h00</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <p className="text-sm text-gray-400">Accès aux laboratoires, espaces de coworking et équipements professionnels</p>
                                </div>
                            </div>

                            {/* Blended Learning */}
                            <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-colors border-2 border-pink-500">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Monitor className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Blended Learning</h3>
                                    <p className="text-pink-400 font-medium">Hybride - Recommandé</p>
                                </div>
                                
                                <div className="space-y-4 text-gray-300">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 text-pink-400 mr-3" />
                                        <span className="text-sm">50% Présentiel / 50% Distanciel</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-pink-400 mr-3" />
                                        <span className="text-sm">Flexible selon planning</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Video className="w-4 h-4 text-pink-400 mr-3" />
                                        <span className="text-sm">Cours en ligne interactifs</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <p className="text-sm text-gray-400">Flexibilité optimale avec suivi personnalisé et accès aux ressources 24/7</p>
                                </div>
                            </div>

                            {/* À Distance */}
                            <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-colors">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">À Distance</h3>
                                    <p className="text-purple-400 font-medium">100% En Ligne</p>
                                </div>
                                
                                <div className="space-y-4 text-gray-300">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 text-purple-400 mr-3" />
                                        <span className="text-sm">7j/7 - 24h/24</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Video className="w-4 h-4 text-purple-400 mr-3" />
                                        <span className="text-sm">Classes virtuelles</span>
                                    </div>
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 text-purple-400 mr-3" />
                                        <span className="text-sm">Ressources en libre accès</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <p className="text-sm text-gray-400">Idéal pour les professionnels et étudiants avec contraintes géographiques</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Besoin d'un conseil personnalisé ?</h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Nos conseillers pédagogiques sont disponibles pour vous aider à choisir la modalité 
                                de formation la plus adaptée à vos objectifs et contraintes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a 
                                    href="tel:+212522XXXXXX" 
                                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Appelez-nous
                                </a>
                                <a 
                                    href="mailto:conseil@code212.ma" 
                                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Écrivez-nous
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <MainFooter />
            </div>
        </>
    );
}
