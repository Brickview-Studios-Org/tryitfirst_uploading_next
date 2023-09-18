import React from 'react';

interface TextFieldProps {
  name: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ name, placeholder, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={name}>
        {placeholder}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="border p-2 w-full text-gray-900"
      />
    </div>
  );
};

export default TextField;
