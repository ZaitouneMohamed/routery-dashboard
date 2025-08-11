import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { Building, ChevronLeft, TrainTrackIcon } from 'lucide-react';
import GenericInput from '@/components/GenericInput';

export default function Edit({ item }) {
    const { data, setData, put, processing, errors } = useForm({
        name: item.data.name || '',
        km_proposer: item.data.km_proposer || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('city.update', item.data.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit City" />

            <div className="p-6 dark:bg-gray-900">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <Link
                                        href={route('city.index')}
                                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-1" />
                                        Back to List
                                    </Link>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Edit city: {item.data.n_bon}
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <GenericInput
                                        id="name"
                                        label="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(val) => setData('name', val)}
                                        required
                                        error={errors.name}
                                        icon={<Building className="w-5 h-5 text-gray-400" />}
                                        placeholder="Enter city name"
                                    />

                                </div>

                                <div>
                                    <GenericInput
                                        id="km_proposer"
                                        label="KM Proposer"
                                        type="number"
                                        value={data.km_proposer}
                                        onChange={(val) => setData('km_proposer', val)}
                                        required
                                        error={errors.km_proposer}
                                        icon={<TrainTrackIcon className="w-5 h-5 text-gray-400" />}
                                        placeholder="Enter KM Proposer"
                                    />
                                </div>
                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-3 border-t dark:border-gray-700 pt-6">
                                    <Link
                                        href={route('city.index')}
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
                                        {processing ? 'Saving...' : 'Update city'}
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
