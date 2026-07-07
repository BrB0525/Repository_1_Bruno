// localStorage Wrapper für Fluency
const STORAGE_KEY = 'fluency_data';

const defaultData = () => ({
  progress: {},       // { wordId: { easeFactor, interval, repetitions, nextReview, lastReview } }
  stats: {
    totalReviews: 0,
    correctAnswers: 0,
    streak: 0,
    lastStudyDate: null,
    dailyGoal: 10,
    todayReviews: 0,
    todayDate: null,
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Mon-Sun
  },
  sessions: [],       // { date, mode, lessonId, correct, total }
});

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    // Merge with defaults in case of new fields
    return { ...defaultData(), ...parsed, stats: { ...defaultData().stats, ...parsed.stats } };
  } catch {
    return defaultData();
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

export function getWordProgress(data, wordId) {
  return data.progress[wordId] || null;
}

export function updateStreak(data) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (data.stats.lastStudyDate === today) {
    return data; // Already studied today
  }

  const newData = { ...data, stats: { ...data.stats } };

  if (data.stats.lastStudyDate === yesterday) {
    newData.stats.streak += 1;
  } else if (data.stats.lastStudyDate !== today) {
    newData.stats.streak = 1;
  }

  newData.stats.lastStudyDate = today;

  // Reset daily counter if new day
  if (data.stats.todayDate !== today) {
    newData.stats.todayReviews = 0;
    newData.stats.todayDate = today;
  }

  // Update weekly activity
  const dayOfWeek = new Date().getDay();
  const mondayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  newData.stats.weeklyActivity = [...data.stats.weeklyActivity];
  newData.stats.weeklyActivity[mondayIndex] = (newData.stats.weeklyActivity[mondayIndex] || 0) + 1;

  return newData;
}

export function addSession(data, session) {
  const newData = { ...data };
  newData.sessions = [session, ...data.sessions].slice(0, 50); // Keep last 50
  return newData;
}

export function exportData() {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fluency_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    saveData({ ...defaultData(), ...data });
    return true;
  } catch {
    return false;
  }
}
