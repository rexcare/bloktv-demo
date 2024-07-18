import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsSearch, BsWifi, BsBell } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import Clock from './topBarClock';

const GameTopBar = ({ isReplacementModeOn, logo }) => {
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
          <div className='text-white text-[24px] flex flex-row items-center gap-x-6'>
            <Link href='/'>Home</Link>
            <div className='flex flex-row items-center justify-between gap-x-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <span>Live</span>
            </div>
            <div className='relative flex items-center justify-center'>
              <div
                className='h-[42px] w-[120px]'
                style={{
                  clipPath:
                    'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                  background: `linear-gradient(155deg, #584FCC -20%, rgba(88, 79, 100, 0) 80%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 100, 0) 58.49%)`,
                }}
              ></div>
              <div
                className='absolute h-[36px] w-[114px] bg-[#0C0022] top-[3px] left-[3px]'
                style={{
                  clipPath:
                    'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                }}
              ></div>
              <span className='absolute top-[6px]'>Apps</span>
            </div>
            <span>Library</span>
          </div>
          <Link className='focusable' href='/' passHref>
            {logo}
          </Link>

          {/* Navigation Icons */}
          <div className='flex items-center space-x-8'>
            {/* Search Icon */}
            <Link className='focusable' href='/' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform'>
                <BsSearch color='white' fontSize={20} />
              </div>
            </Link>

            {/* Wifi Icon */}
            <Link className='focusable' href='/networks' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform'>
                <BsWifi color='white' fontSize={20} />
              </div>
            </Link>

            {/* Bell Icon */}

            <Link className='focusable' href='/' passHref>
              <div className='bg-[#584FCC80] p-3 rounded-full cursor-pointer transition duration-500 hover:scale-105 transform'>
                <BsBell color='white' fontSize={20} />
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

export default GameTopBar;
