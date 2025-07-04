import { useEffect, useState } from "react";
import "./AddBookForm.scss";
// import booksListData from "../BooksData/BooksData";
import { useNavigate, useParams } from "react-router-dom";

const AddBookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [status, setStatus] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const [inputBookCoverUrl, setInputBookCoverUrl] = useState("");
  const [bookCoverUrl, setBookCoverUrl] = useState("");

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

  useEffect(() => {
    if (id) {
      const storedBooks = localStorage.getItem("booksListData");
      const books: Book[] = storedBooks ? JSON.parse(storedBooks) : [];

      const foundBook = books.find((item) => item.id === id);

      if (foundBook) {
        setTitle(foundBook.title);
        setAuthor(foundBook.author);
        setGenre(foundBook.genre);
        setPublishedYear(foundBook.publishedYear.toString());
        setBookCoverUrl(foundBook.coverImage);
        setStatus(foundBook.status);
        setIsRead(foundBook.isRead);
        setIsFavorite(foundBook.isFavorite);
      } else {
        alert("Book not found.");
      }
    }
  }, [id]);

  useEffect(() => {
    if (inputBookCoverUrl) {
      setBookCoverUrl(inputBookCoverUrl);
    }
  }, [inputBookCoverUrl]);

  const handleSave = () => {
    if (!title || !author || !genre || !publishedYear || !status) {
      alert("Please fill all the fields.");
      return;
    }

    const newBook = {
      id:
        id ||
        //  booksListData.length + 1,
        Date.now().toString(),
      title,
      author,
      genre,
      publishedYear: parseInt(publishedYear),
      coverImage: bookCoverUrl,
      isRead,
      isFavorite,
      createdAt: new Date().toISOString(),
      status,
      description: "",
      tags: [],
    };

    const storedBooks = localStorage.getItem("booksListData");
    const books = storedBooks ? JSON.parse(storedBooks) : [];

    if (id) {
      const bookIndex = books.findIndex((book: Book) => book.id === id);
      if (bookIndex !== -1) {
        books[bookIndex] = {
          ...books[bookIndex],
          ...newBook,
        };
      } else {
        alert("Book not found.");
        return;
      }
    } else {
      books.push(newBook);
    }

    localStorage.setItem("booksListData", JSON.stringify(books));

    navigate("/");
  };

  return (
    <div className="add_book_form">
      <div className="add_book_container">
        <h2 className="add_book_title">
          {id ? `Edit Book : ${title}` : `Add New Book`}
        </h2>

        {/* 1st row */}
        <div className="row ">
          <div className="title_input">
            <label htmlFor="book_title" className="label">
              Book Title
            </label>
            <input
              id="book_title"
              className="input_title"
              placeholder="Enter Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="title_input">
            <label htmlFor="author_name" className="label">
              Author Name
            </label>
            <input
              id="author_name"
              className="input_title"
              placeholder="Enter Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        {/* 2nd row */}
        <div className="row">
          <div className="title_input">
            <label htmlFor="genre" className="label">
              Genre
            </label>
            <input
              id="genre"
              className="input_title"
              placeholder="Enter Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="title_input">
            <label htmlFor="published_year" className="label">
              Published Year
            </label>
            <input
              type="number"
              id="published_year"
              className="input_title"
              placeholder="YYYY"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              min={1500}
              max={2500}
            />
          </div>
        </div>

        {/* 3rd row */}
        <div className="row">
          <div className="title_input">
            <label htmlFor="cover_image" className="label">
              Upload Cover
            </label>
            {/* <input
              type="file"
              id="cover_image"
              className="input_title"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setInputBookCoverUrl(imageUrl);
                }
              }}
            /> */}
            <input
              type="file"
              id="cover_image"
              className="input_title"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    const base64String = reader.result;
                    if (typeof base64String === "string") {
                      setInputBookCoverUrl(base64String);
                      // localStorage.setItem("coverImageBase64", base64String);
                    }
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <div className="title_input">
            <label className="label">Preview</label>
            <div className="cover_border">
              {bookCoverUrl ? (
                <img
                  className="visible_cover_image"
                  src={bookCoverUrl}
                  alt="Cover preview"
                />
              ) : (
                <div className="image_preview_text">Image Preview</div>
              )}
            </div>
          </div>
        </div>

        {/* 4th row */}
        <div className="row">
          <div className="title_input status_group">
            <label className="label">Status</label>
            <div>
              <input
                type="radio"
                id="to_read"
                name="status"
                checked={status === "to read"}
                onChange={() => setStatus("to read")}
              />
              <label htmlFor="to_read">To Read</label>
            </div>
            <div>
              <input
                type="radio"
                id="reading"
                name="status"
                checked={status === "reading"}
                onChange={() => setStatus("reading")}
              />
              <label htmlFor="reading">Reading</label>
            </div>
            <div>
              <input
                type="radio"
                id="finished"
                name="status"
                checked={status === "finished"}
                onChange={() => setStatus("finished")}
              />
              <label htmlFor="finished">Finished</label>
            </div>
          </div>
          <div className="mark_checkboxes">
            <div>
              <input
                id="mark_as_favorite"
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
              />
              <label htmlFor="mark_as_favorite">Mark as Favorite</label>
            </div>
            <div>
              <input
                id="mark_as_read"
                type="checkbox"
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
              <label htmlFor="mark_as_read">Mark as Read</label>
            </div>
          </div>
        </div>

        {/* 5th row */}
        <div className="row action_buttons_row">
          <div className="tool_buttons">
            <div className="cancel_button">
              <button id="button_cancel" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
            <div>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
