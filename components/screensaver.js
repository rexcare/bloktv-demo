import React, { useEffect } from 'react';

const Screensaver = () => {
  useEffect(() => {
    const handleMouseMove = () => {
      //exit the screensaver on a trigger to get back, currently using mouse movement 
      console.log('Mouse moved');
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={styles.container}>
      <video style={styles.video} autoPlay loop muted>
        <source src="/videos/screensaver.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    zIndex: 9999,
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
};

export default Screensaver;

