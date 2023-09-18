import React from 'react';

interface TextFieldProps {
  name: string;
  placeholder: string;
  fieldType: string;
  isRequired: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ name, placeholder, fieldType, isRequired, handleChange }) => {
  return (
    <div className='flex flex-col gap-2 pb-2 w-full'>
      <label className="block text-gray-500 font-semibold" htmlFor={name}>
        {placeholder}
      </label>
      <input
        type={fieldType? fieldType : "text"}
        required={isRequired? isRequired : true}
        name={name}
        id={name}
        placeholder={"Enter " + placeholder.toLowerCase()}
        onChange={handleChange}
        className="p-2 w-full text-gray-900 rounded-xl shadow-md placeholder:italic placeholder:text-sm"
      />
    </div>
  );
};

export default TextField;
