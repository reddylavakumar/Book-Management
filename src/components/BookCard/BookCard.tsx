import "./BookCard.scss";
import { useNavigate } from "react-router-dom";
type Book = {
  id: number | string;
  title: string;
  author: string;
  genre: string;
  publishedYear: string | number;
  coverImage: string;
  isRead: boolean;
  isFavorite: boolean;
  createdAt: string;
  status: string;
  description: string;
  tags: string[];
};

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="book_card"
        onClick={() => navigate(`about/${book.id}`)}
        // onClick={() => navigate(`edit/${book.id}`)}
      >
        <div className="image_div">
          <img
            className="card_image"
            src={
              book.coverImage
                ? book.coverImage
                : "https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg"
            }
            alt={`${book.title} cover`}
          />
        </div>
        <div>
          <p className="book_title">
            Title : <b>{book.title}</b>
          </p>
        </div>
        <div>
          <p className="book_title">
            Author : <b>{book.author}</b>
          </p>
        </div>
        <div>
          <p className="book_title">
            Genre :<b>{book.genre}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
