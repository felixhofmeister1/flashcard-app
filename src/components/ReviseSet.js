import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard'; 
import './ReviseSet.css';
import Confetti from 'react-confetti';

const ReviseSet = ({ set, onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cardsToRevise, setCardsToRevise] = useState(set.cards);
  const [incorrectCards, setIncorrectCards] = useState([]);

  useEffect(() => {
    if (isCorrect.length === cardsToRevise.length && cardsToRevise.length > 0) {
      setShowResults(true);
    }
  }, [isCorrect, cardsToRevise]);

  const handleAnswer = (isKnown) => {
    setIsCorrect((prev) => {
      const newStatus = [...prev, isKnown];
      if (!isKnown) {
        setIncorrectCards((prevIncorrectCards) => {
          const currentCard = cardsToRevise[currentCardIndex];
          return [...prevIncorrectCards, currentCard];
        });
      }
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      return newStatus;
    });
  };

  const handleNextRound = () => {
    if (incorrectCards.length > 0) {
      setCardsToRevise(incorrectCards);
      setCurrentCardIndex(0);
      setIsCorrect([]);
      setIncorrectCards([]);
      setShowResults(false);
    } else {
      onBack(); 
    }
  };

  const correctCount = isCorrect.filter(Boolean).length;
  const score = Math.round((correctCount / cardsToRevise.length) * 100);

  if (showResults) {
    return (
      <div className="results-screen">
        {score === 100 && <Confetti />}
        <h2>{`You got ${score}% correct!`}</h2>
        <button onClick={handleNextRound}>
          {incorrectCards.length > 0 ? 'Go to Next Round' : 'Back to Main Screen'}
        </button>
      </div>
    );
  }

  return (
    <div className="revise-set">
      <div className="modal">
        <h2 className="card-number">{`${currentCardIndex + 1} / ${cardsToRevise.length}`}</h2>
        {cardsToRevise.length > 0 && currentCardIndex < cardsToRevise.length ? (
          <Flashcard flashcard={cardsToRevise[currentCardIndex]} onNext={handleAnswer} />
        ) : (
          <p>No more cards to revise.</p>
        )}
      </div>
    </div>
  );
};

export default ReviseSet;
