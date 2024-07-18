import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { FaRegKeyboard } from 'react-icons/fa';
import { BsMic } from 'react-icons/bs';
import { PiSquaresFour } from 'react-icons/pi';
import { RiShutDownLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { PiPlayPauseFill } from 'react-icons/pi';

const MobileRemote = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center">
      {/* User Info */}
      <div className="text-lg text-white font-semibold py-4">User BlokTV</div>

      {/* Navbar with 5 icons */}
      <div className="flex justify-between w-full p-4 bg-[#240D50] rounded-lg">
        <div className="w-1/6 flex justify-center items-center">
          <FiSettings color='white'/>
        </div>
        <div className="w-1/6 flex justify-center items-center">
          <FaRegKeyboard color='white' />
        </div>
        <div className="w-1/6 flex justify-center items-center">
          <BsMic color='white' />
        </div>
        <div className="w-1/6 flex justify-center items-center">
          <PiSquaresFour color='white' />
        </div>
        <div className="w-1/6 flex justify-center items-center">
          <RiShutDownLine color='white' />
        </div>
      </div>

      <div className="bg-[#240D50] text-white p-6 m-4 relative rounded-lg">
        {/* Arrow icons surrounding the text */}
        <div className='p-8'><AiOutlineArrowUp /></div>
        <div className="flex items-center justify-center space-x-4">
          <div className='p-8'><AiOutlineArrowLeft /></div>
          <p className="text-xl">Swipe to Navigate</p>
          <div className='p-8'><AiOutlineArrowRight /></div>
        </div>
        <div className='p-8'><AiOutlineArrowDown /></div>
      </div>

      {/* Volume and Channel Controls */}
      <div className="flex justify-between w-3/4 p-4">
        <div className="flex flex-col items-center bg-[#240D50] rounded-lg">
          <div className="w-10 h-10">
            <AiOutlinePlus color='white'/>
          </div>
          <p className="text-sm text-white">VOL</p>
          <div className="mt-6">
            <AiOutlineMinus color='white'/>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-[#240D50] rounded-full flex items-center justify-center mb-2">
            <AiFillHome color='white' />
          </div>
          <div className="w-12 h-12 bg-[#240D50] rounded-full flex items-center justify-center">
            <PiPlayPauseFill color='white' />
          </div>
        </div>

        <div className="flex flex-col items-center bg-[#240D50] rounded-lg">
          <div className="w-10 h-10">
            <AiOutlineArrowUp color='white'/>
          </div>
          <p className="text-sm text-white">CHA</p>
          <div className="mt-6">
            <AiOutlineArrowDown color='white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileRemote;

