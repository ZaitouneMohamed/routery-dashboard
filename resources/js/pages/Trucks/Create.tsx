import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, MessageSquareQuote, Truck, TypeOutlineIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import GenericInput from '@/components/GenericInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        matricule: '',
        consommation: '',
        marque: '',
        genre: '',
        type_carburant: '',
        n_chasie: '',
        puissanse_fiscale: "",
        premier_mise:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('trucks.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Add Truck" />

            <div className="p-6 dark:bg-gray-900">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <Link
                                        href={route('drivers.index')}
                                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-1" />
                                        Back to List
                                    </Link>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Add New Truck
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <GenericInput
                                        id="matricule"
                                        label="Matricule"
                                        type="text"
                                        value={data.matricule}
                                        onChange={(val) => setData('matricule', val)}
                                        required
                                        error={errors.matricule}
                                        icon={<Truck className="w-5 h-5 text-gray-400" />}
                                        placeholder="Enter truck matricule"
                                    />
                                </div>

                                {/* Email */}
                                <div>

                                    <GenericInput
                                        id="marque"
                                        label="marque"
                                        type="text"
                                        value={data.marque}
                                        onChange={(val) => setData('marque', val)}
                                        required
                                        error={errors.marque}
                                        icon={<MessageSquareQuote className="w-5 h-5 text-gray-400" />}
                                        placeholder="Enter truck marque"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <GenericInput
                                        id="type"
                                        label="type"
                                        type="text"
                                        value={data.genre}
                                        onChange={(val) => setData('genre', val)}
                                        required
                                        error={errors.genre}
                                        icon={<TypeOutlineIcon className="w-5 h-5 text-gray-400" />}
                                        placeholder="Enter truck type"
                                    />
                                </div>

                                {/* Code */}
                                <div>
                                    <label htmlFor="type_carburant" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    type carburant
                                    </label>
                                    <input
                                        type="text"
                                        id="type_carburant"
                                        placeholder='type carburant'
                                        value={data.type_carburant}
                                        onChange={e => setData('type_carburant', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600
                                                 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700
                                                 dark:text-white text-sm"
                                    />
                                    {errors.type_carburant && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                                    )}
                                </div>

                                {/* Two columns for CNI and CNSS */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {/* CNI */}
                                    <div>
                                        <GenericInput
                                            id="nchasie"
                                            label="Numero chasie"
                                            type="text"
                                            value={data.n_chasie}
                                            onChange={(val) => setData('n_chasie', val)}
                                            required
                                            error={errors.n_chasie}
                                            icon=""
                                            placeholder="Enter truck numero chasie"
                                        />
                                    </div>

                                    {/* CNSS */}
                                    <div>
                                         <GenericInput
                                            id="puissanse_fiscale"
                                            label="puissanse fiscale"
                                            type="text"
                                            value={data.puissanse_fiscale}
                                            onChange={(val) => setData('puissanse_fiscale', val)}
                                            required
                                            error={errors.puissanse_fiscale}
                                            icon=""
                                            placeholder="Enter truck puissanse fiscale"
                                        />

                                    </div>
                                    {/* CNSS */}
                                    <div>
                                        <label htmlFor="premier_mise" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        premier mise
                                        </label>
                                        <input
                                            type="date"
                                            placeholder='premier mise'
                                            id="premier_mise"
                                            value={data.premier_mise}
                                            onChange={e => setData('premier_mise', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                        {errors.premier_mise && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cnss}</p>
                                        )}
                                    </div>
                                    {/* CNSS */}
                                    <div>
                                        <label htmlFor="consommation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        consommation
                                        </label>
                                        <input
                                            type="text"
                                            placeholder='consommation'
                                            id="consommation"
                                            value={data.consommation}
                                            required
                                            onChange={e => setData('consommation', e.target.value)}
                                            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
                                                shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
                                                focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                                        />
                                        {errors.consommation && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cnss}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-3 border-t dark:border-gray-700 pt-6">
                                    <Link
                                        href={route('drivers.index')}
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
                                        {processing ? 'Saving...' : 'Save Driver'}
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
