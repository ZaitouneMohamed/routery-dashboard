import React, { useState, ChangeEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, User, Mail, Phone, Key, FileText, Shield, Code, CodeSquareIcon } from 'lucide-react';
import GenericInput from '@/components/GenericInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        phone: '',
        code: '',
        cni: '',
        cnss: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setData('image', file || null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(typeof reader.result === 'string' ? reader.result : null);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('drivers.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Add Driver" />

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
                            Add New Driver
                        </h1>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                Driver Information
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Please fill in all the required information for the new driver.
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
                                        <GenericInput
                                            id="full_name"
                                            label="full name"
                                            type="text"
                                            value={data.full_name}
                                            onChange={(val) => setData('full_name', val)}
                                            required
                                            error={errors.full_name}
                                            icon={<User className="h-5 w-5 text-gray-400" />}
                                            placeholder="Enter driver's full name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <GenericInput
                                            id="email"
                                            label="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(val) => setData('email', val)}
                                            required
                                            error={errors.email}
                                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                                            placeholder="Enter driver's email address"
                                        />
                                </div>

                                {/* Phone */}
                                <div>
                                    <GenericInput
                                            id="phone"
                                            label="phone"
                                            type="text"
                                            value={data.phone}
                                            onChange={(val) => setData('phone', val)}
                                            required
                                            error={errors.phone}
                                            icon={<Phone className="h-5 w-5 text-gray-400" />}
                                            placeholder="Enter driver's phone number"
                                        />
                                </div>

                                {/* Code */}
                                <div>
                                    <GenericInput
                                            id="code"
                                            label="code"
                                            type="text"
                                            value={data.code}
                                            onChange={(val) => setData('code', val)}
                                            required
                                            error={errors.code}
                                            icon={<CodeSquareIcon className="h-5 w-5 text-gray-400" />}
                                            placeholder="Enter driver's unique code"
                                        />
                                </div>

                                {/* CNI */}
                                <div>
                                    <GenericInput
                                            id="cni"
                                            label="ID card number (CNI)"
                                            type="text"
                                            value={data.cni}
                                            onChange={(val) => setData('cni', val)}
                                            required
                                            error={errors.cni}
                                            placeholder="Enter driver's CNI"
                                        />
                                </div>

                                {/* CNSS */}
                                <div>
                                    <GenericInput
                                            id="cnss"
                                            label="Social Security Number (CNSS)"
                                            type="text"
                                            value={data.cnss}
                                            onChange={(val) => setData('cnss', val)}
                                            error={errors.cnss}
                                            icon={<Shield className="h-5 w-5 text-gray-400" />}
                                            placeholder="Enter driver's cnss (if got it)"
                                        />
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
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="mt-4">
                                            <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 hover:scale-105" />
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
                                    Make sure the driver code is unique within your system.
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
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Driver'
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
