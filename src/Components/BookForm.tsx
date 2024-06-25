import { useRef } from 'react';
import './BookForm.scss'

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

interface BookFormProps {
  addBook: (book: Book) => void;
}

function BookForm({ addBook }: BookFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: Date.now(),
      title: titleRef.current!.value,
      author: authorRef.current!.value,
      year: yearRef.current!.value,
    };
    addBook(newBook);
    titleRef.current!.value = '';
    authorRef.current!.value = '';
    yearRef.current!.value = '';
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input className='Title' type="text" ref={titleRef} placeholder="Title" required />
      <input className='Author' type="text" ref={authorRef} placeholder="Author" required />
      <input className='Publication-Year' type="number" ref={yearRef} placeholder="Publication Year" required />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
