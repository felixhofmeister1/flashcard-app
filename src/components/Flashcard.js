import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ flashcard, onNext }) => {
  const [flip, setFlip] = useState(false);
  const [isKnown, setIsKnown] = useState(null);

  const handleKnow = () => {
    setIsKnown(true);
    setTimeout(() => {
      onNext(true);
      setIsKnown(null);
    }, 1000);
  };

  const handleDontKnow = () => {
    setIsKnown(false);
    setTimeout(() => {
      onNext(false);
      setIsKnown(null);
    }, 1000);
  };

  return (
    <div className={`flashcard-container ${isKnown === true ? 'known' : ''} ${isKnown === false ? 'unknown' : ''}`}>
      <div className={`flashcard ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
        <div className="flashcard-inner">
          <div className="flashcard-front">{flashcard.question}</div>
          <div className="flashcard-back">{flashcard.answer}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="dont-know-button" onClick={handleDontKnow}>I Don’t Know This Yet</button>
        <button className="know-button" onClick={handleKnow}>I Know This</button>
      </div>
    </div>
  );
};

export default Flashcard;