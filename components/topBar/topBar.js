import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch, BsWifi, BsBell } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import Clock from '../topBar/topBarClock';

const TopBar = ({ isReplacementModeOn, logo }) => {
  const [isInternetSwitchOn, setIsInternetSwitchOn] = useState(false);

  useEffect(() => {
    const storedInternetSwitchState = JSON.parse(
      localStorage.getItem('isInternetSwitchOn')
    );

    if (isReplacementModeOn) {
      setIsInternetSwitchOn(true);
      localStorage.setItem('isInternetSwitchOn', JSON.stringify(true));
    } else if (storedInternetSwitchState !== null) {
      setIsInternetSwitchOn(storedInternetSwitchState);
    } else {
      setIsInternetSwitchOn(false);
    }
  }, [isReplacementModeOn]);

  const handleInternetSwitch = () => {
    if (!isReplacementModeOn) {
      const newState = !isInternetSwitchOn;
      setIsInternetSwitchOn(newState);
      localStorage.setItem('isInternetSwitchOn', JSON.stringify(newState));

      if (newState) {
        // Set isReplacementModeOn and activeButton states in ReplacePage
        localStorage.setItem('isReplacementModeOn', JSON.stringify(true));
        localStorage.setItem('activeButton', 'Auto-Mute');
      } else {
        // Reset isReplacementModeOn and activeButton states in ReplacePage
        localStorage.removeItem('isReplacementModeOn');
        localStorage.removeItem('activeButton');
      }
    }
  };

  return (
    <nav className='py-6 xl:py-10 ont-sans'>
      <div className=''>
        {/* Container for logo and navigation icons */}
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link className='focusable' href='/' passHref>
            {logo}
          </Link>

          {/* Navigation Icons */}
          <div className='flex items-center space-x-8'>
            {/* Wifi Icon */}
            <Link className='focusable' href='/network' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform'>
                <BsWifi color='white' fontSize={20} />
              </div>
            </Link>

            {/* Bell Icon */}

            <Link className='focusable' href='/' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform relative'>
                <BsBell color='white' fontSize={20} />
                <div className='absolute top-0 right-0 w-4 h-4 text-center bg-red-600 rounded-full text-[14px]'>
                  2
                </div>
              </div>
            </Link>

            {/* Settings Icon */}
            <Link className='focusable' href='/' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform'>
                <AiTwotoneSetting color='white' fontSize={20} />
              </div>
            </Link>

            {/* Clock Component */}
            <Clock fontSize='1.4rem' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
