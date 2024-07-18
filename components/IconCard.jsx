import React, { useEffect, useState } from 'react';
import Image from 'next/image';
const IconCard = ({
  IconComponent,
  text,
  text2 = '',
  bgColorClass,
  href,
  style,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className='flex flex-col items-center justify-center'>
      <div
        href={href}
        className={`${bgColorClass} w-full h-fit rounded-lg bg-cover text-center flex flex-col items-center justify-center text-white font-poppins cursor-pointer transition duration-500 shadow-2xl shadow-cyan-500/50 transform py-12`}
        style={
          isHover
            ? {
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
                // background: `linear-gradient(155deg, #584FCC -20%, rgba(88, 79, 100, 0) 80%), linear-gradient(335.05deg, #02DBF5 -25.36%, rgba(88, 79, 100, 0) 58.49%)`,
                ...style,
              }
            : {
                ...style,
                clipPath:
                  'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)',
              }
        }
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image src={IconComponent} width={100} height={75} alt={'Logos'} />
        <div className='pt-2 text-2xl text-white font-poppins'>{text}</div>
      </div>
      <div className='text-2xl text-white font-poppins'>{text2}</div>
    </div>
  );
};

export default IconCard;
