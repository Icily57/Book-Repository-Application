interface Book {
    id: number;
    title: string;
    author: string;
    year: string;
  }
  
  const MyBooks: Book[] = [
    { id: 1, title: '1984', author: 'George Orwell', year: '1949' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925' },
    { id: 4, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', year: '1967' },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813' },
    { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: '1951' },
    { id: 7, title: 'Moby-Dick', author: 'Herman Melville', year: '1851' },
    { id: 8, title: 'War and Peace', author: 'Leo Tolstoy', year: '1869' },
    { id: 9, title: 'The Odyssey', author: 'Homer', year: '8th century BC' },
    { id: 10, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: '1866' }
  ];
  
  export default MyBooks;
  