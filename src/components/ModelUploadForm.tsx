'use client';
import React, { useState } from 'react';
import axios from 'axios';
import FileUploadButton from './FileUploadButton';
import TextField from './TextField';

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
  const [fields, setFields] = useState({
    brandID: '',
    name: '',
    description: '',
    price: '',
    currency: '',
    discountPercent: '',
    discountedPrice: '',
    category: '',
    weight: '',
    materials: '',
    height: '',
    width: '',
    length: '',
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

  const isFormValid = () => {
    return Object.values(fields).every(Boolean) && Object.values(files).every(Boolean);
  };

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
    console.log(files)
  };

  const handleUpload = async (bucketName: string, fileName: string) => {
    const fileType = fileTypes[fileName];
    // Get signed URL from your backend
    const response = await axios.get('https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/get_signed_url', {
      params: { bucket_name: bucketName, file_type: fileType }
    });
    const { upload_url } = response.data;
    const { file_key } = response.data;

    console.log("signed url response " )
    console.log(response.data)
    console.log("the file going to be uploaded " )
    console.log( files[fileName])
    // Upload file to S3 using signed URL
    await axios.put(upload_url, files[fileName]);

    // Store the file URL or any other action you want to perform after uploading
    await setFields({ ...fields, [fileName]: `https://${bucketName}.s3.amazonaws.com/${file_key}` });

    console.log(fields);
  };

  const handleSubmit = async () => {
    // Submit all data to your backend
    if (isFormValid()) {
      console.log(fields)
    await axios.post('https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/add_product', fields);
    }
  };

  return (
    <div className="p-8 bg-gray-200">
      <form>
      <TextField name="brandID" placeholder="Brand ID" handleChange={handleChange} />
      <TextField name="name" placeholder="Name" handleChange={handleChange} />
      <TextField name="description" placeholder="Description" handleChange={handleChange} />
      <TextField name="price" placeholder="Price" handleChange={handleChange} />
      <TextField name="currency" placeholder="Currency" handleChange={handleChange} />
      <TextField name="discountPercent" placeholder="Discount Percent" handleChange={handleChange} />
      <TextField name="discountedPrice" placeholder="Discounted Price" handleChange={handleChange} />
      <TextField name="category" placeholder="Category" handleChange={handleChange} />
      <TextField name="weight" placeholder="Weight" handleChange={handleChange} />
      <TextField name="materials" placeholder="Materials" handleChange={handleChange} />
      <TextField name="height" placeholder="Height" handleChange={handleChange} />
      <TextField name="width" placeholder="Width" handleChange={handleChange} />
      <TextField name="length" placeholder="Length" handleChange={handleChange} />
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
        <FileUploadButton 
          file={files.glb}
          bucketName="tryitproductmodels"
          fileType={fileTypes.glb}
          fileName="glb"
          buttonLabel="Upload"
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />

         <FileUploadButton 
          file={files.usdz}
          bucketName="tryitproductmodels"
          fileType={fileTypes.usdz}
          fileName="usdz"
          buttonLabel="Upload"
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
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
