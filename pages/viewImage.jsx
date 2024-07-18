import React from 'react';
import { useRouter } from 'next/router';

const ViewImage = () => {
  const router = useRouter();
  const { imageUrl } = router.query;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Viewing Image</h1>
      {imageUrl ? (
        <div className="flex justify-center">
          <img src={decodeURIComponent(imageUrl)} alt="Image" className="max-w-full h-auto" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewImage;

