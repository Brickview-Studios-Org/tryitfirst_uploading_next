import React from 'react';

interface FormSegmentProps {
  segmentHeader: string
  children: React.ReactNode
}

const FormSegment: React.FC<FormSegmentProps> = ({ segmentHeader, children }) => {
  return (
    <div className='flex flex-col rounded-2xl bg-gray-200 shadow-lg overflow-clip'>
        {/* Segment Header */}
        <div className='flex px-4 py-2 w-full bg-blue-500 text-white'>
            <h1 className='text-lg font-bold'>{segmentHeader}</h1>
        </div>

        {/* Segment Children */}
        <div className='flex flex-col px-4 py-2 gap-2'>
            {children}
        </div>
    </div>
  );
};

export default FormSegment;
