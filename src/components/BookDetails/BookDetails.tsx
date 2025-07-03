import React, { useEffect, useState } from "react";
import "./BookDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import booksListData from "../BooksData/BooksData";

type Book = {
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
};

const BookDetails: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const foundBook = booksListData.find((item) => item.id === id);
      setBook(foundBook || null);
    }
  }, [id]);

  if (!book) {
    return <p className="book-details__loading">Loading book details...</p>;
  }

  console.log(book, "book");

  const handleDelete = async (id: string) => {
    if (id) {
      //   handleDeleteBook(id);
      //   const afterRemovedBooksData = booksListData.filter(
      //     (item) => item.id != id
      //   );
      //   booksListData = afterRemovedBooksData;
      //   navigate("/");
    }
  };
  return (
    <div className="book-details">
      <div className="book-details__card">
        <img
          src={
            book?.coverImage.length == 0
              ? "https://www.pngall.com/wp-content/uploads/5/Vector-Shape-PNG-High-Quality-Image.png"
              : "book?.coverImage==-1"
          }
          alt="Book Cover"
          className="book-details__image"
        />

        <div className="book-details__info">
          <h2 className="book-details__title">{book.title}</h2>
          <h3 className="book-details__author">{book.author}</h3>

          <div className="book-details__genre">{book.genre}</div>
          <p className="book-details__published">
            Published: {book.publishedYear}
          </p>

          <div className="book-details__status">
            <span
              className={`status-dot ${book.isRead ? "finished" : "unread"}`}
            ></span>
            <span>{book.isRead ? "Finished" : "Mark as Read"}</span>
          </div>

          {book.tags?.length > 0 && (
            <div className="book-details__tags">
              {book.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="book-details__actions">
            <button
              className="btn edit"
              onClick={() => navigate(`/edit/${book.id}`)}
            >
              Edit Book
            </button>
            <button
              className="btn delete"
              onClick={() => handleDelete(book.id)}
            >
              Delete Book
            </button>
            <button className="btn reading">Mark as Reading</button>
          </div>
        </div>
      </div>

      <div className="book-details__description">
        <h4>Description / Notes</h4>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
