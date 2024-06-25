import './BookList.scss';

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

interface BookListProps {
  books: Book[];
  updateBook: (book: Book) => void;
  deleteBook: (id: number) => void;
}

function BookList({ books, updateBook, deleteBook }: BookListProps) {
  const handleEdit = (book: Book) => {
    const updatedTitle = prompt('New title:', book.title);
    const updatedAuthor = prompt('New author:', book.author);
    const updatedYear = prompt('New publication year:', book.year);

    if (updatedTitle && updatedAuthor && updatedYear) {
      updateBook({ ...book, title: updatedTitle, author: updatedAuthor, year: updatedYear });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookList;
