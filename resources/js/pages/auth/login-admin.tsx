import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface AdminLoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function AdminLogin({ status, canResetPassword }: AdminLoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login.post'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Connexion Administrateur" description="Connectez-vous à l'espace d'administration Code212">
            <Head title="Connexion Administrateur" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Administration</h2>
                <p className="text-gray-400">Accès réservé aux administrateurs</p>
            </div>

            <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@code212.com"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Mot de passe"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                        <Label htmlFor="remember" className="text-gray-300 text-sm">Se souvenir de moi</Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Se connecter en tant qu'admin
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Accès étudiant ?{' '}
                    <TextLink href={route('login')} className="text-blue-400 hover:text-blue-300" tabIndex={5}>
                        Connexion étudiants
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-400">{status}</div>}
        </AuthLayout>
    );
}
