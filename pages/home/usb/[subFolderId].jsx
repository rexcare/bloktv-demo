import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import path from 'path';
import HomeLayout from '../../../components/homeLayout';
import videogame from '../../../public/games.png';
import stream from '../../../public/streaming-logo.png';
import IconCard from '../../../components/IconCard';
import folder from '../../../public/folder.svg';
import video from '../../../public/video.svg';
import image from '../../../public/image.svg';

const SubFolder = () => {
  const [usbContents, setUsbContents] = useState([]);
  const router = useRouter();
  const { dir } = router.query;
  // IconCard component definition

  const fetchUsbContents = async (dirPath = '') => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/usb-contents?dir=${dirPath}`
      );
      const data = await res.json();
      setUsbContents(data);
    } catch (err) {
      console.error('Error fetching USB contents:', err);
    }
  };

  useEffect(() => {
    fetchUsbContents(dir || '');
  }, [dir]);

  const handleFileClick = (filePath) => {
    const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.webm', '.flv'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const fileExtension = path.extname(filePath).toLowerCase();

    if (videoExtensions.includes(fileExtension)) {
      const videoUrl = `http://localhost:5000/files${filePath}`;
      router.push(`/playVideo?videoUrl=${encodeURIComponent(videoUrl)}`);
    } else if (imageExtensions.includes(fileExtension)) {
      const imageUrl = `http://localhost:5000/files${filePath}`;
      router.push(`/viewImage?imageUrl=${encodeURIComponent(imageUrl)}`);
    } else {
      window.open(
        `http://localhost:5000/files${filePath}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const videos = [
    { name: 'Video 1' },
    { name: 'Video 2' },
    { name: 'Video 3' },
    { name: 'Video 4' },
  ];
  const images = [
    { name: 'Image 1' },
    { name: 'Image 2' },
    { name: 'Image 3' },
    { name: 'Image 3' },
  ];

  return (
    <HomeLayout title='USB'>
      <h1 className='mb-6 text-2xl font-bold text-white'>Folder 1</h1>
      <div className='grid w-full grid-cols-4 gap-x-4 h-fit'>
        {videos.map(({ name }, i) => {
          return (
            <div className='col-span-1 '>
              <IconCard
                IconComponent={video}
                text2={name}
                style={{ backgroundImage: `url('../../image.jfif')` }}
              />
            </div>
          );
        })}
      </div>
      <div className='grid w-full grid-cols-4 gap-x-4 h-fit'>
        {images.map(({ name }, i) => {
          return (
            <div className='col-span-1 '>
              <IconCard
                IconComponent={image}
                text2={name}
                bgColorClass='bg-[#240D50]'
              />
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
};

export default SubFolder;
