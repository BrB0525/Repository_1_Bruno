import { Flame, Target, Play, Clock } from 'lucide-react';
import { ALL_WORDS } from '../data';
import { getDueWords } from '../utils/spacedRepetition';

export default function Dashboard({ data, onStartReview, onNavigate }) {
  const dueWords = getDueWords(ALL_WORDS, data.progress);
  const todayProgress = Math.min(100, Math.round((data.stats.todayReviews / data.stats.dailyGoal) * 100));
  const totalLearned = Object.keys(data.progress).length;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (todayProgress / 100) * circumference;

  const recentSessions = (data.sessions || []).slice(0, 3);

  return (
    <div className="dashboard animate-fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Fluency</h1>
          <p className="subtitle">Lerne Französisch – Schritt für Schritt</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card glass-panel">
          <Flame className="stat-icon" color="#f97316" size={28} />
          <div className="stat-value">{data.stats.streak}</div>
          <div className="stat-label">Tage Streak</div>
        </div>

        {/* Daily Goal Progress Ring */}
        <div className="stat-card glass-panel daily-goal-card">
          <div className="progress-ring-container">
            <svg className="progress-ring" width="120" height="120" viewBox="0 0 120 120">
              <circle
                className="progress-ring-bg"
                cx="60" cy="60" r="54"
                strokeWidth="8"
                fill="none"
              />
              <circle
                className="progress-ring-fill"
                cx="60" cy="60" r="54"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="progress-ring-text">
              <span className="progress-ring-value">{data.stats.todayReviews}</span>
              <span className="progress-ring-goal">/ {data.stats.dailyGoal}</span>
            </div>
          </div>
          <div className="stat-label">Tagesziel</div>
        </div>

        <div className="stat-card glass-panel">
          <Target className="stat-icon" color="var(--accent-primary)" size={28} />
          <div className="stat-value">{totalLearned}</div>
          <div className="stat-label">Wörter gelernt</div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="quick-start glass-panel">
        <div className="quick-start-info">
          <h3>🇫🇷 Weiterlernen</h3>
          <p>{dueWords.length > 0 
            ? `${dueWords.length} Wörter warten auf dich`
            : 'Starte eine neue Lektion!'
          }</p>
        </div>
        <button 
          className="btn-primary quick-start-btn"
          onClick={dueWords.length > 0 ? () => onStartReview(dueWords.slice(0, 10)) : () => onNavigate('lessons')}
        >
          <Play size={20} />
          {dueWords.length > 0 ? 'Wiederholen' : 'Neue Lektion'}
        </button>
      </div>

      {/* Recent Activity */}
      {recentSessions.length > 0 && (
        <div className="recent-activity">
          <h3 style={{ marginBottom: '0.75rem' }}>
            <Clock size={18} style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
            Letzte Aktivität
          </h3>
          {recentSessions.map((session, i) => (
            <div key={i} className="activity-item glass-panel">
              <div className="activity-mode">{session.mode === 'flashcard' ? '📇' : session.mode === 'quiz' ? '❓' : '✍️'}</div>
              <div className="activity-details">
                <span className="activity-lesson">{session.lessonTitle || 'Wiederholung'}</span>
                <span className="activity-score">{session.correct}/{session.total} richtig</span>
              </div>
              <span className="activity-date">{new Date(session.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
