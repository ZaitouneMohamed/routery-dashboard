import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, User, Mail, Phone, Key, FileText, Shield, Info } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        truck_id: 1,
        title: '',
        last_notification: '',
        days_count: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('papiers.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Add Papier" />

            <div className="py-8 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header with Card Effect */}
                    <div className="mb-8 flex justify-between items-center">
                        <Link
                            href={route('papiers.index')}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span>Back to Papiers</span>
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                            Add New Papier
                        </h1>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                papier Information
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Please fill in all the required information for the new papier.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="col-span-2">
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Info className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="title"
                                            placeholder="Enter title of the papier"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                            required
                                        />
                                    </div>
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="daysCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Days Count
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            id="daysCount"
                                            placeholder="example : 365 for 1 year"
                                            value={data.days_count}
                                            onChange={e => setData('days_count', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.days_count && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.days_count}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="last_notification" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Last notification <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            id="date"
                                            required
                                            placeholder="last time you get notified about this papier"
                                            value={data.last_notification}
                                            onChange={e => setData('last_notification', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                    </div>
                                    {errors.last_notification && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.last_notification}</p>
                                    )}
                                </div>


                                {/* Description */}
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                        <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Enter any additional information about the papier"
                                        className="w-full h-24 pl-3 py-2 rounded-lg border-gray-300 dark:border-gray-600
                                            shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                            focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base
                                            resize-none"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Help Text */}
                            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    <span className="font-medium">Note:</span> Fields marked with <span className="text-red-500">*</span> are required.
                                    Make sure the title is unique within your system.
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
                                        'Save Papier'
                                    )}
                                </button>
                                <Link
                                    href={route('papiers.index')}
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
