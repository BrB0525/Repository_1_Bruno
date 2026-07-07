import { Home, BookOpen, BarChart3 } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'lessons', label: 'Lektionen', icon: BookOpen },
    { id: 'stats', label: 'Statistiken', icon: BarChart3 },
  ];

  return (
    <nav className="bottom-nav glass-panel">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
