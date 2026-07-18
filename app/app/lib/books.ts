export interface Book {
  title: string;
  author: string;
  pages: number;
  format: "Pocket" | "A5" | "B5" | "Royal" | "A4";
  bg: string;
  color: string;
}

const bookWidthScale = 0.08;
const baseWidth = 6;
const formatHeights: Record<Book["format"], number> = {
  Pocket: 360,
  A5: 400,
  B5: 460,
  Royal: 510,
  A4: 560,
};

export function bookHeight(book: Book): number {
  return formatHeights[book.format];
}

export function bookWidth(book: Book): number {
  return baseWidth + Math.round(book.pages * bookWidthScale);
}

export const allBooks: Book[] = [
  // ── Classics ──
  { title: "1984", author: "George Orwell", pages: 328, format: "A5", bg: "#1a1a2a", color: "#dce0ea" },
  { title: "Brave New World", author: "Aldous Huxley", pages: 288, format: "A5", bg: "#2a1a1a", color: "#f0e0dc" },
  { title: "The Republic", author: "Plato", pages: 400, format: "B5", bg: "#1a2a20", color: "#dce8e0" },
  { title: "Meditations", author: "Marcus Aurelius", pages: 256, format: "A5", bg: "#1a1a10", color: "#e8e0d0" },
  { title: "The Art of War", author: "Sun Tzu", pages: 128, format: "Pocket", bg: "#2a1a0a", color: "#f0e0c8" },
  { title: "The Social Contract", author: "Jean-Jacques Rousseau", pages: 208, format: "A5", bg: "#2a2a1a", color: "#e8e8d8" },
  { title: "Julius Caesar", author: "William Shakespeare", pages: 272, format: "A5", bg: "#802020", color: "#eee8e8" },
  { title: "The Wretched of the Earth", author: "Frantz Fanon", pages: 320, format: "A5", bg: "#4a1a1a", color: "#ece4e4" },

  // ── Modern Bestsellers ──
  { title: "Sapiens", author: "Yuval Noah Harari", pages: 464, format: "B5", bg: "#1a2a28", color: "#dce8e6" },
  { title: "Homo Deus", author: "Yuval Noah Harari", pages: 528, format: "Royal", bg: "#182028", color: "#dce0e8" },
  { title: "Atomic Habits", author: "James Clear", pages: 320, format: "A5", bg: "#283020", color: "#e0e8dc" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", pages: 512, format: "Royal", bg: "#20282a", color: "#dce0e2" },
  { title: "Outliers", author: "Malcolm Gladwell", pages: 336, format: "A5", bg: "#2a2820", color: "#e8e6dc" },
  { title: "Freakonomics", author: "Steven D. Levitt", pages: 336, format: "A5", bg: "#202830", color: "#dce0e8" },
  { title: "The Tipping Point", author: "Malcolm Gladwell", pages: 304, format: "A5", bg: "#1a2420", color: "#dce4e0" },
  { title: "The Power of Habit", author: "Charles Duhigg", pages: 400, format: "B5", bg: "#20201a", color: "#e8e8dc" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", pages: 528, format: "Royal", bg: "#1a2a1a", color: "#dce8dc" },

  // ── Science & Philosophy ──
  { title: "A Brief History of Time", author: "Stephen Hawking", pages: 256, format: "A5", bg: "#101828", color: "#dce0ec" },
  { title: "The Selfish Gene", author: "Richard Dawkins", pages: 384, format: "B5", bg: "#182020", color: "#dce4e4" },
  { title: "The God Delusion", author: "Richard Dawkins", pages: 496, format: "B5", bg: "#1a1820", color: "#e0dce8" },
  { title: "The Design of Everyday Things", author: "Don Norman", pages: 368, format: "B5", bg: "#ffe030", color: "#2e2c1f" },
  { title: "Surely You're Joking, Mr. Feynman!", author: "Richard P. Feynman", pages: 352, format: "A5", bg: "#101010", color: "#ebebeb" },
  { title: "The 48 Laws of Power", author: "Robert Greene", pages: 480, format: "B5", bg: "#1a1010", color: "#e8dcdc" },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", pages: 224, format: "A5", bg: "#1a1a20", color: "#dce0e8" },

  // ── History & Politics ──
  { title: "The Origins of Totalitarianism", author: "Hannah Arendt", pages: 704, format: "A4", bg: "#201820", color: "#e8dce8" },
  { title: "The Road to Serfdom", author: "Friedrich A. Hayek", pages: 304, format: "A5", bg: "#1a2028", color: "#dce0e8" },
  { title: "How Democracies Die", author: "Daniel Ziblatt, Steven Levitsky", pages: 320, format: "A5", bg: "#203060", color: "#e8eaed" },
  { title: "Orientalism", author: "Edward Said", pages: 432, format: "B5", bg: "#1a2a3a", color: "#dce4ec" },
  { title: "The History of the Peloponnesian War", author: "Thucydides", pages: 672, format: "Royal", bg: "#2a2018", color: "#e8e0d8" },
  { title: "The Open Society and Its Enemies", author: "Karl Popper", pages: 800, format: "A4", bg: "#182018", color: "#dce4dc" },
  { title: "A People's Tragedy", author: "Orlando Figes", pages: 960, format: "A4", bg: "#2a1a10", color: "#e8ddd6" },
  { title: "Capital in the Twenty-First Century", author: "Thomas Piketty", pages: 816, format: "A4", bg: "#2a2820", color: "#e8e6dc" },

  // ── Biography & Memoir ──
  { title: "Steve Jobs", author: "Walter Isaacson", pages: 656, format: "Royal", bg: "#202020", color: "#ebebeb" },
  { title: "The Agony and the Ecstasy", author: "Irving Stone", pages: 656, format: "Royal", bg: "#f0f0f0", color: "#262626" },
  { title: "Elon Musk", author: "Walter Isaacson", pages: 688, format: "Royal", bg: "#1a1a1a", color: "#e8e8e8" },
  { title: "The Diary of a Young Girl", author: "Anne Frank", pages: 304, format: "A5", bg: "#2a1a0a", color: "#e8dcc8" },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", pages: 656, format: "Royal", bg: "#1a2a1a", color: "#dce8dc" },

  // ── Economics & Society ──
  { title: "Technopoly", author: "Neil Postman", pages: 240, format: "A5", bg: "#202020", color: "#e8e8e8" },
  { title: "The Wealth of Nations", author: "Adam Smith", pages: 960, format: "A4", bg: "#1a1a10", color: "#e8e0d0" },
  { title: "Das Kapital", author: "Karl Marx", pages: 880, format: "A4", bg: "#2a1a10", color: "#f0e0d0" },
  { title: "The Rise and Fall of the Great Powers", author: "Paul Kennedy", pages: 704, format: "A4", bg: "#1a2028", color: "#dce0e8" },
  { title: "The Silk Roads", author: "Peter Frankopan", pages: 672, format: "Royal", bg: "#2a2820", color: "#e8e6dc" },
  { title: "The Corporation", author: "Mickey Z.", pages: 320, format: "A5", bg: "#202830", color: "#dce0e8" },

  // ── Popular Fiction ──
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178, format: "A4", bg: "#1a2a1a", color: "#dce8dc" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 336, format: "A5", bg: "#2a2018", color: "#e8e0d0" },
  { title: "Dune", author: "Frank Herbert", pages: 688, format: "Royal", bg: "#1a1a2a", color: "#dcdce8" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", pages: 208, format: "A5", bg: "#2a1a10", color: "#f0e0d0" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 288, format: "A5", bg: "#1a1a1a", color: "#e8e8e8" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 208, format: "A5", bg: "#2a2820", color: "#e8e3d8" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", pages: 544, format: "Royal", bg: "#1a0a0a", color: "#f0e0d8" },
  { title: "The Alchemist", author: "Paulo Coelho", pages: 208, format: "A5", bg: "#1a2030", color: "#dce0ec" },
  { title: "The Kite Runner", author: "Khaled Hosseini", pages: 400, format: "B5", bg: "#2a1a10", color: "#e8dcc8" },
  { title: "A Game of Thrones", author: "George R.R. Martin", pages: 848, format: "A4", bg: "#1a1a10", color: "#e8e0c8" },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", pages: 224, format: "A5", bg: "#101020", color: "#dcdce8" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", pages: 432, format: "B5", bg: "#1a2a30", color: "#dce4e8" },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 384, format: "B5", bg: "#2a2018", color: "#e8ddd0" },
];

export const shelfBooks: Book[] = [
  allBooks[0],   // 1984 - 328pp A5
  allBooks[9],   // Homo Deus - 528pp Royal
  allBooks[43],  // The Lord of the Rings - 1178pp A4
  allBooks[4],   // The Art of War - 128pp Pocket
  allBooks[38],  // The Wealth of Nations - 960pp A4
];
