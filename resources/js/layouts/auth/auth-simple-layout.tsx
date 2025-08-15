import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Background Geometric Elements */}
            <div className="absolute inset-0">
                {/* Gradient circles and shapes */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute top-40 right-40 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
                <div className="absolute bottom-32 right-32 w-20 h-20 bg-blue-500 rounded-full opacity-25"></div>
                <div className="absolute bottom-20 left-32 w-16 h-16 bg-green-500 rounded-full opacity-30"></div>
                <div className="absolute top-60 left-20 w-12 h-12 bg-yellow-500 rounded-full opacity-40"></div>
                
                {/* Geometric lines/polygons */}
                <div className="absolute top-32 right-0 w-96 h-96 opacity-20">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <polygon points="100,50 300,80 250,200 150,180" fill="url(#authGrad1)" stroke="#ec4899" strokeWidth="2"/>
                        <polygon points="200,150 350,180 300,300 200,280" fill="url(#authGrad2)" stroke="#8b5cf6" strokeWidth="2"/>
                        <defs>
                            <linearGradient id="authGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                            </linearGradient>
                            <linearGradient id="authGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                
                {/* Left side geometric elements */}
                <div className="absolute top-32 left-0 w-96 h-96 opacity-15">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <polygon points="50,100 200,120 180,250 80,230" fill="url(#authGrad3)" stroke="#10b981" strokeWidth="2"/>
                        <polygon points="120,200 280,220 250,350 150,330" fill="url(#authGrad4)" stroke="#3b82f6" strokeWidth="2"/>
                        <defs>
                            <linearGradient id="authGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
                            </linearGradient>
                            <linearGradient id="authGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10 relative z-10">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-6">
                                <Link href={route('home')} className="flex flex-col items-center gap-3 font-medium">
                                    <div className="text-white text-3xl font-bold">
                                        C<span style={{ color: '#A927B7' }}>O</span>DE<span style={{ color: '#A927B7' }}>'212'</span>
                                    </div>
                                    <span className="sr-only">{title}</span>
                                </Link>

                                <div className="space-y-3 text-center">
                                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                                    <p className="text-center text-sm text-gray-300">{description}</p>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
