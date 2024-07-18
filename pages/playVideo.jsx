import React from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

const PlayVideo = () => {
  const router = useRouter();
  const { videoUrl } = router.query;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Playing Video</h1>
      {videoUrl ? (
        <ReactPlayer url={decodeURIComponent(videoUrl)} controls width="100%" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlayVideo;

