import React from 'react';
import './flashcardset.css'; 

const FlashcardSet = ({ set, onEdit, onRevise }) => {
  return (
    <div className="flashcard-set">
      <h3 className="flashcard-set-title">{set.title}</h3>
      <div className="flashcard-set-buttons">
        <button className="flashcard-set-button revise-button" onClick={onRevise}>
          <span className="button-icon">🔄</span>
          Revise
        </button>
        <button className="flashcard-set-button edit-button" onClick={onEdit}>
          <span className="button-icon">✏️</span>
          Edit
        </button>
      </div>
    </div>
  );
};

export default FlashcardSet;