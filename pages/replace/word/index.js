import React, { useState, useEffect } from 'react';
import AppTopBar from '../../../components/topBar/appTopBar';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


// Dummy data for demo
const words = [
  {
    word: "Serendipity",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    type: "noun",
    pronunciation: "/ˌser.ən.ˈdɪp.ɪ.ti/"
  },
  {
    word: "Ephemeral",
    definition: "Lasting for a very short time.",
    type: "adjective",
    pronunciation: "/ɪ.ˈfem.ər.əl/"
  },
  {
    word: "Quixotic",
    definition: "Exceedingly idealistic; unrealistic and impractical.",
    type: "adjective",
    pronunciation: "/kwɪk.ˈsɑː.tɪk/"
  },
  {
    word: "Panacea",
    definition: "A solution or remedy for all difficulties or diseases.",
    type: "noun",
    pronunciation: "/ˌpæn.ə.ˈsiː.ə/"
  },
  {
    word: "Euphoria",
    definition: "A feeling or state of intense excitement and happiness.",
    type: "noun",
    pronunciation: "/juː.ˈfɔːr.i.ə/"
  },
  {
    "word": "Mellifluous",
    "definition": "Sweet or musical; pleasant to hear.",
    "type": "adjective",
    "pronunciation": "/məˈlɪf.lu.əs/"
  },
  {
    "word": "Ineffable",
    "definition": "Too great or extreme to be expressed or described in words.",
    "type": "adjective",
    "pronunciation": "/ɪˈnɛf.ə.bəl/"
  },
  {
    "word": "Petrichor",
    "definition": "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.",
    "type": "noun",
    "pronunciation": "/ˈpɛt.rɪ.kɔːr/"
  },
  {
    "word": "Ebullient",
    "definition": "Cheerful and full of energy.",
    "type": "adjective",
    "pronunciation": "/ɪˈbʊl.i.ənt/"
  },
  {
    "word": "Limerence",
    "definition": "The state of being infatuated with another person.",
    "type": "noun",
    "pronunciation": "/ˈlɪm.ə.rəns/"
  },
  {
    "word": "Halcyon",
    "definition": "Denoting a period of time in the past that was idyllically happy and peaceful.",
    "type": "adjective",
    "pronunciation": "/ˈhæl.si.ən/"
  },
  {
    "word": "Iridescent",
    "definition": "Showing luminous colors that seem to change when seen from different angles.",
    "type": "adjective",
    "pronunciation": "/ˌɪr.ɪˈdɛs.ənt/"
  },
  {
    "word": "Sonder",
    "definition": "The realization that each passerby has a life as vivid and complex as your own.",
    "type": "noun",
    "pronunciation": "/ˈsɒn.dər/"
  },
  {
    "word": "Aesthete",
    "definition": "A person who has a special appreciation of art and beauty.",
    "type": "noun",
    "pronunciation": "/ˈiːs.θiːt/"
  },
  {
    "word": "Nostalgia",
    "definition": "A sentimental longing or wistful affection for a period in the past.",
    "type": "noun",
    "pronunciation": "/nəˈstæl.dʒə/"
  }
];

const WordOfTheDay = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleClick = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 30000); // 30000 milliseconds = 30 seconds

    return () => clearInterval(interval);
  }, []);

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
            index = (index - 1 + focusableElements.length) % focusableElements.length;
          }
        } else index = 0;

        // Add focus class to the new focused element
        focusableElements[index].classList.add('focused');
        focusableElements[index].focus();
      }
    }
    document.addEventListener('keydown', handleEvents);
    return () => document.removeEventListener('keydown', handleEvents);
  }, [])

  useEffect(() => {
    const handleEvents = (event) => {
      if (event.type === 'click') {
        handleClick();
      }
    };
    document.addEventListener('click', handleEvents);
    return () => document.removeEventListener('click', handleEvents);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900">
      <Link href="/replace" className="focusable absolute top-6 left-6 text-gray-300 hover:text-white transition-colors duration-300">
        <FaArrowLeft size={24} />
      </Link>
      <div className="text-center max-w-md text-white">
        <h1 className="text-[80px] font-bold mb-2 text-white font-serif">{words[currentWordIndex].word}</h1>
        <p className="text-[44px] mb-4 text-gray-300 font-serif italic">{words[currentWordIndex].pronunciation}</p>
        <p className="text-[44px] mb-2 text-gray-300 font-serif">{words[currentWordIndex].type}</p>
        <p className="text-[40px] mb-8 text-gray-200 font-serif">{words[currentWordIndex].definition}</p>
        <hr className="h-px my-8 bg-gray-600 border-0" />
      </div>
    </div>
  );
};

export default WordOfTheDay;