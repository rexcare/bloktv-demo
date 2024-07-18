import React from 'react';
import GameLayout from '../../components/gameLayout';

const UsbDrive = () => {
  return (
    <GameLayout>
      <div className='flex flex-col items-center justify-center text-white gap-y-10'>
        <h2 className=' text-[56px]'>Game Fusion by BlokTV</h2>
        <span className=' text-[30px]'>Choose Platform</span>
        <div className='flex flex-row items-center justify-center text-white gap-x-10'>
          <div className='relative flex items-center justify-center'>
            <div
              className='h-[242px] w-[420px]'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                background: `linear-gradient(155deg, #584FCC -20%, rgba(88, 79, 100, 0) 80%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 100, 0) 58.49%)`,
              }}
            ></div>
            <div
              className='absolute h-[236px] w-[414px] bg-[#240D50] top-[3px] left-[3px]'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
              }}
            ></div>
            <span className='absolute top-[60px] text-[80px]'>ARES</span>
          </div>
          <span className='text-[20px]'>OR</span>
          <div className='relative flex items-center justify-center'>
            <div
              className='h-[242px] w-[420px]'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                background: `linear-gradient(155deg, #584FCC -20%, rgba(88, 79, 100, 0) 80%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 100, 0) 58.49%)`,
              }}
            ></div>
            <div
              className='absolute h-[236px] w-[414px] bg-[#240D50] top-[3px] left-[3px]'
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
              }}
            ></div>
            <span className='absolute top-[40px] text-[70px]'>Custom</span>
            <span className='absolute top-[100px] text-[70px]'>MicroSD</span>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default UsbDrive;
