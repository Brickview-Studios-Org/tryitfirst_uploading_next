'use client';
import React, { useState } from 'react';
import axios from 'axios';
import FileUploadButton from './FileUploadButton';
import TextField from './TextField';
import FormSegment from './FormSegment';

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
    <div className="p-4">
      <form className='flex flex-col gap-8 w-full'>
        {/* Brand Details */}
        <FormSegment segmentHeader='Brand Details'>
          <TextField name="brandID" placeholder="Brand ID" fieldType='number' isRequired={true} handleChange={handleChange} />
        </FormSegment>
        
        {/*<div className='flex flex-col p-4 gap-2 rounded-xl border-[1px] border-blue-500 shadow-md'>
          <h1 className='text-xl font-bold text-gray-400'>Brand Details</h1>
          <TextField name="brandID" placeholder="Brand ID" fieldType='number' isRequired={true} handleChange={handleChange} />
        </div>*/}

        {/* Product Information */}
        <FormSegment segmentHeader='Product Information'>
          <div className='flex gap-4 w-full'>
            <TextField name="name" placeholder="Product Name" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="category" placeholder="Product Category" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="tags" placeholder="Product Tags" fieldType='text' isRequired={false} handleChange={handleChange} />
          </div>
          <TextField name="description" placeholder="Product Description" fieldType='text' isRequired={true} handleChange={handleChange} />
        </FormSegment>
        
        {/*<div className='flex flex-col p-4 gap-2 rounded-xl border-[1px] border-blue-500 shadow-md'>
          <h1 className='text-xl font-bold text-gray-400'>Product Information</h1>
          <div className='flex gap-4 w-full'>
            <TextField name="name" placeholder="Product Name" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="category" placeholder="Product Category" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="tags" placeholder="Product Tags" fieldType='text' isRequired={false} handleChange={handleChange} />
          </div>
          <TextField name="description" placeholder="Product Description" fieldType='text' isRequired={true} handleChange={handleChange} />          
        </div>*/}

        {/* Product Dimensions */}
        <FormSegment segmentHeader='Product Dimensions'>
          <div className='flex gap-4 w-full'>
            <TextField name="dimensionUnit" placeholder="Dimension Unit" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="length" placeholder="Product Length" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="width" placeholder="Product Width" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="height" placeholder="Product Height" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>
          <div className='flex gap-4 w-full'>
            <TextField name="weightUnit" placeholder="Weight Unit" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="weight" placeholder="Product Weight" fieldType='number' isRequired={true} handleChange={handleChange} />
          </div>          
        </FormSegment>
        
        {/*<div className='flex flex-col p-4 gap-2 rounded-xl border-[1px] border-blue-500 shadow-md'>
          <h1 className='text-xl font-bold text-gray-400'>Product Dimensions</h1>                    
          <div className='flex gap-4 w-full'>
            <TextField name="dimensionUnit" placeholder="Dimension Unit" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="length" placeholder="Product Length" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="width" placeholder="Product Width" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="height" placeholder="Product Height" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>
          <div className='flex gap-4 w-full'>
            <TextField name="weightUnit" placeholder="Weight Unit" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="weight" placeholder="Product Weight" fieldType='number' isRequired={true} handleChange={handleChange} />
          </div>
        </div>*/}

        {/* Product Showcase */}
        <FormSegment segmentHeader='Product Showcase'>
          <TextField name="materials" placeholder="Product Materials" fieldType='text' isRequired={false} handleChange={handleChange} />          
          <div className='flex gap-4 w-full'>
            <FileUploadButton 
              file={files.poster}
              bucketName="tryitproductimages"
              fileType={fileTypes.poster}
              fileName="poster"
              buttonLabel="Upload"
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />
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
          </div>          
        </FormSegment>
        
        {/*<div className='flex flex-col p-4 gap-2 rounded-xl border-[1px] border-blue-500 shadow-md'>
          <h1 className='text-xl font-bold text-gray-400'>Product Showcase</h1>
          <TextField name="materials" placeholder="Product Materials" fieldType='text' isRequired={false} handleChange={handleChange} />          
          <div className='flex gap-4 w-full'>
            <FileUploadButton 
              file={files.poster}
              bucketName="tryitproductimages"
              fileType={fileTypes.poster}
              fileName="poster"
              buttonLabel="Upload"
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />
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
          </div>
        </div>*/}

        {/* Product Pricing */}
        <FormSegment segmentHeader='Product Pricing'>
          <div className='flex gap-4 w-full'>
            <TextField name="currency" placeholder="Currency" fieldType='text' isRequired={true} handleChange={handleChange} />
            <TextField name="price" placeholder="Product Price" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>
          <div className='flex gap-4 w-full'>
            <TextField name="discountPercent" placeholder="Discount Percent (%)" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="discountedPrice" placeholder="Discounted Price" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>          
        </FormSegment>
        
        {/*<div className='flex flex-col p-4 gap-2 rounded-xl border-[1px] border-blue-500 shadow-md'>
          <h1 className='text-xl font-bold text-gray-400'>Product Pricing</h1>          
          <div className='flex gap-4 w-full'>
            <TextField name="currency" placeholder="Currency" handleChange={handleChange} />
            <TextField name="price" placeholder="Product Price" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>
          <div className='flex gap-4 w-full'>
            <TextField name="discountPercent" placeholder="Discount Percent (%)" fieldType='number' isRequired={true} handleChange={handleChange} />
            <TextField name="discountedPrice" placeholder="Discounted Price" fieldType='number' isRequired={true} handleChange={handleChange} />            
          </div>
        </div>*/}        
        
        <button
          className="px-4 py-4 mb-4 bg-green-500 text-white rounded-xl"
          type="button"
          onClick={handleSubmit}
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ModelUploadForm;
