import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const routes = [
  {
    label: 'Folder 1',
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

const MainSideBar = ({ title = '' }) => {
  const pathname = usePathname();
  const [currentFolder, setCurrentFolder] = useState(0);

  return (
    <nav className='flex flex-col font-sans xl:w-[680px] w-[390px] xl:max-w-[680px] max-w-[390px] overflow-auto'>
      {/* Navigation Links */}
      <span className='text-white text-[32px] p-4'>{title}</span>
      {routes.map(({ label, icon }, i) => {
        const activeRouter = currentFolder === i;
        return (
          <div
            className={` ${
              activeRouter ? 'text-slate-50 py-4 rounded-md' : 'text-slate-400'
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
            onClick={() => setCurrentFolder(i)}
          >
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
            <span className='text-[18px] xl:text-[24px]'>{label}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default MainSideBar;
