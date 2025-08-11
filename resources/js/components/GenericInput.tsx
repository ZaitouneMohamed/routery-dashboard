import React from 'react';
import { Phone } from 'lucide-react';

type GenericInputProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: 'text' | 'date' | 'number';
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  icon?: React.ReactNode;
};

const GenericInput: React.FC<GenericInputProps> = ({
  id,
  label,
  value,
  onChange,
  type,
  required = false,
  error,
  placeholder,
  min,
  max,
  icon = <Phone className="h-5 w-5 text-gray-400" />,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'date':
        return (
          <input
            type="date"
            id={id}
            required={required}
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
              focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={id}
            required={required}
            placeholder={placeholder}
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
              focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
          />
        );
      default:
        return (
          <input
            type="text"
            id={id}
            required={required}
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 py-3 w-full rounded-lg border-gray-300 dark:border-gray-600
              shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500
              focus:ring-opacity-50 dark:bg-gray-700 dark:text-white text-base"
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        {renderInput()}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default GenericInput;
