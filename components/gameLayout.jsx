import React from 'react';
import Image from 'next/image';

// Importing custom components
import TopBar from './topBar/gameTopBar';

// HomePage component definition
const GameLayout = ({ children }) => {
  return (
    <div className='px-12 overflow-auto xl:px-20 h-[100vh]'>
      <TopBar
        logo={
          <Image
            className='object-scale-down h-48 p-2 w-90'
            src='/logo-bloktv-1@2x.png'
            width={150}
            height={150}
            alt='Logo'
          />
        }
      />

      <div className='relative flex flex-row overflow-auto gap-x-2 xl:gap-x-4'>
        {/* Main Content Area */}
        <div className='w-full overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default GameLayout;
