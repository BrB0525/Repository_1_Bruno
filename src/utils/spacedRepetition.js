// Simplified SM-2 Spaced Repetition Algorithm
// Based on: https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm

/**
 * Rating scale:
 * 0 = "Nochmal" (Again) - complete failure
 * 1 = "Schwer" (Hard) - correct with difficulty
 * 2 = "Gut" (Good) - correct with some effort
 * 3 = "Leicht" (Easy) - correct effortlessly
 */

const MIN_EASE_FACTOR = 1.3;

export function getInitialProgress() {
  return {
    easeFactor: 2.5,
    interval: 0,       // days
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: null,
    totalReviews: 0,
    correctCount: 0,
  };
}

export function calculateNextReview(progress, rating) {
  const p = { ...progress };
  p.totalReviews += 1;
  p.lastReview = Date.now();

  if (rating >= 1) {
    p.correctCount += 1;
  }

  if (rating === 0) {
    // Failed: reset
    p.repetitions = 0;
    p.interval = 0;
    p.nextReview = Date.now(); // Review again immediately (next session)
  } else {
    // Success with varying quality
    if (p.repetitions === 0) {
      p.interval = 1; // 1 day
    } else if (p.repetitions === 1) {
      p.interval = 3; // 3 days
    } else {
      p.interval = Math.round(p.interval * p.easeFactor);
    }

    // Adjust ease factor based on rating
    // rating 1 (Hard): decrease ease
    // rating 2 (Good): keep ease
    // rating 3 (Easy): increase ease
    const qualityMap = { 1: 2, 2: 3, 3: 5 }; // Map to SM-2 quality (0-5)
    const q = qualityMap[rating] || 3;
    p.easeFactor = Math.max(
      MIN_EASE_FACTOR,
      p.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    );

    p.repetitions += 1;
    p.nextReview = Date.now() + p.interval * 24 * 60 * 60 * 1000;
  }

  return p;
}

/**
 * Get words that are due for review, sorted by priority
 */
export function getDueWords(allWords, progressData) {
  const now = Date.now();

  const wordsWithPriority = allWords.map(word => {
    const progress = progressData[word.id];
    if (!progress) {
      // New word: highest priority
      return { ...word, priority: 1000, isNew: true };
    }
    if (progress.nextReview <= now) {
      // Due for review: priority based on how overdue
      const overdueDays = (now - progress.nextReview) / (24 * 60 * 60 * 1000);
      return { ...word, priority: 100 + overdueDays, isNew: false };
    }
    // Not yet due
    return { ...word, priority: 0, isNew: false };
  });

  return wordsWithPriority
    .filter(w => w.priority > 0)
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Get mastery level for a word (0-100%)
 */
export function getMasteryLevel(progress) {
  if (!progress) return 0;
  if (progress.totalReviews === 0) return 0;
  
  const accuracy = progress.correctCount / progress.totalReviews;
  const repBonus = Math.min(progress.repetitions / 5, 1); // max bonus at 5 reps
  
  return Math.round(Math.min(100, (accuracy * 60) + (repBonus * 40)));
}

/**
 * Get lesson mastery (average of all words in lesson)
 */
export function getLessonMastery(lessonWords, progressData) {
  if (lessonWords.length === 0) return 0;
  
  const total = lessonWords.reduce((sum, word) => {
    return sum + getMasteryLevel(progressData[word.id]);
  }, 0);
  
  return Math.round(total / lessonWords.length);
}
