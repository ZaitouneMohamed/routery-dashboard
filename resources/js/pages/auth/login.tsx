import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
  LoaderCircle,
  Eye,
  EyeOff,
  Truck,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  CheckCircle,
  Users,
  BarChart3
} from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: 'test@test.com',
        password: 'password',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const features = [
        {
            icon: BarChart3,
            title: 'Analytics en temps réel',
            description: 'Suivez vos KPIs de flotte instantanément'
        },
        {
            icon: Shield,
            title: 'Sécurité avancée',
            description: 'Vos données protégées avec chiffrement SSL'
        },
        {
            icon: Users,
            title: 'Collaboration équipe',
            description: 'Gérez vos équipes et permissions facilement'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
            <Head title="Connexion" />

            {/* Left Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Logo and Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                            <Truck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Bon retour !
                        </h1>
                        <p className="text-gray-600">
                            Connectez-vous à votre tableau de bord FleetFlow
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-green-800">{status}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Adresse email
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`w-5 h-5 transition-colors ${
                                        focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="votre.email@entreprise.com"
                                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Mot de passe
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Mot de passe oublié ?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors ${
                                        focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                                    }`} />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Votre mot de passe"
                                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', !!checked)}
                                className="border-gray-300"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                                Se souvenir de moi
                            </Label>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            onClick={submit}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl group"
                        >
                            {processing ? (
                                <LoaderCircle className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Pas encore de compte ?{' '}
                            <TextLink
                                href={route('register')}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Créer un compte
                            </TextLink>
                        </p>
                    </div>

                </div>
            </div>

            {/* Right Side - Features Showcase */}
            <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
                </div>

                <div className="relative flex flex-col justify-center p-12 text-white">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Gérez votre flotte comme un pro
                        </h2>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Rejoignez plus de 500 entreprises qui optimisent leurs opérations
                            de transport avec FleetFlow.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-blue-100">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
