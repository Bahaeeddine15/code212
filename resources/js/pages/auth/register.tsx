import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import InputError from "@/components/forms/input-error";
import TextLink from "@/components/common/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { Eye, EyeOff } from "lucide-react";

type RegisterForm = {
  name: string;
  email: string;
  ecole: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
    name: "",
    email: "",
    ecole: "",
    password: "",
    password_confirmation: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthLayout
      title="Création de compte"
      description="Veuillez renseigner vos informations afin de créer votre compte étudiant au sein de la plateforme Code212"
    >
      <Head title="Register" />
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-6 rounded-xl shadow-md p-8" style={{ background: 'transparent' }}>
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-[#A927B7] font-bold text-lg tracking-wide mb-2">Nom complet</Label>
            <Input
              id="name"
              type="text"
              required
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              disabled={processing}
              placeholder="Votre nom complet"
            />
            <InputError message={errors.name} className="mt-1" />
          </div>
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-[#A927B7] font-bold text-lg tracking-wide mb-2">Adresse E-mail Académique</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              disabled={processing}
              placeholder="email@uca.ac.ma"
            />
            <InputError message={errors.email} className="mt-1" />
          </div>
          {/* Ecole Field */}
          <div>
            <Label htmlFor="ecole" className="text-[#A927B7] font-bold text-lg tracking-wide mb-2">Nom d’établissement:</Label>
            <select
              id="ecole"
              required
              tabIndex={3}
              value={data.ecole}
              onChange={(e) => setData("ecole", e.target.value)}
              disabled={processing}
              className="border border-gray-300 rounded-md p-2 text-base font-semibold bg-gray-900 text-white focus:ring-2 focus:ring-[#A927B7] focus:border-[#A927B7] placeholder-gray-400"
            >
              <option value="" className="font-bold text-gray-700">-- Sélectionnez votre établissement --</option>
              <optgroup label="Marrakech" className="font-bold text-purple-700">
                <option value="FSSM">Faculté des Sciences Semlalia</option>
                <option value="FSJES Marrakech">FSJES Marrakech</option>
                <option value="FLSH Marrakech">FLSH Marrakech</option>
                <option value="FMPM">Faculté de Médecine</option>
                <option value="FLAM">Faculté de Langue Arabe</option>
                <option value="FSTG">FST Marrakech</option>
                <option value="ENSA Marrakech">ENSA Marrakech</option>
                <option value="ENCG">ENCG Marrakech</option>
                <option value="ENS">ENS Marrakech</option>
                <option value="PED">Pôle Études Doctorales</option>
              </optgroup>
              <optgroup label="Safi" className="font-bold text-blue-700">
                <option value="FPS">Faculté Polydisciplinaire de Safi</option>
                <option value="ENSA Safi">ENSA Safi</option>
                <option value="EST Safi">EST Safi</option>
              </optgroup>
              <optgroup label="Essaouira" className="font-bold text-green-700">
                <option value="EST Essaouira">EST Essaouira</option>
              </optgroup>
              <optgroup label="El Kelaâ" className="font-bold text-pink-700">
                <option value="FSJESK">FSJES El Kelaâ</option>
                <option value="ESTK">EST El Kelaâ</option>
              </optgroup>
            </select>
            <InputError message={errors.ecole} />
          </div>
          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-[#A927B7] font-bold text-lg tracking-wide mb-2">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                tabIndex={4}
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                disabled={processing}
                placeholder="Mot de passe"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={
                  showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </button>
            </div>
            <InputError message={errors.password} />
          </div>
          {/* Password Confirmation Field */}
          <div>
            <Label htmlFor="password_confirmation" className="text-[#A927B7] font-bold text-lg tracking-wide mb-2">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showPasswordConfirm ? "text" : "password"}
                required
                tabIndex={5}
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                disabled={processing}
                placeholder="Confirmer le mot de passe"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={
                  showPasswordConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"
                }
              >
                {showPasswordConfirm ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </button>
            </div>
            <InputError message={errors.password_confirmation} />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-2 w-full bg-[#300069] hover:bg-[#2CD3A3] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          tabIndex={6}
          disabled={processing}
        >
          Créer un compte
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <TextLink href={route("login")}
            tabIndex={7}
            className="text-[#A927B7] hover:text-purple-700 font-semibold"
          >
            Se connecter
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}