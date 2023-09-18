import React from 'react';

interface FileUploadButtonProps {
  file: File | null;
  bucketName: string;
  fileType: string;
  fileName: string;
  buttonLabel: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fileName: string) => void;
  handleUpload: (bucketName: string, fileName: string) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ file, bucketName, fileType, fileName, buttonLabel, handleFileChange, handleUpload }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block text-gray-500 font-semibold">{"Product " + fileName.toUpperCase()}</label>
      <div className='flex p-2 gap-2 justify-center items-center border border-blue-500 rounded-lg'>
        <input
          className="flex w-full"
          type="file"
          accept={fileType}
          onChange={(e) => handleFileChange(e, fileName)}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg"
          type="button"
          onClick={() => handleUpload(bucketName, fileName)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default FileUploadButton;
