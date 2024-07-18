import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

// Dummy data for demo
const jokes = [
  {
    question: "Why don't scientists trust atoms?",
    answer: "Because they make up everything!"
  },
  {
    question: "I'm reading a book on anti-gravity. What's the catch?",
    answer: "It's impossible to put down!"
  },
  {
    question: "Why did the scarecrow win an award?",
    answer: "Because he was outstanding in his field!"
  },
  {
    question: "I told my wife she was drawing her eyebrows too high. What happened?",
    answer: "She looked surprised."
  },
  {
    question: "Why did the parallel lines refuse to meet?",
    answer: "Because they have so much in common, it's a shame they'll never meet!"
  },
  {
    "question": "Why don't skeletons fight each other?",
    "answer": "They don't have the guts."
  },
  {
    "question": "What do you call fake spaghetti?",
    "answer": "An impasta!"
  },
  {
    "question": "Why don't some couples go to the gym?",
    "answer": "Because some relationships don't work out."
  },
  {
    "question": "How does a penguin build its house?",
    "answer": "Igloos it together."
  },
  {
    "question": "Why did the bicycle fall over?",
    "answer": "Because it was two-tired!"
  },
  {
    "question": "Why can't you give Elsa a balloon?",
    "answer": "Because she will let it go!"
  },
  {
    "question": "How do you organize a space party?",
    "answer": "You planet."
  },
  {
    "question": "What do you call cheese that isn't yours?",
    "answer": "Nacho cheese!"
  },
  {
    "question": "Why was the math book sad?",
    "answer": "Because it had too many problems."
  },
  {
    "question": "Why did the golfer bring an extra pair of pants?",
    "answer": "In case he got a hole in one."
  }
];

const JokeGenerator = () => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const handleClick = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
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
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900 relative">
      {/* Back Arrow */}
      <Link href="/replace" className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors duration-300 focusable">
        <FaArrowLeft size={24} />
      </Link>

      <div className="text-center max-w-md text-white">
        <h1 className="text-[80px] font-bold mb-4 text-white font-serif">{jokes[currentJokeIndex].question}</h1>
        <p className="text-[40px] mb-8 text-gray-200 font-serif">{jokes[currentJokeIndex].answer}</p>
        <hr className="h-px my-8 bg-gray-600 border-0" />
      </div>
    </div>
  );
};

export default JokeGenerator;
