import React from 'react';
import Link from 'next/link';
import HomeLayout from '../../components/homeLayout';
import folder from '../../public/folder.svg';
import video from '../../public/video.svg';
import image from '../../public/image.svg';
import IconCard from '../../components/IconCard';

const UsbDrive = () => {
  const folders = [
    { name: 'Sub Folder 1' },
    { name: 'Sub Folder 2' },
    { name: 'Sub Folder 3' },
  ];
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
      <h1 className='mb-6 text-2xl font-bold text-white'>Folder1</h1>
      <div className='grid w-full grid-cols-3 gap-4 h-fit'>
        {/* Icon Cards */}
        {folders.map(({ name }, i) => {
          return (
            <div className='col-span-1 '>
              <Link className='focusable' href={`/home/usb/${i}`}>
                <IconCard
                  IconComponent={folder}
                  text={name}
                  bgColorClass='bg-[#240D50]'
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className='grid w-full grid-cols-4 gap-4 h-fit'>
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
      <div className='grid w-full grid-cols-4 gap-4 h-fit'>
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

export default UsbDrive;
