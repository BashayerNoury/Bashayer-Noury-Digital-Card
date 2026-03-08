export interface Quote {
  text: string;
  author: string;
}

export const quotes: Quote[] = [
  // James Clear
  { text: "If you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. Conversely, if you get 1 percent worse each day for one year, you'll decline nearly down to zero.", author: "James Clear" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "The task of breaking a bad habit is like uprooting a powerful oak within us.", author: "James Clear" },
  { text: "Be the designer of your world and not merely the consumer of it.", author: "James Clear" },
  { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },

  // Marcus Aurelius
  { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius" },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
  { text: "Accept the things to which fate binds you, and love the people with whom fate brings you together.", author: "Marcus Aurelius" },

  // Steve Jobs
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },

  // W. Timothy Gallwey (The Inner Game of Tennis)
  { text: "The opponent within one's own head is more formidable than the one the other side of the net.", author: "W. Timothy Gallwey" },
  { text: "When we plant a rose seed in the earth, we notice that it is small, but we do not criticize it.", author: "W. Timothy Gallwey" },
  { text: "Relaxation happens only when allowed, not as a result of trying or making.", author: "W. Timothy Gallwey" },
  { text: "The ability to focus the mind is the ability to not let it run away with you.", author: "W. Timothy Gallwey" },

  // Carl Jung
  { text: "Who looks outside, dreams; who looks inside, awakes.", author: "Carl Jung" },
  { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", author: "Carl Jung" },
  { text: "I am not what happened to me, I am what I choose to become.", author: "Carl Jung" },
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung" },
  { text: "Knowing your own darkness is the best method for dealing with the darknesses of other people.", author: "Carl Jung" },

  // Rainer Maria Rilke
  { text: "The only journey is the one within.", author: "Rainer Maria Rilke" },
  { text: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.", author: "Rainer Maria Rilke" },
  { text: "Perhaps all the dragons in our lives are princesses who are only waiting to see us act with beauty and courage.", author: "Rainer Maria Rilke" },
  { text: "Live the questions now. Perhaps then, someday far in the future, you will gradually, without even noticing it, live your way into the answer.", author: "Rainer Maria Rilke" },

  // Hermann Hesse
  { text: "Within you there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse" },
  { text: "Some of us think holding on makes us strong, but sometimes it is letting go.", author: "Hermann Hesse" },
  { text: "The bird fights its way out of the egg. The egg is the world. Who would be born must first destroy a world.", author: "Hermann Hesse" },
  { text: "You know quite well, deep within you, that there is only a single magic, a single power, a single salvation: and that is called loving.", author: "Hermann Hesse" },

  // Kahlil Gibran
  { text: "Your living is determined not so much by what life brings to you as by the attitude you bring to life.", author: "Kahlil Gibran" },
  { text: "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.", author: "Kahlil Gibran" },
  { text: "The deeper that sorrow carves into your being, the more joy you can contain.", author: "Kahlil Gibran" },
  { text: "You talk when you cease to be at peace with your thoughts.", author: "Kahlil Gibran" },
  { text: "And ever has it been known that love knows not its own depth until the hour of separation.", author: "Kahlil Gibran" },
];

/** Returns a deterministic quote based on the current date */
export function getDailyQuote(): Quote {
  const now = new Date();
  const dayIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  return quotes[dayIndex % quotes.length];
}
