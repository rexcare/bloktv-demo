import React from 'react';
import Image from 'next/image';
import NetworkLayout from '../components/networkLayout';

const UsbDrive = () => {
  const routes = [
    {
      label: 'Wifi Name',
      href: '',
      icon: null,
    },
    {
      label: 'Folder 2',
      href: '',
      icon: null,
    },
    { label: 'Folder 3', href: '', icon: null },
    { label: 'Folder 4', href: '', icon: null },
  ];

  return (
    <NetworkLayout title='Network' routes={routes}>
      <div className='flex flex-col items-center justify-center'>
        <Image
          className='p-2'
          src='/wifi-svg.png'
          width={500}
          height={400}
          alt='Logo'
        />
        <div className='flex flex-col items-center justify-center gap-2'>
          <span className='text-white text-[24px]  mt-10'>
            Enter the password for Wifi
          </span>
          <div className='relative'>
            <div
              className='h-16 w-96'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                background: `linear-gradient(155deg, #584FCC -20%, rgba(88, 79, 100, 0) 80%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 100, 0) 58.49%)`,
              }}
            ></div>
            <div
              className='absolute h-[58px] w-[376px] bg-[#0C0022] top-1 left-1 flex justify-center items-center px-8'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
              }}
            >
              <input
                type='password'
                className='w-full h-8 text-white bg-transparent border-none focus:outline-none focus:shadow-outline'
              />
            </div>
          </div>
          <div className='flex items-center w-full gap-x-2'>
            <input id='showpassword' type='checkbox' />
            <label for='showpassword' className='text-white text-[18px]'>
              Show password
            </label>
          </div>
        </div>
      </div>
    </NetworkLayout>
  );
};

export default UsbDrive;
