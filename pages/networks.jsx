import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
const wifi = require('node-wifi');
import NetSideBar from '../components/sideBar/networkSidebars';
import NetTopBar from '../components/topBar/NetworkTopbar';
import WifiForm from '../components/wifiForm';

const Networks = ({ data }) => {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const handleNetworkClick = (network) => {
    setSelectedNetwork(network);
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
    <div>
      <NetTopBar />
      <div
        className='relative flex min-h-screen font-sans'
        style={{ paddingBottom: '7%' }}
      >
        {/* Sidebar Navigation */}
        <NetSideBar networks={data} onNetworkClick={handleNetworkClick} />
        <div className='relative flex items-center justify-center flex-1'>
          <Image
            src='/network.png'
            width={1379}
            height={532}
            priority
            alt='Centered Image'
            className='h-auto max-w-full'
          />
          {selectedNetwork && (
            <div className='bg-[#0C0022] absolute inset-0 items-center justify-center'>
              <WifiForm ssid={selectedNetwork.ssid} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Networks;

export async function getServerSideProps() {
  wifi.init({ iface: null }); // network interface, choose a random wifi interface if set to null
  const networks = await wifi.scan();
  return { props: { data: networks } };
}
