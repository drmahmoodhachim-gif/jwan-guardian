export const FACT_TOPICS = [
  'Ancient Egypt','Black holes','How language works','Optical illusions','Deep sea creatures','History of writing','Volcanoes','The human brain','How stories work','Bioluminescence','Rainforests','Cryptography'
] as const

export const BOOK_CATEGORIES = [
  'Mystery','Science facts','Adventure','Myth and legend','Historical fiction','Science fiction','Comics and graphic novels','Animals','Puzzles and codes'
] as const

export const CURATED_BOOKS = [
  { title: 'The Westing Game', author: 'Ellen Raskin', ageLevel: 'Age 10–14', why: 'A locked-room mystery with 16 suspects and a genius plot. Reading level matches Jwan\'s exactly.', color: 'purple' },
  { title: 'A Wrinkle in Time', author: 'Madeleine L\'Engle', ageLevel: 'Age 10–13', why: 'Science, mathematics, and a brave girl protagonist. The physics is real.', color: 'teal' },
  { title: 'Hilo: The Boy Who Crashed to Earth', author: 'Judd Winick', ageLevel: 'Age 8–12', why: 'Graphic novel format. Adventure + science + comics — exactly Jwan\'s style.', color: 'amber' },
  { title: 'The Giver', author: 'Lois Lowry', ageLevel: 'Age 11–14', why: 'Philosophical, layered, makes you think hard about society. Perfect for her level.', color: 'coral' },
  { title: 'From the Mixed-Up Files of Mrs. Basil E. Frankweiler', author: 'E.L. Konigsburg', ageLevel: 'Age 10–13', why: 'A girl who hides in a museum and solves an art mystery. Clever protagonist, rich details.', color: 'purple' },
  { title: 'Astrophysics for Young People in a Hurry', author: 'Neil deGrasse Tyson (adapted)', ageLevel: 'Age 11+', why: 'Real astrophysics explained with wit. Her VCI of 140 means she can handle the actual science.', color: 'teal' },
] as const

export const QUIZ_QUESTIONS = [
  { question: 'The word "novel" originally came from an Italian word meaning what?', options: ['Long story', 'New thing', 'Night tale', 'Written words'], correct: 1, fact: 'The Italian word "novella" means "new" or "news." Early novels were considered a new form of literature.' },
  { question: 'Which ancient civilisation produced the oldest surviving written story — the Epic of Gilgamesh?', options: ['Ancient Egypt', 'Ancient Greece', 'Ancient Sumer (Mesopotamia)', 'Ancient China'], correct: 2, fact: 'The Epic of Gilgamesh was written on clay tablets in ancient Sumer (modern-day Iraq), around 2100 BCE — over 4,000 years ago.' },
  { question: 'The Hogwarts motto "Draco dormiens nunquam titillandus" means what in Latin?', options: ['Knowledge is power', 'Never tickle a sleeping dragon', 'The brave shall be rewarded', 'Fear no darkness'], correct: 1, fact: 'J.K. Rowling chose this deliberately humorous motto. Unlike most serious school mottos, this one is absurdly practical advice.' },
  { question: 'The word "robot" was invented for a 1920 Czech play. What does the Czech word "robota" mean?', options: ['Mechanical man', 'Forced labour', 'Iron creature', 'Thinking machine'], correct: 1, fact: 'Karel Capek coined "robot" in his play R.U.R. The word comes from "robota" meaning forced labour or drudgery in Czech.' },
  { question: 'Sherlock Holmes\'s famous phrase "Elementary, my dear Watson" — how often does he say it in the original stories?', options: ['Many times', 'Only once', 'Never', 'Three times'], correct: 2, fact: 'Holmes never says this exact phrase in any of Doyle\'s 60 original stories. It was added later by others — a famous misquotation.' },
  { question: 'In what language was the word "algebra" first used?', options: ['Greek', 'Latin', 'Arabic', 'Persian'], correct: 2, fact: 'Algebra comes from the Arabic "al-jabr," from the 9th century mathematician al-Khwarizmi. His name also gave us the word "algorithm."' },
  { question: 'How many words does the average novel contain?', options: ['10,000–20,000', '30,000–50,000', '70,000–100,000', '200,000–300,000'], correct: 2, fact: 'Most novels run 70,000–100,000 words. Tolkien\'s Lord of the Rings trilogy contains over 473,000 words.' },
  { question: 'The word "serendipity" was invented by a writer in 1754. He based it on a Persian fairy tale about which place?', options: ['Arabia', 'Sri Lanka (Serendip)', 'Persia', 'India'], correct: 1, fact: 'Horace Walpole coined "serendipity" from "Serendip," the old Persian name for Sri Lanka. The fairy tale was called "The Three Princes of Serendip."' },
] as const

export const DAILY_FACT_TOPICS = [
  'the history of writing systems',
  'bioluminescent creatures of the deep ocean',
  'how the brain processes and remembers stories',
  'Ancient Mesopotamian myths and the Epic of Gilgamesh',
  'the science of how rainbows form',
  'the history of cryptography and secret codes',
  'the oldest libraries in human history',
] as const

export const SPINE_COLORS = ['#1D9E75', '#534AB7', '#D85A30', '#BA7517', '#D4537E', '#378ADD', '#639922', '#5F5E5A'] as const

