import { LESSONS } from '../data';
import { getLessonMastery } from '../utils/spacedRepetition';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function LessonSelect({ data, onSelectLesson }) {
  return (
    <div className="lesson-select animate-fade-in">
      <div className="page-header">
        <BookOpen color="var(--accent-primary)" size={28} />
        <h2>Lektionen</h2>
      </div>
      <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Wähle eine Lektion zum Lernen</p>

      <div className="lesson-grid">
        {LESSONS.map(lesson => {
          const mastery = getLessonMastery(lesson.words, data.progress);
          const learnedCount = lesson.words.filter(w => data.progress[w.id]).length;

          return (
            <div
              key={lesson.id}
              className="lesson-card glass-panel"
              onClick={() => onSelectLesson(lesson)}
            >
              <div className="lesson-card-header">
                <span className="lesson-icon">{lesson.icon}</span>
                <ChevronRight size={20} color="var(--text-secondary)" />
              </div>
              <h3 className="lesson-title">{lesson.title}</h3>
              <p className="lesson-desc">{lesson.description}</p>
              <div className="lesson-meta">
                <span className="lesson-count">{learnedCount}/{lesson.words.length} Wörter</span>
              </div>
              <div className="mastery-bar">
                <div className="mastery-fill" style={{ width: `${mastery}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
