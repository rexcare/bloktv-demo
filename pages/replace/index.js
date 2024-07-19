import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MainLayout from '../../components/mainLayout';

const useReplacementMode = () => {
  const [isReplacementModeOn, setIsReplacementModeOn] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [storedActiveButton, setStoredActiveButton] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedReplacementModeState = JSON.parse(
      localStorage.getItem('isReplacementModeOn')
    );
    if (storedReplacementModeState !== null) {
      setIsReplacementModeOn(storedReplacementModeState);
    }

    if (storedActiveButton !== null) {
      setActiveButton(storedActiveButton);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        'isReplacementModeOn',
        JSON.stringify(isReplacementModeOn)
      );
      localStorage.setItem('activeButton', activeButton);
      if (isReplacementModeOn) {
        localStorage.setItem('isInternetSwitchOn', JSON.stringify(true));
      } else {
        localStorage.removeItem('isInternetSwitchOn');
      }
    }
  }, [isReplacementModeOn, activeButton, isInitialized]);

  const toggleReplacementMode = () => {
    const newState = !isReplacementModeOn;
    setIsReplacementModeOn(newState);
    if (newState) {
      setActiveButton('Auto-Mute');
    } else {
      setActiveButton(null);
    }

    // Send request to Python backend
    sendTriggerRequest('Replacement Mode', newState);
  };

  const sendTriggerRequest = async (buttonName, state) => {
    try {
      await axios.post('http://localhost:5050/trigger', {
        button_name: buttonName,
        state: state,
      });
    } catch (error) {
      console.error('Error sending trigger request', error);
    }
  };

  return {
    isReplacementModeOn,
    activeButton,
    toggleReplacementMode,
    setActiveButton,
  };
};

const ReplacePage = () => {
  const {
    isReplacementModeOn,
    activeButton,
    toggleReplacementMode,
    setActiveButton,
  } = useReplacementMode();

  const handleButtonClick = async (mode) => {
    const isOn = activeButton !== mode;
    setActiveButton(isOn ? mode : '');

    try {
      await fetch('http://127.0.0.1:5050/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode, isOn }),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendTriggerRequest = async (buttonName, state) => {
    try {
      await axios.post('http://localhost:5000/trigger', {
        button_name: buttonName,
        state: state,
      });
    } catch (error) {
      console.error('Error sending trigger request', error);
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
      {/* Main Content Area */}
      <div className='flex-row flex-1 gap-3 space-y-12'>
        <div className='flex flex-row items-center space-x-4'>
          <div className='text-lg text-white text-[24px] opacity-70'>
            Replacement Mode: Off/On
          </div>
          <label className='inline-flex items-center cursor-pointer me-5'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              checked={isReplacementModeOn}
              onChange={toggleReplacementMode}
            />
            <div className="focusable relative w-11 h-6 bg-white/20 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
        <div
          className='flex-row flex-1 gap-3 space-y-4 font-'
          style={{ flex: '55%' }}
        >
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace'
              className='text-lg text-white  text-[24px] focusable'
            >
              Auto-Mute
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Auto-Mute'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Auto-Mute')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace'
              className='text-lg text-white  text-[24px] focusable'
            >
              Screensaver Mode
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Screensaver Mode'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Screensaver Mode')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace/word'
              className='text-lg text-white  text-[24px] focusable'
            >
              Word of the Day
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Word of the Day'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Word of the Day')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace/joke'
              className='text-lg text-white  text-[24px] focusable'
            >
              Jokes
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Jokes'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Jokes')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace/trivia'
              className='text-lg text-white  text-[24px] focusable'
            >
              Trivia
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Trivia'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Trivia')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
          <div className='flex flex-row justify-between'>
            <Link
              href='/replace/daily'
              className='text-lg text-white  text-[24px] focusable'
            >
              Daily Devotion
            </Link>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={activeButton === 'Daily Devotion'}
                disabled={!isReplacementModeOn}
                onChange={() => handleButtonClick('Daily Devotion')}
              />
              <div
                className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
                  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
                  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
              ></div>
            </label>
          </div>
          <div className='flex-1 border-solid border-[#402672] border'></div>
        </div>
      </div>
    </MainLayout>
  );
};

const ControlButton = ({ label, isChecked, isReplacementModeOn, onChange }) => (
  <>
    <div className='flex flex-row justify-between'>
      <Link
        href={`/replace${
          label !== 'Auto-Mute'
            ? `/${label.toLowerCase().replace(/ /g, '-')}`
            : ''
        }`}
        className='text-lg text-white text-[24px] focusable'
      >
        {label}
      </Link>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          checked={isChecked}
          disabled={!isReplacementModeOn}
          onChange={onChange}
        />
        <div
          className="focusable relative w-11 h-6 bg-[#2B2166] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#02DBF5] 
          dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#02DBF5] after:border-gray-300 after:border 
          after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#bfdbfe]"
        ></div>
      </label>
    </div>
    <div className='flex-1 border-solid border-[#402672] border'></div>
  </>
);

export default ReplacePage;
