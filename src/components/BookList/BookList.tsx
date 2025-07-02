import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BookList.scss";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  coverImage: string;
  isRead: boolean;
  isFavorite: boolean;
  createdAt: string;
  status: string;
  description: string;
  tags: string[];
  readingProgress?: {
    currentPage: number;
    totalPages: number;
    updatedAt: string;
  };
}
interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books?.length > 0 ? (
        <div className="book_cards">
          {books?.map((book) => (
            <div key={book.id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no_books_found">
          <span>No Books found</span>
        </div>
      )}
    </div>
  );
};

export default BookList;
