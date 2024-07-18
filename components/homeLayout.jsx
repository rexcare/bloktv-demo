import React from 'react';

// Importing custom components
import TopBar from './topBar/topBar';
import Sidebar from './sideBar/usbSidebar';
// HomePage component definition

const HomeLayout = ({ children, title = '' }) => {
  return (
    <div className='px-12 xl:px-32 h-[100vh]'>
      <TopBar
        logo={<span className='text-white text-[64px] px-20'>{title}</span>}
      />

      <div className='relative flex flex-row overflow-auto gap-x-2 xl:gap-x-4'>
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className='w-full pt-1 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
