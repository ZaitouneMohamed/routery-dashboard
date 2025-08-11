import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, Info, Mail, Phone } from 'lucide-react';
import GenericInput from '@/components/GenericInput';

export default function Edit({ item }) {
    const { data, setData, put, processing, errors } = useForm({
        truck_id: 1,
        title: item.data.title || '',
        last_notification: item.data.last_notification || '',
        days_count: item.data.days_count || '',
        description: item.data.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('papiers.update', item.data.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit Papier" />

            <div className="p-6 dark:bg-gray-900">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <Link
                                        href={route('papiers.index')}
                                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-1" />
                                        Back to List
                                    </Link>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Edit Papier: {item.title}
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                               {/* Title */}
                                <div className="col-span-2">
                                    <GenericInput
                                        id="Title"
                                        label="Title"
                                        type="text"
                                        value={data.title}
                                        onChange={(val) => setData('title', val)}
                                        required
                                        error={errors.title}
                                        placeholder="Enter title of the papier"
                                    />

                                </div>

                                {/* Email */}
                                <div>
                                    <GenericInput
                                        id="daysCount"
                                        label="Days Count"
                                        type="number"
                                        value={data.days_count}
                                        onChange={(val) => setData('days_count', val)}
                                        required
                                        error={errors.days_count}
                                        placeholder="example : 365 for 1 year"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <GenericInput
                                        id="last_notification"
                                        label="Last Notification"
                                        type="date"
                                        value={data.last_notification}
                                        onChange={(val) => setData('last_notification', val)}
                                        required
                                        error={errors.last_notification}
                                        placeholder="Last time you were notified"
                                    />
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


                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-3 border-t dark:border-gray-700 pt-6">
                                    <Link
                                        href={route('papiers.index')}
                                        className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600
                                                 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium
                                                 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                                 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Saving...' : 'Update Papier'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
