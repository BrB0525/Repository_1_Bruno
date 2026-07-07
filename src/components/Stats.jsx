import { ALL_WORDS } from '../data';
import { getMasteryLevel } from '../utils/spacedRepetition';
import { BarChart3, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { exportData } from '../utils/storage';

const DAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default function Stats({ data }) {
  const totalWords = ALL_WORDS.length;
  const learnedWords = Object.keys(data.progress).length;
  const accuracy = data.stats.totalReviews > 0
    ? Math.round((data.stats.correctAnswers / data.stats.totalReviews) * 100)
    : 0;

  // Find weakest words (lowest mastery with at least 1 review)
  const weakWords = ALL_WORDS
    .map(w => ({ ...w, mastery: getMasteryLevel(data.progress[w.id]) }))
    .filter(w => data.progress[w.id] && w.mastery < 60)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 5);

  const maxWeekly = Math.max(...data.stats.weeklyActivity, 1);

  return (
    <div className="stats-page animate-fade-in">
      <div className="page-header">
        <BarChart3 color="var(--accent-primary)" size={28} />
        <h2>Statistiken</h2>
      </div>

      {/* Overview Cards */}
      <div className="stats-overview">
        <div className="overview-card glass-panel">
          <div className="overview-value">{learnedWords}/{totalWords}</div>
          <div className="overview-label">Wörter begonnen</div>
        </div>
        <div className="overview-card glass-panel">
          <div className="overview-value">{accuracy}%</div>
          <div className="overview-label">Genauigkeit</div>
        </div>
        <div className="overview-card glass-panel">
          <div className="overview-value">{data.stats.totalReviews}</div>
          <div className="overview-label">Reviews gesamt</div>
        </div>
        <div className="overview-card glass-panel">
          <div className="overview-value">{data.stats.streak} 🔥</div>
          <div className="overview-label">Tage Streak</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="weekly-chart glass-panel">
        <h3>
          <TrendingUp size={18} style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
          Diese Woche
        </h3>
        <div className="chart-bars">
          {data.stats.weeklyActivity.map((value, i) => (
            <div key={i} className="chart-bar-wrapper">
              <div className="chart-bar">
                <div
                  className="chart-bar-fill"
                  style={{ height: `${(value / maxWeekly) * 100}%` }}
                />
              </div>
              <span className="chart-label">{DAY_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weakest Words */}
      {weakWords.length > 0 && (
        <div className="weak-words glass-panel">
          <h3>
            <AlertTriangle size={18} style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
            Schwächste Wörter
          </h3>
          <div className="weak-word-list">
            {weakWords.map(w => (
              <div key={w.id} className="weak-word-item">
                <div className="weak-word-text">
                  <span className="weak-word-fr">{w.word}</span>
                  <span className="weak-word-de">{w.translation}</span>
                </div>
                <div className="weak-word-mastery">
                  <div className="mastery-bar small">
                    <div className="mastery-fill" style={{ width: `${w.mastery}%`, background: w.mastery < 30 ? 'var(--accent-error)' : '#f97316' }} />
                  </div>
                  <span>{w.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export */}
      <button className="btn-outline export-btn" onClick={exportData}>
        <Download size={18} />
        Daten exportieren (Backup)
      </button>
    </div>
  );
}
