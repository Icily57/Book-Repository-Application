// src/App.tsx

import { useState, useReducer, useCallback, useEffect } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';
import BookForm from './Components/BookForm';
import BookList from './Components/BookList';
import Pagination from './Components/Pagination';
import MyBooks from './Data/MyBooks'; 
import './App.scss';

type Book = {
  id: number;
  title: string;
  author: string;
  year: string;
};

type ActionType =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'SET_BOOKS'; payload: Book[] };

const bookReducer = (state: Book[], action: ActionType): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map((book) => (book.id === action.payload.id ? action.payload : book));
    case 'DELETE_BOOK':
      return state.filter((book) => book.id !== action.payload);
    case 'SET_BOOKS':
      return action.payload;
    default:
      return state;
  }
};

function App() {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [localBooks, setLocalBooks] = useLocalStorage<Book[]>('books', MyBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize localBooks from MyBooks if local storage is empty
  useEffect(() => {
    if (localBooks.length === 0) {
      setLocalBooks(MyBooks);
    }
  }, [localBooks, setLocalBooks]);

  // Set books state when localBooks changes
  useEffect(() => {
    dispatch({ type: 'SET_BOOKS', payload: localBooks });
  }, [localBooks]);

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const updateBook = (book: Book) => {
    dispatch({ type: 'UPDATE_BOOK', payload: book });
  };

  const deleteBook = (id: number) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const booksPerPage = 5;
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  return (
    <div className="app">
      <h1>Book Repository</h1>
      <BookForm addBook={addBook} />
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
            
      <BookList books={paginatedBooks} updateBook={updateBook} deleteBook={deleteBook} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
}

export default App;
