import React from 'react';
import Image from 'next/image';

// Importing custom components
import TopBar from './topBar/topBar';
import Sidebar from './sideBar/sidebar';
import {
  faHouse,
  faRetweet,
  faMicrophoneLines,
  faGear,
  faStore,
} from '@fortawesome/free-solid-svg-icons';

// HomePage component definition
const MainLayout = ({ children }) => {
  const routes = [
    { label: 'Home', href: '/', icon: faHouse },
    {
      label: 'BlokTv Content Replacement',
      href: '/replace',
      icon: faRetweet,
    },
    {
      label: 'BlokTv App Store',
      href: 'https://bloktv-appstore.vercel.app/',
      icon: faStore,
    },
    { label: 'BlokTv Studio', href: '/studio', icon: faMicrophoneLines },
    { label: 'Settings', href: '/settings', icon: faGear },
  ];
  return (
    <div className='px-12 xl:px-32 h-[100vh]'>
      <TopBar
        logo={
          <Image
            className='object-scale-down h-48 p-2 w-90'
            src='/logo-bloktv-1@2x.png'
            width={250}
            height={500}
            alt='Logo'
          />
        }
      />

      <div className='relative flex flex-row overflow-auto gap-x-2 xl:gap-x-4'>
        {/* Sidebar Navigation */}
        <Sidebar routes={routes} />

        {/* Main Content Area */}
        <div className='w-full overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
