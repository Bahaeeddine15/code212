import AppLogoIcon from '@/components/layout/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface CleanAuthLayoutProps {
    title?: string;
    description?: string;
}

export default function CleanAuthLayout({ children, title, description }: PropsWithChildren<CleanAuthLayoutProps>) {
    return (
        <html lang="fr" className="h-full">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title} - Code212</title>
            </head>
            <body className="h-full">
                {/* Layout complètement isolé sans sidebar */}
                <div className="min-h-screen w-full bg-white flex items-center justify-center">
                    <div className="max-w-md w-full space-y-8 p-6">
                        <div className="text-center">
                            <Link href={route('home')} className="inline-flex items-center">
                                <AppLogoIcon className="h-12 w-12 text-purple-600" />
                                <div className="ml-3">
                                    <h2 className="text-2xl font-bold text-gray-900">Code212</h2>
                                    <p className="text-sm text-gray-600">Platform</p>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <p className="mt-2 text-sm text-gray-600">{description}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
