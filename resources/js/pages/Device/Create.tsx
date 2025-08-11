import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import GenericInput from '@/components/GenericInput';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm<Record<string, any>>({
    name: '',
    type: '',
    vehicle_id: 2,
    sim_number: '',
    imei: '',
    status: 'active',
    last_communication_at: '',
    installed_at: '',
    firmware_version: '',
    ip_address: '',
    location: '',
    notes: '',
    image: null,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });
    post(route('device.store'), {
      forceFormData: true,
      onSuccess: (page) => {
        // If backend returns image URL, set it
        if ((page.props.device as any)?.image_url) {
          setImageUrl((page.props.device as any).image_url);
        }
        reset('image');
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData('image', e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <DashboardLayout>
      <Head title="Add Device" />
      <div className="p-6 dark:bg-gray-900 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={route('dashboard')}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </Link>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Device</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <GenericInput
                        id="name"
                        label="Device Name"
                        type="text"
                        value={data.name}
                        onChange={(val) => setData('name', val)}
                        required
                        error={errors.name}
                        placeholder="Enter name of the device"
                    />
                </div>
                {/* Type */}
                <div>
                  <GenericInput
                        id="name"
                        label="Device type"
                        type="text"
                        value={data.type}
                        onChange={(val) => setData('type', val)}
                        required
                        error={errors.type}
                        placeholder="Enter type of the device"
                    />

                </div>
                {/* SIM Number */}
                <div>
                    <GenericInput
                            id="sim_number"
                            label="SIM Number"
                            type="text"
                            value={data.sim_number}
                            onChange={(val) => setData('sim_number', val)}
                            required
                            error={errors.sim_number}

                            placeholder="Enter SIM number of the device"
                        />
                </div>
                {/* IMEI */}
                <div>
                    <GenericInput
                            id="imei"
                            label="IMEI"
                            type="text"
                            value={data.imei}
                            onChange={(val) => setData('imei', val)}
                            required
                            error={errors.imei}
                            icon={<Phone className="h-5 w-5 text-gray-400" />}
                            placeholder="Enter IMEI of the device"
                        />
                </div>
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
              focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                  {errors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>}
                </div>
                {/* Installed At */}
                <div>
                    <GenericInput
                        id="date"
                        label="installed at"
                        type="date"
                        value={data.installed}
                        onChange={(val) => setData('installed', val)}
                        required
                        error={errors.installed}
                        placeholder="Enter installation date of the device"
                    />
                </div>
                {/* Firmware Version */}
                <div>
                  <GenericInput
                        id="firmware_version"
                        label="Firmware Version"
                        type="text"
                        value={data.firmware_version}
                        onChange={(val) => setData('firmware_version', val)}
                        required
                        error={errors.firmware_version}
                        placeholder="Enter firmware version of the device"
                    />

                </div>
                {/* IP Address */}
                <div>
                  <GenericInput
                        id="ip_address"
                        label="IP address"
                        type="text"
                        value={data.ip_address}
                        onChange={(val) => setData('ip_address', val)}
                        required
                        error={errors.ip_address}
                        placeholder="Enter IP address of the device"
                    />

                </div>
                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                  <textarea
                    id="notes"
                    value={data.notes}
                    onChange={e => setData('notes', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.notes && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.notes}</p>}
                </div>
                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Device Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="pl-5 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
              focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
                  />
                  {imageUrl && (
                    <img src={imageUrl} alt="Device" className="mt-2 rounded shadow max-h-40" />
                  )}
                  {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                </div>
                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-3 border-t dark:border-gray-700 pt-6">
                  <Link
                    href={route('dashboard')}
                    className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Saving...' : 'Save Device'}
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
