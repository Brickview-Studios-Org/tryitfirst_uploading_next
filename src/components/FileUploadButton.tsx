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
    <div className="mb-4">
      <label className="text-lg font-semibold">{fileName.toUpperCase()}</label>
      <input
        className="block mt-1"
        type="file"
        accept={fileType}
        onChange={(e) => handleFileChange(e, fileName)}
      />
      <button
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        type="button"
        onClick={() => handleUpload(bucketName, fileName)}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default FileUploadButton;
