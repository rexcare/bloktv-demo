import React from 'react';
import Link from 'next/link';

// Importing icon components
import hdmi from '../../public/hdmi-logo.png';
import usb from '../../public/usb.png';
import videogame from '../../public/games.png';
import stream from '../../public/streaming-logo.png';
import IconCard from '../../components/IconCard';

// Importing custom components
import MainLayout from '../../components/mainLayout';
import { useEffect } from 'react';

const HomePage = () => {
  const callAPIHDMI = async () => {
    try {
      const res = await fetch(`/api/hdmi1`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleEvents = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const focusedElement = document.querySelector('.focused');
        if (focusedElement) focusedElement.click();
      }

      if (event.key.startsWith('Arrow')) {
        event.preventDefault(); // Prevent scrolling with arrow keys
        const focusedElement = document.querySelector('.focused');
        const focusableElements = document.querySelectorAll('.focusable');
        let index = Array.from(focusableElements).indexOf(focusedElement);

        if (focusedElement) {
          // Remove focus class from currently focused element
          focusedElement?.classList?.remove('focused');

          // Set focus to the next or previous element based on arrow key
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            index = (index + 1) % focusableElements.length;
          } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            index =
              (index - 1 + focusableElements.length) % focusableElements.length;
          }
        } else index = 0;

        // Add focus class to the new focused element
        focusableElements[index].classList.add('focused');
        focusableElements[index].focus();
      }
    };
    document.addEventListener('keydown', handleEvents);

    return () => document.removeEventListener('keydown', handleEvents);
  }, []);

  return (
    <MainLayout>
      <div className='grid w-full grid-cols-3 gap-x-4 h-fit'>
        {/* Icon Cards */}
        <div className='col-span-1 '>
          <Link className='focusable' href='/' onClick={callAPIHDMI}>
            <IconCard
              IconComponent={hdmi}
              text='HDMI'
              bgColorClass='bg-[#240D50]'
            />
          </Link>
        </div>
        <div className='col-span-1 '>
          <Link className='focusable' href='/home/usbDrive'>
            <IconCard
              IconComponent={usb}
              text='USB'
              bgColorClass='bg-[#240D50]'
            />
          </Link>
        </div>

        <div className='col-span-1 '>
          <Link className='focusable' href='/home/game'>
            <IconCard
              IconComponent={videogame}
              text='Video Games'
              bgColorClass='bg-[#240D50]'
              href='/'
            />
          </Link>
        </div>
        <div className='col-span-1 '>
          <Link className='focusable' href='/home/streaming'>
            <IconCard
              IconComponent={stream}
              text='Streaming Apps'
              bgColorClass='bg-[#240D50]'
              href='/home/streaming'
            />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
