export default function AuthLayout({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>

        <div className="bg-white rounded-lg shadow px-6 py-8 sm:px-10 sm:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
