import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FaSpinner className="text-4xl text-primary animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
