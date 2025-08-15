import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export function MainFooter() {
    return (
        <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
            <div className="px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo et réseaux sociaux */}
                        <div className="space-y-6">
                            <div>
                                <img 
                                    src="/logo/Logo.png" 
                                    alt="CODE212 Logo" 
                                    className="h-12 w-auto object-contain filter brightness-110"
                                />
                            </div>
                            
                            <div className="flex space-x-3">
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-colors"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/formations" className="text-gray-300 hover:text-white transition-colors">
                                        Programs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/articles" className="text-gray-300 hover:text-white transition-colors">
                                        Code News
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Programs */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Programs</h3>
                            <ul className="space-y-3">
                                <li className="text-gray-300">CODEUR & DÉVELOPPEUR</li>
                                <li className="text-gray-300">DATA SPECIALISTS</li>
                                <li className="text-gray-300">IOT DEVELOPER/ARCHITECT</li>
                                <li className="text-gray-300">SYSTÈMES ET SÉCURITÉ</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact</h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300">contact@code212.ac.ma</span>
                            </div>
                        </div>
                    </div>

                    {/* Ligne de séparation */}
                    <div className="border-t border-gray-700 my-8"></div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Copyright © 2025 <span className="text-pink-400 font-semibold">Code212</span>.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
