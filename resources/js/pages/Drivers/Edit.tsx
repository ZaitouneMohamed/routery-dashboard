import React, { useState, useEffect, ChangeEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, User, Mail, Phone, Key, FileText, Shield } from 'lucide-react';

interface DriverItem {
    id: number;
    data: {
        fullname: string;
        email?: string;
        phone: string;
        code: string;
        cni?: string;
        cnss?: string;
        image?: string; // API image URL
    };
}

interface EditProps {
    item: DriverItem;
}

export default function Edit({ item }: EditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, put, processing, errors } = useForm({
        full_name: item.data.fullname,
        email: item.data.email || '',
        phone: item.data.phone,
        code: item.data.code,
        cni: item.data.cni || '',
        cnss: item.data.cnss || '',
        image: null as File | null,
    });

    // Initialize image preview with existing image from API
    useEffect(() => {
        if (item.data.image) {
            setImagePreview(item.data.image);
        }
    }, [item.data.image]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setData('image', file || null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(typeof reader.result === 'string' ? reader.result : null);
            reader.readAsDataURL(file);
        } else {
            // If no file selected, revert to existing image if available
            setImagePreview(item.data.image || null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        console.log('Submitting form with data:', data);


        put(route('drivers.update', item.data.id));
    };


    return (
        <DashboardLayout>
            <Head title="Edit Driver" />

            <div className="py-8 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header with Card Effect */}
                    <div className="mb-8 flex justify-between items-center">
                        <Link
                            href={route('drivers.index')}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span>Back to Drivers</span>
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                            Edit Driver: {item.data.fullname}
                        </h1>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                Driver Information
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Update the driver's information below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="col-span-2">
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="full_name"
                                            placeholder="Enter driver's full name"
                                            value={data.full_name}
                                            onChange={e => setData('full_name', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                            required
                                        />
                                    </div>
                                    {errors.full_name && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="email@example.com"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            placeholder="+1 (555) 000-0000"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Code */}
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Driver Code <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Key className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="code"
                                            placeholder="DRV-000"
                                            value={data.code}
                                            required
                                            onChange={e => setData('code', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.code && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                                    )}
                                </div>

                                {/* CNI */}
                                <div>
                                    <label htmlFor="cni" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        ID Card Number (CNI)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="cni"
                                            value={data.cni}
                                            placeholder="Enter ID number"
                                            onChange={e => setData('cni', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.cni && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cni}</p>
                                    )}
                                </div>

                                {/* CNSS */}
                                <div>
                                    <label htmlFor="cnss" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Social Security Number (CNSS)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Shield className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter CNSS number"
                                            id="cnss"
                                            value={data.cnss}
                                            onChange={e => setData('cnss', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.cnss && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cnss}</p>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div className="col-span-2">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Driver Image
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img
                                                src={imagePreview}
                                                alt="Driver preview"
                                                className="h-32 w-32 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 hover:scale-105"
                                            />
                                            <div className="mt-2">
                                                {item.data.image && !data.image && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Current image</span>
                                                )}
                                                {data.image && (
                                                    <span className="text-xs text-green-600 dark:text-green-400">New image selected</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            {/* Help Text */}
                            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    <span className="font-medium">Note:</span> Fields marked with <span className="text-red-500">*</span> are required.
                                    Leave image field empty to keep the current image, or select a new one to replace it.
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-between sm:space-x-reverse sm:space-x-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto mb-3 sm:mb-0 flex justify-center items-center px-6 py-3
                                        bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
                                        text-white rounded-lg transition ease-in duration-200 focus:outline-none focus:ring-2
                                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Driver'
                                    )}
                                </button>
                                <Link
                                    href={route('drivers.index')}
                                    className="w-full sm:w-auto flex justify-center items-center px-6 py-3
                                        border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700
                                        dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50
                                        dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-gray-500 transition ease-in duration-200 shadow-sm"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
