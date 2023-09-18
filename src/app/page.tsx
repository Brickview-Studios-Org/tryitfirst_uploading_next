import React from 'react';
import ModelUploadForm from '../components/ModelUploadForm';

const Page: React.FC = () => {
  return (
    <main className='flex flex-col bg-gray-600'>
      {/* Header Section */}
      <section className='sticky top-0 flex w-full px-4 py-2 gap-4 items-center rounded-b-lg shadow-lg bg-white z-10'>
        <h1 className="text-xl font-bold text-blue-500">TryItFirst</h1>
        <h1 className="text-md font-light">Product Dashboard</h1>
      </section>
      
      {/* Form Section */}
      <section>
        <ModelUploadForm />
      </section>
    </main>
  );
};

export default Page;
