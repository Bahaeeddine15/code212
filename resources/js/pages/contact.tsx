import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { MainFooter } from '@/components/main-footer';
import { useState, FormEventHandler } from 'react';
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
    Globe,
    Menu,
    X,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Footer from '@/components/layout/footer';

interface ContactForm {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const { auth, flash } = usePage<SharedData & { flash?: { success?: string; error?: string } }>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<ContactForm>({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Contact - Code212">
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
                                <Link href="/clubs-partners" className="text-white hover:text-pink-400 transition-colors font-medium text-sm xl:text-base">CLUBS ET PARTENAIRES</Link>
                                <a href="#" className="text-pink-400 font-medium text-sm xl:text-base">CONTACT</a>
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
                                    <Link href="/clubs-partners" className="block px-3 py-2 text-white hover:text-pink-400 hover:bg-gray-700 rounded-md transition-colors font-medium">CLUBS ET PARTENAIRES</Link>
                                    <a href="#" className="block px-3 py-2 text-pink-400 bg-gray-700 rounded-md font-medium">CONTACT</a>
                                    
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
                        {/* Flash Messages */}
                        {flash?.success && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                {flash.error}
                            </div>
                        )}

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center mb-6">
                                    <MessageSquare className="w-8 h-8 text-blue-500 mr-4" />
                                    <h2 className="text-2xl font-bold text-gray-900">Formulaire de Contact</h2>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-900 font-medium mb-2">Prénom *</label>
                                            <input
                                                type="text"
                                                value={data.prenom}
                                                onChange={(e) => setData('prenom', e.target.value)}
                                                required
                                                className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                    errors.prenom 
                                                        ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                        : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                                }`}
                                                placeholder="Votre prénom"
                                            />
                                            {errors.prenom && (
                                                <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-gray-900 font-medium mb-2">Nom *</label>
                                            <input
                                                type="text"
                                                value={data.nom}
                                                onChange={(e) => setData('nom', e.target.value)}
                                                required
                                                className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                    errors.nom 
                                                        ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                        : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                                }`}
                                                placeholder="Votre nom"
                                            />
                                            {errors.nom && (
                                                <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                errors.email 
                                                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                    : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                            }`}
                                            placeholder="votre.email@exemple.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            value={data.telephone}
                                            onChange={(e) => setData('telephone', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                errors.telephone 
                                                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                    : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                            }`}
                                            placeholder="+212 6XX XXX XXX"
                                        />
                                        {errors.telephone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Sujet *</label>
                                        <select 
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            required
                                            className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                errors.subject 
                                                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                    : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                            }`}
                                        >
                                            <option value="">Choisissez un sujet</option>
                                            <option value="information">Demande d'information</option>
                                            <option value="inscription">Inscription</option>
                                            <option value="formation">Nos formations</option>
                                            <option value="partenariat">Partenariat</option>
                                            <option value="technique">Support technique</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-900 font-medium mb-2">Message *</label>
                                        <textarea
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                            className={`w-full px-4 py-3 bg-white text-gray-900 rounded-lg border focus:ring-2 focus:outline-none ${
                                                errors.message 
                                                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                                                    : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                                            }`}
                                            rows={6}
                                            placeholder="Décrivez votre demande en détail..."
                                        ></textarea>
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center shadow-lg ${
                                            processing 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {processing ? 'Envoi en cours...' : 'Envoyer le message'}
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
                                        <p className="text-gray-600 mb-2">112 Bd Abdelkrim Al Khattabi</p>
                                        <p className="text-gray-600">Marrakech 40000, Maroc</p>
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
                                                    <p className="text-gray-900 font-medium">code212@uca.ac.ma</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-green-500 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Téléphone</p>
                                                    <p className="text-gray-900 font-medium">+212 5XX XXX XXX</p>
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
                                    {/* Google Maps Embed */}
                                    <div className="h-64 relative">
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.2193516744543!2d-8.018739!3d31.646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x960bcc2b1efcdb72!2sBiblioth%C3%A8que%20Universitaire%20de%20l'Universit%C3%A9%20Cadi%20Ayyad%20Marrakech!5e0!3m2!1sen!2sma!4v1693234567890!5m2!1sen!2sma"
                                            width="100%" 
                                            height="100%" 
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Bibliothèque Universitaire de l'Université Cadi Ayyad Marrakech"
                                        ></iframe>
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
                                    href="mailto:code212@uca.ac.ma" 
                                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Écrivez-nous
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
