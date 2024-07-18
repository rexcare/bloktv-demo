import React, { useState, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const WifiForm = ({ ssid }) => {
  const [password, setPassword] = useState('');
  const [keyboardRef, setKeyboardRef] = useState(null);
  const [layoutName, setLayoutName] = useState('default');

  const handlePasswordChange = (input) => {
    setPassword(input);
  };

  const handleKeyPress = (button) => {
    console.log("Pressed:", button);
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((prevLayoutName) => prevLayoutName === "default" ? "shift" : "default");
    } else if (button === "{alt}") {
      setLayoutName((prevLayoutName) => prevLayoutName === "default" ? "alt" : "alt-shift");
    } else if (button === "{arrowup}" || button === "{arrowleft}") {
      navigateKeyboard(-1);
    } else if (button === "{arrowdown}" || button === "{arrowright}") {
      navigateKeyboard(1);
    }
  };

  const navigateKeyboard = (direction) => {
    if (keyboardRef) {
      const buttons = keyboardRef.currentKeyboardRef.querySelectorAll('button');
      let index = Array.from(buttons).indexOf(document.activeElement);
      if (index === -1) {
        index = 0;
      } else {
        index = (index + direction + buttons.length) % buttons.length;
      }
      buttons[index].focus();
    }
  };

  const qwertyLayout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} {space} {alt}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} {space} {alt}"
    ],
    alt: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{alt} {space} {alt}"
    ],
    "alt-shift": [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{alt} {space} {alt}"
    ]
  };

  const connectWifi = async () => {
    try {
      const res = await fetch(`/api/wifi`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ssid, password })
      });
      //const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Reset the layout to default when the component mounts
    setLayoutName('default');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4">Enter the password for "{ssid}"</h2>
      <div className="flex items-center mb-4">
        <input
          className='focusable bg-transparent mr-2 px-4 py-2 clip-path-custom'
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <button
          className='focusable bg-transparent text-white font-bold py-2 px-4 rounded'
          type="button"
          style={{ cursor: 'pointer' }}
          onClick={connectWifi}
        >
          Connect
        </button>
      </div>
      <div className='focusable w-full max-w-xl'>
        <Keyboard
          inputRef={(ref) => setKeyboardRef(ref)}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          layoutName={layoutName}
          theme="hg-theme-default"
          layout={qwertyLayout}
          keyboardStyles={{
            root: {
              fontSize: '2rem',
            },
          }}
        />
      </div>
    </div>
  );
};

export default WifiForm;