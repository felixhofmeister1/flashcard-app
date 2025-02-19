import React, { useState } from 'react';
import './CreateSet.css';

const CreateSet = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ question: '', answer: '' }]);

  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]);
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  return (
    <div className="create-set">
      <input
        type="text"
        placeholder="Set Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {cards.map((card, index) => (
        <div key={index} className="card-input">
          <input
            type="text"
            placeholder="Question"
            value={card.question}
            onChange={(e) => handleCardChange(index, 'question', e.target.value)}
          />
          <input
            type="text"
            placeholder="Answer"
            value={card.answer}
            onChange={(e) => handleCardChange(index, 'answer', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addCard}>Add Card</button>
      <button onClick={() => onSave(title, cards)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CreateSet;