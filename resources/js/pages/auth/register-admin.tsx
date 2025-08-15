import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function AdminRegister() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.register.post'), {
            onFinish: () => reset('password', 'password_confirmation'),
            // Remove onSuccess redirect!
        });
    };

    return (
        <AuthLayout title="Créer un compte administrateur" description="Créez votre compte d'administration Code212">
            <Head title="Inscription Administrateur" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Administration</h2>
                <p className="text-gray-400">Créer un nouveau compte administrateur</p>
            </div>

            <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nom complet</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nom complet de l'administrateur"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
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
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Créer un mot de passe sécurisé"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-white">Confirmer le mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmer votre mot de passe"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Créer un compte administrateur
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Déjà un compte administrateur ?{' '}
                    <TextLink href={route('admin.login')} className="text-blue-400 hover:text-blue-300" tabIndex={6}>
                        Se connecter
                    </TextLink>
                </div>

                {/* Link to student registration */}
                <div className="text-center text-sm text-gray-400">
                    Inscription étudiante ?{' '}
                    <TextLink href={route('register')} className="text-pink-400 hover:text-pink-300" tabIndex={7}>
                        Créer un compte étudiant
                    </TextLink>
                </div>

                {/* Back to home */}
                <div className="text-center">
                    <TextLink href={route('home')} className="text-gray-500 hover:text-gray-400 text-sm" tabIndex={8}>
                        ← Retour à l'accueil
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
