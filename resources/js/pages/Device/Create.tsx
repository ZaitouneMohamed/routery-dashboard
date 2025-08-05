import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/layouts/app-layout';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                {/* Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                  <input
                    type="text"
                    id="type"
                    value={data.type}
                    onChange={e => setData('type', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    required
                  />
                  {errors.type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                </div>
                {/* Vehicle ID */}
                <div>
                  <label htmlFor="vehicle_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle ID</label>
                  <input
                    type="text"
                    id="vehicle_id"
                    value={data.vehicle_id}
                    onChange={e => setData('vehicle_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.vehicle_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.vehicle_id}</p>}
                </div>
                {/* SIM Number */}
                <div>
                  <label htmlFor="sim_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SIM Number</label>
                  <input
                    type="text"
                    id="sim_number"
                    value={data.sim_number}
                    onChange={e => setData('sim_number', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.sim_number && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sim_number}</p>}
                </div>
                {/* IMEI */}
                <div>
                  <label htmlFor="imei" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IMEI</label>
                  <input
                    type="text"
                    id="imei"
                    value={data.imei}
                    onChange={e => setData('imei', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.imei && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.imei}</p>}
                </div>
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                  {errors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>}
                </div>
                {/* Last Communication At */}
                <div>
                  <label htmlFor="last_communication_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Communication</label>
                  <input
                    type="datetime-local"
                    id="last_communication_at"
                    value={data.last_communication_at}
                    onChange={e => setData('last_communication_at', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.last_communication_at && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.last_communication_at}</p>}
                </div>
                {/* Installed At */}
                <div>
                  <label htmlFor="installed_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Installed At</label>
                  <input
                    type="date"
                    id="installed_at"
                    value={data.installed_at}
                    onChange={e => setData('installed_at', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.installed_at && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.installed_at}</p>}
                </div>
                {/* Firmware Version */}
                <div>
                  <label htmlFor="firmware_version" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Firmware Version</label>
                  <input
                    type="text"
                    id="firmware_version"
                    value={data.firmware_version}
                    onChange={e => setData('firmware_version', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.firmware_version && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firmware_version}</p>}
                </div>
                {/* IP Address */}
                <div>
                  <label htmlFor="ip_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IP Address</label>
                  <input
                    type="text"
                    id="ip_address"
                    value={data.ip_address}
                    onChange={e => setData('ip_address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.ip_address && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ip_address}</p>}
                </div>
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    id="location"
                    value={data.location}
                    onChange={e => setData('location', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
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
                    className="mt-1 block w-full text-sm text-gray-700 dark:text-gray-300"
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
