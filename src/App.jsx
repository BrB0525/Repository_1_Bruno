import { useState, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LessonSelect from './components/LessonSelect';
import ModeSelect from './components/ModeSelect';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import TypeChallenge from './components/TypeChallenge';
import Stats from './components/Stats';
import { loadData, saveData, updateStreak, addSession } from './utils/storage';
import { calculateNextReview, getInitialProgress } from './utils/spacedRepetition';

function App() {
  const [data, setData] = useState(() => loadData());
  const [page, setPage] = useState('dashboard');    // dashboard | lessons | stats
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [sessionWords, setSessionWords] = useState([]);

  const persist = useCallback((newData) => {
    setData(newData);
    saveData(newData);
  }, []);

  // Navigation
  const navigate = (p) => {
    setPage(p);
    setSelectedLesson(null);
    setSelectedMode(null);
    setSessionWords([]);
  };

  // Lesson selected → show mode picker
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedMode(null);
  };

  // Mode selected → start session
  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    const words = selectedLesson ? selectedLesson.words : sessionWords;
    setSessionWords(words);
  };

  // Start review from dashboard (due words)
  const handleStartReview = (dueWords) => {
    setSessionWords(dueWords);
    setSelectedLesson(null);
    setSelectedMode('flashcard');
  };

  // Flashcard rating
  const handleRate = useCallback((wordId, rating) => {
    setData(prevData => {
      const progress = prevData.progress[wordId] || getInitialProgress();
      const updated = calculateNextReview(progress, rating);

      const newData = {
        ...prevData,
        progress: { ...prevData.progress, [wordId]: updated },
        stats: {
          ...prevData.stats,
          totalReviews: prevData.stats.totalReviews + 1,
          correctAnswers: rating >= 1 ? prevData.stats.correctAnswers + 1 : prevData.stats.correctAnswers,
          todayReviews: prevData.stats.todayReviews + 1,
        },
      };

      const withStreak = updateStreak(newData);
      saveData(withStreak);
      return withStreak;
    });
  }, []);

  // Session finished
  const handleFinish = useCallback((result) => {
    setData(prevData => {
      const session = {
        date: Date.now(),
        mode: selectedMode,
        lessonId: selectedLesson?.id || 'review',
        lessonTitle: selectedLesson?.title || 'Wiederholung',
        correct: result.correct,
        total: result.total,
      };

      // For quiz/type: also update progress
      let newData = { ...prevData };
      if (selectedMode === 'quiz' || selectedMode === 'type') {
        result.results.forEach(r => {
          const progress = newData.progress[r.wordId] || getInitialProgress();
          const rating = r.correct ? 2 : 0;
          newData.progress = {
            ...newData.progress,
            [r.wordId]: calculateNextReview(progress, rating),
          };
          newData.stats = {
            ...newData.stats,
            totalReviews: newData.stats.totalReviews + 1,
            correctAnswers: r.correct ? newData.stats.correctAnswers + 1 : newData.stats.correctAnswers,
            todayReviews: newData.stats.todayReviews + 1,
          };
        });
      }

      const withSession = addSession(newData, session);
      const withStreak = updateStreak(withSession);
      saveData(withStreak);
      return withStreak;
    });

    // Go back to dashboard
    navigate('dashboard');
  }, [selectedMode, selectedLesson]);

  const handleBackToLessons = () => {
    if (selectedMode) {
      if (selectedLesson) {
        setSelectedMode(null);
      } else {
        navigate('dashboard');
      }
    } else {
      navigate('lessons');
    }
  };

  // Determine what to render
  const renderContent = () => {
    // Active learning session
    if (selectedMode && (sessionWords.length > 0 || selectedLesson)) {
      const words = selectedLesson ? selectedLesson.words : sessionWords;

      switch (selectedMode) {
        case 'flashcard':
          return (
            <Flashcard
              words={words}
              onRate={handleRate}
              onFinish={handleFinish}
              onBack={handleBackToLessons}
            />
          );
        case 'quiz':
          return (
            <Quiz
              words={words}
              onFinish={handleFinish}
              onBack={handleBackToLessons}
            />
          );
        case 'type':
          return (
            <TypeChallenge
              words={words}
              onFinish={handleFinish}
              onBack={handleBackToLessons}
            />
          );
        default:
          return null;
      }
    }

    // Mode selection (lesson chosen, no mode yet)
    if (selectedLesson && !selectedMode) {
      return (
        <ModeSelect
          lesson={selectedLesson}
          onSelectMode={handleSelectMode}
          onBack={() => setSelectedLesson(null)}
        />
      );
    }

    // Pages
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            data={data}
            onStartReview={handleStartReview}
            onNavigate={navigate}
          />
        );
      case 'lessons':
        return (
          <LessonSelect
            data={data}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'stats':
        return <Stats data={data} />;
      default:
        return null;
    }
  };

  // Hide navbar during active session
  const showNavbar = !selectedMode;

  return (
    <div className="app-shell">
      <main className="app-content">
        {renderContent()}
      </main>
      {showNavbar && <Navbar currentPage={page} onNavigate={navigate} />}
    </div>
  );
}

export default App;
