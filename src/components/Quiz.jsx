import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ALL_WORDS } from '../data';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateOptions(correctWord, allWords) {
  const wrong = shuffleArray(allWords.filter(w => w.id !== correctWord.id)).slice(0, 3);
  const options = shuffleArray([
    { text: correctWord.translation, isCorrect: true },
    ...wrong.map(w => ({ text: w.translation, isCorrect: false })),
  ]);
  return options;
}

export default function Quiz({ words, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [options, setOptions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = words[currentIndex];
  const progress = Math.round((currentIndex / words.length) * 100);

  useEffect(() => {
    if (currentWord) {
      setOptions(generateOptions(currentWord, ALL_WORDS));
      setTimeLeft(10);
      setSelected(null);
      setShowResult(false);
    }
  }, [currentIndex, currentWord]);

  // Timer
  useEffect(() => {
    if (showResult || isFinished || !currentWord) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, isFinished, currentWord]);

  const handleTimeout = useCallback(() => {
    setShowResult(true);
    setResults(prev => [...prev, { wordId: currentWord.id, correct: false }]);
    setTimeout(nextQuestion, 1500);
  }, [currentIndex, currentWord]);

  const handleSelect = (option, index) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    const newResults = [...results, { wordId: currentWord.id, correct: option.isCorrect }];
    setResults(newResults);

    setTimeout(nextQuestion, 1200);
  };

  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Finished screen
  if (isFinished) {
    const correct = results.filter(r => r.correct).length;
    const percentage = Math.round((correct / results.length) * 100);
    const wrongWords = results
      .filter(r => !r.correct)
      .map(r => words.find(w => w.id === r.wordId))
      .filter(Boolean);

    return (
      <div className="quiz-result animate-fade-in">
        <div className="result-card glass-panel">
          <div className="result-emoji">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2>{percentage >= 80 ? 'Ausgezeichnet!' : percentage >= 50 ? 'Gut gemacht!' : 'Weiter üben!'}</h2>
          <div className="result-score">
            <span className="result-percentage">{percentage}%</span>
            <span className="result-detail">{correct} von {results.length} richtig</span>
          </div>

          {wrongWords.length > 0 && (
            <div className="wrong-words">
              <h4>Diese Wörter wiederholen:</h4>
              {wrongWords.map(w => (
                <div key={w.id} className="wrong-word-item">
                  <span>{w.word}</span>
                  <span className="wrong-word-translation">{w.translation}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn-primary" onClick={() => onFinish({ correct, total: results.length, results })}>
            Fertig
          </button>
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="quiz-page animate-fade-in">
      {/* Top bar */}
      <div className="session-header">
        <button className="btn-icon" onClick={onBack}>
          <ArrowLeft size={22} />
        </button>
        <div className="session-progress-bar">
          <div className="session-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-timer" style={{ color: timeLeft <= 3 ? 'var(--accent-error)' : 'var(--text-secondary)' }}>
          <Clock size={16} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="quiz-question glass-panel">
        <span className="quiz-prompt">Wie übersetzt man:</span>
        <h2 className="word-large">{currentWord.word}</h2>
        <span className="flashcard-pronunciation">{currentWord.pronunciation}</span>
      </div>

      {/* Options */}
      <div className="quiz-options">
        {options.map((option, i) => {
          let className = 'quiz-option glass-panel';
          if (showResult) {
            if (option.isCorrect) className += ' quiz-option-correct';
            else if (selected === i) className += ' quiz-option-wrong shake';
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(option, i)}
              disabled={showResult}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{option.text}</span>
              {showResult && option.isCorrect && <CheckCircle size={20} color="var(--accent-success)" />}
              {showResult && selected === i && !option.isCorrect && <XCircle size={20} color="var(--accent-error)" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
