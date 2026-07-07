import { useState } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';

const RATINGS = [
  { value: 0, label: 'Nochmal', color: 'var(--accent-error)', emoji: '❌' },
  { value: 1, label: 'Schwer', color: '#f97316', emoji: '😓' },
  { value: 2, label: 'Gut', color: 'var(--accent-success)', emoji: '👍' },
  { value: 3, label: 'Leicht', color: 'var(--accent-primary)', emoji: '🌟' },
];

export default function Flashcard({ words, onRate, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState([]);

  const currentWord = words[currentIndex];
  const progress = Math.round(((currentIndex) / words.length) * 100);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleRate = (rating) => {
    const newResults = [...results, { wordId: currentWord.id, rating }];
    setResults(newResults);
    onRate(currentWord.id, rating);
    setIsFlipped(false);

    if (currentIndex < words.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      // Session done
      setTimeout(() => {
        const correct = newResults.filter(r => r.rating >= 1).length;
        onFinish({ correct, total: words.length, results: newResults });
      }, 300);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flashcard-page animate-fade-in">
      {/* Top bar */}
      <div className="session-header">
        <button className="btn-icon" onClick={onBack}>
          <ArrowLeft size={22} />
        </button>
        <div className="session-progress-bar">
          <div className="session-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="session-counter">{currentIndex + 1}/{words.length}</span>
      </div>

      {/* Card */}
      <div className="flashcard-container" onClick={handleFlip}>
        <div className={`flashcard-inner glass-panel ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <span className="flashcard-pronunciation">{currentWord.pronunciation}</span>
            <h2 className="word-large">{currentWord.word}</h2>
            <p className="flashcard-hint">
              <RotateCcw size={16} style={{ marginRight: '0.5rem', opacity: 0.5 }} />
              Tippe zum Umdrehen
            </p>
          </div>

          <div className="flashcard-back">
            <span className="flashcard-label">Übersetzung</span>
            <h2 className="word-large" style={{ color: 'var(--accent-primary)' }}>
              {currentWord.translation}
            </h2>
            {currentWord.example && (
              <p className="flashcard-example">„{currentWord.example}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons (only when flipped) */}
      {isFlipped && (
        <div className="rating-buttons animate-fade-in">
          {RATINGS.map(r => (
            <button
              key={r.value}
              className="rating-btn"
              style={{ '--rating-color': r.color }}
              onClick={(e) => { e.stopPropagation(); handleRate(r.value); }}
            >
              <span className="rating-emoji">{r.emoji}</span>
              <span className="rating-label">{r.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
