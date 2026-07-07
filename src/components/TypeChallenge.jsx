import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Check, X, SkipForward } from 'lucide-react';

const SPECIAL_CHARS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ù', 'û', 'ô', 'î', 'ï', 'ç', 'œ', 'æ'];

export default function TypeChallenge({ words, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);

  const currentWord = words[currentIndex];
  const progress = Math.round((currentIndex / words.length) * 100);

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [currentIndex, showResult]);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, ' ');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showResult || !input.trim()) return;

    const correct = normalize(input) === normalize(currentWord.translation);
    setIsCorrect(correct);
    setShowResult(true);
    setResults(prev => [...prev, { wordId: currentWord.id, correct }]);

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(i => i + 1);
        setInput('');
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const handleSkip = () => {
    setResults(prev => [...prev, { wordId: currentWord.id, correct: false }]);
    setShowResult(true);
    setIsCorrect(false);

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(i => i + 1);
        setInput('');
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const insertChar = (char) => {
    setInput(prev => prev + char);
    if (inputRef.current) inputRef.current.focus();
  };

  // Finished screen
  if (isFinished) {
    const correct = results.filter(r => r.correct).length;
    const percentage = Math.round((correct / results.length) * 100);

    return (
      <div className="quiz-result animate-fade-in">
        <div className="result-card glass-panel">
          <div className="result-emoji">{percentage >= 80 ? '🎉' : percentage >= 50 ? '✍️' : '💪'}</div>
          <h2>{percentage >= 80 ? 'Super geschrieben!' : percentage >= 50 ? 'Gut gemacht!' : 'Übung macht den Meister!'}</h2>
          <div className="result-score">
            <span className="result-percentage">{percentage}%</span>
            <span className="result-detail">{correct} von {results.length} richtig</span>
          </div>
          <button className="btn-primary" onClick={() => onFinish({ correct, total: results.length, results })}>
            Fertig
          </button>
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="type-page animate-fade-in">
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

      {/* Prompt */}
      <div className="type-prompt glass-panel">
        <span className="type-instruction">Übersetze dieses Wort:</span>
        <h2 className="word-large">{currentWord.word}</h2>
        <span className="flashcard-pronunciation">{currentWord.pronunciation}</span>
        {currentWord.example && (
          <p className="flashcard-example" style={{ marginTop: '0.5rem' }}>„{currentWord.example}"</p>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="type-input-area">
        <div className={`type-input-wrapper ${showResult ? (isCorrect ? 'input-correct' : 'input-wrong') : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className="type-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Deine Übersetzung..."
            disabled={showResult}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {showResult && (
            <span className="input-result-icon">
              {isCorrect ? <Check size={24} color="var(--accent-success)" /> : <X size={24} color="var(--accent-error)" />}
            </span>
          )}
        </div>

        {/* Show correct answer on wrong */}
        {showResult && !isCorrect && (
          <div className="correct-answer animate-fade-in">
            Richtige Antwort: <strong>{currentWord.translation}</strong>
          </div>
        )}

        <div className="type-actions">
          <button type="button" className="btn-outline" onClick={handleSkip} disabled={showResult}>
            <SkipForward size={18} />
            Überspringen
          </button>
          <button type="submit" className="btn-primary" disabled={showResult || !input.trim()}>
            <Check size={18} />
            Prüfen
          </button>
        </div>
      </form>

      {/* Special characters */}
      <div className="special-chars">
        {SPECIAL_CHARS.map(char => (
          <button
            key={char}
            type="button"
            className="special-char-btn"
            onClick={() => insertChar(char)}
            disabled={showResult}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}
