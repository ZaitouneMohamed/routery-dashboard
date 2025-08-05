import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { User, Mail, Phone, Key, FileText, Shield, Image as ImageIcon } from 'lucide-react';

interface DriverFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function DriverForm({ onClose, onSuccess }: DriverFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: '',
    email: '',
    phone: '',
    code: '',
    cni: '',
    cnss: '',
    image: null as File | null,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('drivers.store'), {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Add New Driver</h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">Fill in the details below to add a new driver.</p>
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="pl-10 py-3 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-base transition"
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
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <ImageIcon className="h-6 w-6 text-gray-400" />
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
      {/* Form Actions */}
      <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-between sm:space-x-reverse sm:space-x-3">
        <button
          type="submit"
          disabled={processing}
          className="w-full sm:w-auto mb-3 sm:mb-0 inline-flex justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white font-medium rounded-md border border-transparent shadow-sm transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Saving...' : 'Save Driver'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium transition ease-in duration-200 shadow-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
