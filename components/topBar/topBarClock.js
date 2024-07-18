import React from 'react';

// Clock component definition
const Clock = ({ fontSize }) => {
    const [currentTime, setCurrentTime] = React.useState('');
  
    // useEffect hook to update the time every second
    React.useEffect(() => {
        // Setting up a timer to update the clock
        const timer = setInterval(() => {
            const d = new Date();
            let hours = d.getHours();
            const minutes = d.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
  
            // Convert 24-hour time format to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert '0' hour to '12'

            // Format time string
            const strTime = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} ${ampm}`;
            setCurrentTime(strTime);
        }, 1000);
  
        // Cleanup function to clear the interval timer
        return () => clearInterval(timer);
    }, []);
  
    // Render the current time
    return <div style={{ color: 'white', fontSize: fontSize }}>{currentTime}</div>;
};

export default Clock;
