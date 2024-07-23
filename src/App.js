import React, { useState } from 'react';
import './App.css';
import FlashcardSet from './components/FlashcardSet';
import CreateSet from './components/CreateSet';
import EditSet from './components/EditSet';
import ReviseSet from './components/ReviseSet';

function App() {
  const [theme, setTheme] = useState('day'); // Default theme is 'day'
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSet, setCurrentSet] = useState(null);
  const [unknownCards, setUnknownCards] = useState([]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'day' ? 'night' : 'day'));
  };

  const addFlashcardSet = (title, cards) => {
    const newSet = { id: Date.now(), title, cards };
    setFlashcardSets([...flashcardSets, newSet]);
  };

  const updateFlashcardSet = (id, updatedSet) => {
    setFlashcardSets(flashcardSets.map(set => (set.id === id ? updatedSet : set)));
  };

  const handleReviseSet = (set) => {
    setCurrentSet(set);
    setUnknownCards(set.cards);
    setCurrentPage('revise');
  };

  const handleNextRound = () => {
    setCurrentSet({ ...currentSet, cards: unknownCards });
    setUnknownCards([]);
  };

  return (
    <div className={`App ${theme}`}>
      {currentPage === 'home' && (
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className="theme-icon">
            {theme === 'day' ? (
              <>
                <span role="img" aria-label="sun">☀️</span>
                Day Mode
              </>
            ) : (
              <>
                <span role="img" aria-label="moon">🌙</span>
                Night Mode
              </>
            )}
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <div className="home">
          <div className="flashcard-set-container">
            <div 
              className="flashcard-set new-set" 
              onClick={() => setCurrentPage('create')}
            >
              <h3 className="flashcard-set-title">Create New Flashcard Set</h3>
              <div className="flashcard-set-buttons">
                <button className="flashcard-set-button create-button">
                  <span className="button-icon">+</span>
                  Create
                </button>
              </div>
            </div>
            {flashcardSets.map(set => (
              <FlashcardSet
                key={set.id}
                set={set}
                onEdit={() => { setCurrentSet(set); setCurrentPage('edit'); }}
                onRevise={() => handleReviseSet(set)}
              />
            ))}
          </div>
        </div>
      )}

      {currentPage === 'create' && (
        <CreateSet
          onSave={(title, cards) => { addFlashcardSet(title, cards); setCurrentPage('home'); }}
          onCancel={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'edit' && (
        <EditSet
          set={currentSet}
          onSave={(updatedSet) => { updateFlashcardSet(currentSet.id, updatedSet); setCurrentPage('home'); }}
          onCancel={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'revise' && (
        <ReviseSet
          set={currentSet}
          onBack={() => setCurrentPage('home')}
          onNextRound={handleNextRound}
          unknownCards={unknownCards}
          setUnknownCards={setUnknownCards}
        />
      )}
    </div>
  );
}

export default App;
