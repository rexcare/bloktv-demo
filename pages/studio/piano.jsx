import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameLayout from '../../components/gameLayout';
import piano from '../../public/piano.svg';

const UsbDrive = () => {
  return (
    <GameLayout>
      <h2 className='text-white text-[56px]'>BlokTV Studio</h2>
      <div className='flex flex-col items-center justify-center text-white gap-y-10'>
        <div className='text-[50px] flex flex-col items-center justify-center'>
          <Image src={piano} width={100} height={75} alt={'Logos'} />
          <span>Piano</span>
        </div>
        <div className='flex flex-row items-center justify-center text-white gap-x-10'>
          <Link href={'/studio/karaoke'}>
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
              <div className='absolute top-[50px] text-[50px] flex flex-col items-center justify-center'>
                <span>Freesyle</span>
                <span>Mode</span>
              </div>
            </div>
          </Link>
          <span className='text-[20px]'>OR</span>
          <Link href={'/studio/piano'}>
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
              <div className='absolute top-[50px] text-[50px] flex flex-col items-center justify-center'>
                <span>Karaoke</span>
                <span>Mode</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </GameLayout>
  );
};

export default UsbDrive;
