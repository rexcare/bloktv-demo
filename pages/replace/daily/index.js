import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const quotesByReligion = {
  Judaism: [
    { quote: "The highest form of wisdom is kindness. - Talmud" },
    { quote: "Where there is love, there is life. - Rabbi Menachem Mendel Schneerson" },
    { quote: "Do not be daunted by the enormity of the world's grief. Do justly, now. Love mercy, now. Walk humbly, now. - Rabbi Rami Shapiro" },
    { quote: "The more Torah, the more life. - Pirkei Avot" },
  ],
  Islam: [
    { quote: "Verily, with every difficulty, there is relief. - Quran 94:6" },
    { quote: "The best among you are those who have the best manners and character. - Prophet Muhammad (Hadith)" },
    { quote: "Do not lose hope, nor be sad. - Quran 3:139" },
    { quote: "Kindness is a mark of faith, and whoever is not kind has no faith. - Prophet Muhammad (Hadith)" },
  ],
  Buddhism: [
    { quote: "There are only two mistakes one can make along the road to truth; not going all the way, and not starting. - Buddha (Buddhist teacher)" },
    { quote: "Every morning we are born again. What we do today is what matters most. - Buddha (Buddhist teacher)" },
    { quote: "Peace comes from within. Do not seek it without. - Buddha (Buddhist teacher)" },
    { quote: "The mind is everything. What you think you become. - Buddha (Buddhist teacher)" },
  ],
  Hinduism: [
    { quote: "Happiness is a state of mind, not a state of possession. - Lord Krishna (Hindu deity)" },
    { quote: "We reap what we sow. We are the makers of our own fate. None else has the blame, none has the praise. - Swami Vivekananda (Hindu philosopher)" },
    { quote: "The soul is neither born, and nor does it die. - Bhagavad Gita" },
    { quots: "Truth can be stated in a thousand different ways, yet each one can be true. - Swami Vivekananda (Hindu philosopher)" }
  ],
};

const DailyApp = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedReligion, setSelectedReligion] = useState(null);

  const handleClick = () => {
    const filteredQuotes = getFilteredQuotes();
    setCurrentQuoteIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % filteredQuotes.length;
      if (nextIndex === 0 && selectedReligion) {
        // Reset currentQuoteIndex to 0 when reaching the end of the filtered quotes
        return 0;
      }
      return nextIndex;
    });
  };

  const getFilteredQuotes = () => {
    if (!selectedReligion) {
      return Object.values(quotesByReligion).flat();
    }
    return quotesByReligion[selectedReligion];
  };

  const filteredQuotes = getFilteredQuotes();

  useEffect(() => {
    setCurrentQuoteIndex(0); // Reset currentQuoteIndex when selectedReligion changes
  }, [selectedReligion]);

  useEffect(() => {
    const handleEvents = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const focusedElement = document.querySelector('.focused');
        if (focusedElement) focusedElement.click();
      }
      if (event.key.startsWith('Arrow')) {
        event.preventDefault();
        const focusedElement = document.querySelector('.focused');
        const focusableElements = document.querySelectorAll('.focusable');
        let index = Array.from(focusableElements).indexOf(focusedElement);
        if (focusedElement) {
          focusedElement?.classList?.remove('focused');
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            index = (index + 1) % focusableElements.length;
          } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            index = (index - 1 + focusableElements.length) % focusableElements.length;
          }
        } else index = 0;
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
      <div className="text-center max-w-md text-white mb-8">
        <h1 className="text-[48px] font-bold mb-4 text-white font-serif italic">
          {filteredQuotes.length > 0 && currentQuoteIndex < filteredQuotes.length
            ? filteredQuotes[currentQuoteIndex].quote
            : ''}
        </h1>
        <hr className="h-px my-8 bg-gray-600 border-0" />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded-md bg-white text-black transition-colors duration-300 focusable hover:bg-gray-200`}
          onClick={() => setSelectedReligion(null)}
          style={{
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          All
        </button>
        {Object.keys(quotesByReligion).map(religion => (
          <button
            key={religion}
            className={`px-4 py-2 rounded-md bg-white text-black transition-colors duration-300 focusable hover:bg-gray-200`}
            onClick={() => setSelectedReligion(religion)}
            style={{
              fontWeight: 'bold',
              letterSpacing: '0.5px',
            }}
          >
            {religion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyApp;