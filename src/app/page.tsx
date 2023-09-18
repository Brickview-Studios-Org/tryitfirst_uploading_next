import React from 'react';
import ModelUploadForm from '../components/ModelUploadForm';

const Page: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Upload Your Model</h1>
      <ModelUploadForm />
    </div>
  );
};

export default Page;
