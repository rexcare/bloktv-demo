import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faWifi, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const routes = [
  {
    label: 'Wifi Name 1',
    href: '/',
    status: 'Not Connected',
    icon: faWifi,
  },
  {
    label: 'Wifi Name 2',
    href: '/',
    status: 'Not Connected',
    icon: faWifi,
  },
  { label: 'Wifi Name 3', status: 'Not Connected', href: '/', icon: faWifi },
  { label: 'Wifi Name 4', status: 'Not Connected', href: '/', icon: faWifi },
];
const NetSideBar = ({ title = 'Network' }) => {
  return (
    <nav className='flex flex-col font-sans xl:w-[680px] w-[390px] xl:max-w-[680px] max-w-[390px]'>
      {/* Navigation Links */}
      <span className='text-white text-[32px] px-4'>{title}</span>
      {routes &&
        routes.map(({ href, label, status, icon }, i) => {
          const activeRouter = i === 0;
          return (
            <div
              className={` ${
                activeRouter
                  ? 'text-slate-50 py-4 rounded-md'
                  : 'text-slate-400'
              } cursor-pointer flex items-center px-8 space-x-6 focusable hover:text-slate-300 transition duration-1000 transform`}
              key={i}
              style={
                activeRouter
                  ? {
                      clipPath:
                        'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                      background:
                        'linear-gradient(155.26deg, #584FCC -11.43%, rgba(88, 79, 204, 0) 84.01%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 204, 0) 58.49%)',
                    }
                  : {}
              }
            >
              <FontAwesomeIcon
                icon={faLock}
                className={`text-white w-3 h-3 fa-xl`}
              />
              {icon !== null && (
                <div
                  className={`${
                    activeRouter ? 'bg-white' : 'bg-[#584FCC80]'
                  } flex p-3 items-center justify-center rounded-full cursor-pointer`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`${
                      activeRouter ? 'text-[#584FCC]' : 'text-white'
                    } w-6 h-6 fa-xl`}
                  />
                </div>
              )}
              <div className='flex flex-col'>
                <span className='text-[18px] xl:text-[24px]'>{label}</span>
                <span className='text-[10px] xl:text-[16px]'>{status}</span>
              </div>
            </div>
          );
        })}
    </nav>
  );
};

export default NetSideBar;
