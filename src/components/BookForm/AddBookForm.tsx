import { useEffect, useState } from "react";
import "./AddBookForm.scss";
import booksListData from "../BooksData/BooksData";
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
      const booksArray: Book[] = booksListData.filter((item) => item.id === id);
      const booksObject: Record<string, Book> = booksArray.reduce(
        (acc, book) => {
          acc[book.id] = book;
          return acc;
        },
        {} as Record<string, Book>
      );

      console.log(booksObject[id]);
      setTitle(booksObject[id].title);
      setAuthor(booksObject[id].author);
      setGenre(booksObject[id].genre);
      setPublishedYear(booksObject[id].publishedYear.toString());
      setBookCoverUrl(booksObject[id].coverImage);
      setStatus(booksObject[id].status);
      setIsRead(booksObject[id].isRead);
      setIsFavorite(booksObject[id].isFavorite);
    }
  }, [id]);

  useEffect(() => {
    if (inputBookCoverUrl) {
      setBookCoverUrl(inputBookCoverUrl);
    }
  }, [inputBookCoverUrl]);

  // const handleSave = () => {
  //   if (!title || !author || !genre || !publishedYear || !status) {
  //     alert("Please fill all the fields.");
  //     return;
  //   }
  //   const newBook = {
  //     id: (booksListData.length + 1).toString(),
  //     title,
  //     author,
  //     genre,
  //     publishedYear: parseInt(publishedYear),
  //     coverImage: bookCoverUrl,
  //     isRead,
  //     isFavorite,
  //     createdAt: new Date().toISOString(),
  //     status,
  //     description: "",
  //     tags: [],
  //   };
  //   if (id) {
  //     console.log(booksListData[id], "log");
  //     booksListData[id].title = newBook.title;
  //     booksListData[id].author = newBook.author;
  //     booksListData[id].genre = newBook.genre;
  //     booksListData[id].published_year = newBook.publishedYear;
  //     booksListData[id].cover_image = newBook.coverImage;
  //     booksListData[id].isRead = newBook.isRead;
  //     booksListData[id].isFavorite = newBook.isFavorite;
  //     booksListData[id].status = newBook.status;
  //     booksListData[id].description = newBook.description;
  //     navigate("/");
  //   } else {
  //     booksListData.push(newBook);
  //     navigate("/");
  //   }
  // };

  const handleSave = () => {
    // Check for required fields
    if (!title || !author || !genre || !publishedYear || !status) {
      alert("Please fill all the fields.");
      return;
    }

    const newBook = {
      id: id || (booksListData.length + 1).toString(),
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

    if (id) {
      // Find the index of the book in the array using the id
      const bookIndex = booksListData.findIndex((book) => book.id === id);
      if (bookIndex !== -1) {
        booksListData[bookIndex] = {
          ...booksListData[bookIndex],
          ...newBook,
        };
      } else {
        alert("Book not found.");
        return;
      }
    } else {
      booksListData.push(newBook);
    }

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
            <input
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
