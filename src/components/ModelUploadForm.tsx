'use client';
import React, { useState } from 'react';
import axios from 'axios';
import FileUploadButton from './FileUploadButton';

interface IFields {
  name: string;
  description: string;
  price: string;
  [key: string]: string;
}

interface IFiles {
  poster: File | null;
  glb: File | null;
  usdz: File | null;
  [key: string]: File | null; 
}

interface IFileTypes {
  poster: string;
  glb: string;
  usdz: string;
  [key: string]: string;
}

const ModelUploadForm: React.FC = () => {
  const [fields, setFields] = useState<IFields>({
    name: '',
    description: '',
    price: ''
  });

  const [files, setFiles] = useState<IFiles>({
    poster: null,
    glb: null,
    usdz: null
  });

  const [fileTypes, setFileTypes] = useState<IFileTypes>({
    poster: '',
    glb: '',
    usdz: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.name.split('.').pop() || '';
      setFiles({ ...files, [fileName]: file });
      setFileTypes({ ...fileTypes, [fileName]: fileType });
    }
  };

  const handleUpload = async (bucketName: string, fileName: string) => {
    const fileType = fileTypes[fileName];
    // Get signed URL from your backend
    const response = await axios.get('https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/get_signed_url', {
      params: { bucket_name: bucketName, file_type: fileType }
    });
    const { upload_url } = response.data;

    console.log(response.data)
    // Upload file to S3 using signed URL
    await axios.put(upload_url, files[fileName]);

    // Store the file URL or any other action you want to perform after uploading
    setFields({ ...fields, [fileName]: `https://${bucketName}.s3.amazonaws.com/${fileName}.${fileType}` });
  };

  const handleSubmit = async () => {
    // Submit all data to your backend
    await axios.post('https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/add_product', fields);
  };

  return (
    <div className="p-8 bg-gray-200">
      <form>
        <input 
          type="text" 
          name="name" 
          placeholder="Item Name" 
          onChange={handleChange} 
          className="block mb-4 p-2 w-full border rounded"
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Description" 
          onChange={handleChange} 
          className="block mb-4 p-2 w-full border rounded"
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price" 
          onChange={handleChange} 
          className="block mb-4 p-2 w-full border rounded"
        />
        <FileUploadButton 
          file={files.poster}
          bucketName="tryitproductimages"
          fileType={fileTypes.poster}
          fileName="poster"
          buttonLabel="Upload"
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
        {/* Add buttons for 'glb' and 'usdz' */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          type="button"
          onClick={handleSubmit}
        >
          Submit All Data
        </button>
      </form>
    </div>
  );
};

export default ModelUploadForm;
