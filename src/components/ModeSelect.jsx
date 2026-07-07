import { Layers, BrainCircuit, Pen } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

export default function ModeSelect({ lesson, onSelectMode, onBack }) {
  const modes = [
    { id: 'flashcard', title: 'Karteikarten', desc: 'Wörter mit Flip-Karten lernen', icon: Layers, color: 'var(--accent-primary)' },
    { id: 'quiz', title: 'Quiz', desc: 'Multiple-Choice Fragen', icon: BrainCircuit, color: 'var(--accent-success)' },
    { id: 'type', title: 'Schreiben', desc: 'Übersetzungen tippen', icon: Pen, color: '#f97316' },
  ];

  return (
    <div className="mode-select animate-fade-in">
      <div className="session-header">
        <button className="btn-icon" onClick={onBack}>
          <ArrowLeft size={22} />
        </button>
        <h3 style={{ flex: 1, textAlign: 'center' }}>{lesson.icon} {lesson.title}</h3>
        <div style={{ width: 40 }} />
      </div>

      <p className="subtitle" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Wähle deinen Lernmodus</p>

      <div className="mode-grid">
        {modes.map(mode => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              className="mode-card glass-panel"
              onClick={() => onSelectMode(mode.id)}
            >
              <Icon size={36} color={mode.color} />
              <h3>{mode.title}</h3>
              <p>{mode.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
