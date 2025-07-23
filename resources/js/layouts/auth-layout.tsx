export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Layout d'authentification sans sidebar */}
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {description}
                        </p>
                    </div>
                    <div className="bg-white py-8 px-6 shadow rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
