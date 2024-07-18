import React, { useEffect, useState } from 'react';
import questions from "./questions.json";
import Link from 'next/link';
import { FaArrowLeft, FaRedoAlt } from 'react-icons/fa';

const TriviaApp = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(20);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // Shuffle questions function
  const shuffleQuestions = (questionsArray) => {
    for (let i = questionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
    }
    return questionsArray;
  };

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions([...questions]));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleTimeOut();
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

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

  const handleAnswerOption = (answer, isCorrect) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
    setTimeout(() => {
      handleNext();
    }, 5000); // Show feedback for 5 seconds before moving to the next question
  };

  const handleTimeOut = () => {
    setShowFeedback(true);
    setTimeout(() => {
      handleNext();
    }, 5000); // Show feedback for 5 seconds before moving to the next question
  };

  const handleNext = () => {
    setShowFeedback(false);
    const nextQues = currentQuestion + 1;
    if (nextQues < shuffledQuestions.length) {
      setCurrentQuestion(nextQues);
      setTimer(20);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleQuestions([...questions]));
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setTimer(20);
    setShowFeedback(false);
    setShowScore(false);
    setScore(0);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900 relative">
      {/* Back Arrow */}
      <Link href="/replace" className="focusable absolute top-6 left-6 text-gray-300 hover:text-white transition-colors duration-300 focusable">
        <FaArrowLeft size={24} />
      </Link>

      <div className="flex flex-col items-center w-full max-w-3xl p-10 bg-gray-800 rounded-lg font-poppins">
        {showScore ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-center text-white mb-6">
              You scored {score} out of {shuffledQuestions.length}
            </h1>
            <button
              className="flex items-center justify-center px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white text-xl focus:outline-none"
              onClick={restartGame}
            >
              <FaRedoAlt className="mr-2" />
              Restart Game
            </button>
          </div>
        ) : shuffledQuestions.length > 0 ? (
          <>
            <div className="flex flex-col items-start w-full mb-8">
              <div className="mt-4 text-[40px] text-white">
                {shuffledQuestions[currentQuestion].question}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">
              {shuffledQuestions[currentQuestion].answerOptions.map((answer, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-8 border-2 cursor-pointer rounded-lg transition-colors text-2xl ${
                    showFeedback
                      ? answer.isCorrect
                        ? 'bg-green-600 text-white'
                        : answer.answer === selectedOptions[currentQuestion]?.answerByUser
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-white'
                      : 'bg-white text-black hover:bg-gray-600 focusable'
                  }`}
                  onClick={() => handleAnswerOption(answer.answer, answer.isCorrect)}
                >
                  <input
                    type="radio"
                    name={answer.answer}
                    value={answer.answer}
                    checked={
                      answer.answer === selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={() => handleAnswerOption(answer.answer, answer.isCorrect)}
                    className="hidden"
                  />
                  <p>{answer.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-2xl text-white">Time left: {timer}</div>
          </>
        ) : (
          <div className="text-2xl text-white">Loading questions...</div>
        )}
      </div>
    </div>
  );
};

export default TriviaApp;
