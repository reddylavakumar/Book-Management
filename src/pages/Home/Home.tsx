import InfoCard from "../../components/InfoCard/InfoCard";
import React, { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import BookList from "../../components/BookList/BookList";
import Toggle from "../../components/Toggle/Toggle";
// import booksListData from "../../components/BooksData/BooksData";
type InfoCardDataItem = {
  id: number;
  label: string;
  value: string | number;
};
type ReadStatusDataItem = {
  id: number | string;
  label: string;
  value: string;
};

interface BookData {
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

interface HomeProps {
  searchKeyWord: string;
}
const Home: React.FC<HomeProps> = ({ searchKeyWord }) => {
  const booksData: BookData[] = useMemo(() => {
    const storedData = localStorage.getItem("booksListData");
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing booksListData from localStorage:", error);
      return [];
    }
  }, []);

  const [activeButton, setActiveButton] = useState<number | string | null>(
    null
  );
  const [infoCardData, setInfoCardData] = useState<InfoCardDataItem[]>([]);

  interface optionsForGenreType {
    id: number | string;
    text: string;
    value: string;
  }

  const [optionsForGenre, setOptionsForGenre] = useState<optionsForGenreType[]>(
    []
  );
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  useEffect(() => {
    // ---select options setting based on data---
    const uniqueGenres = Array.from(
      new Set(booksData.map((item) => item.genre))
    );

    const sortedGenres = uniqueGenres.sort((a, b) => a.localeCompare(b));
    const optsObject = sortedGenres.map((genre, index) => ({
      id: index + 1,
      text: genre,
      value: genre,
    }));

    optsObject.unshift({ id: 0, text: "All Genres", value: "0" });

    setOptionsForGenre(optsObject);
    // ---Info card data---
    const totalBooks = booksData.length;
    const currentlyReading = booksData.filter(
      (book) => book.status === "reading"
    ).length;
    const favorites = booksData.filter((book) => book.isFavorite).length;
    const finished = booksData.filter(
      (book) => book.status === "finished"
    ).length;
    const others = booksData.filter((book) => book.status === "others").length;

    const updatedInfoCardData = [
      { id: 1, label: "Total Books", value: totalBooks },
      { id: 2, label: "Currently Reading", value: currentlyReading },
      { id: 3, label: "Favorites", value: favorites },
      { id: 4, label: "Finished", value: finished },
      { id: 5, label: "Others", value: others },
    ];

    setInfoCardData(updatedInfoCardData);
  }, [booksData]);

  const ReadStatus: ReadStatusDataItem[] = [
    { id: 1, label: "To - Read", value: "to read" },
    { id: 2, label: "Reading", value: "Reading" },
    { id: 3, label: "Finished", value: "Finished" },
  ];

  const [filters, setFilters] = useState<string>("");
  const [books, setBooks] = useState(booksData);
  const [isFavoriteList, setIsFavoriteList] = useState<boolean>(false);

  useEffect(() => {
    let filteredBooks = booksData;
    if (searchKeyWord) {
      const lowerCasedKeyword = searchKeyWord.toLowerCase();
      filteredBooks = filteredBooks.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCasedKeyword)
        )
      );
    }

    if (filters) {
      const lowerCasedFilter = filters.toLowerCase();
      filteredBooks = filteredBooks.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCasedFilter)
        )
      );
    }

    if (isFavoriteList) {
      filteredBooks = filteredBooks.filter(
        (item) => item?.isFavorite === isFavoriteList
      );
    }

    if (selectedGenre) {
      if (selectedGenre != "0") {
        filteredBooks = filteredBooks.filter(
          (item) => item?.genre === selectedGenre
        );
      }
    }

    setBooks(filteredBooks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyWord, filters, isFavoriteList, selectedGenre]);

  return (
    <div className="home">
      {/* ---top info card--- */}
      <div className={"top_cards"}>
        {infoCardData.map((item) => (
          <div key={item.id} className={"card_wrapper"}>
            <InfoCard label={item.label} value={item.value} />
          </div>
        ))}
      </div>

      {/* ---filter favorites row--- */}
      <div className="filter_favorites">
        <div className="genres_read_status_buttons">
          {/* ---select field--- */}
          <div>
            <select
              id="genre"
              defaultValue="0"
              className="genre_select"
              onChange={(e) => setSelectedGenre(e.target?.value)}
            >
              {optionsForGenre?.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          {/* ---read status buttons--- */}
          <div className="read_status_div">
            {ReadStatus?.map((item) => {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (activeButton === item.value) {
                        setActiveButton("");
                        setFilters("");
                      } else {
                        setActiveButton(item.value);
                        setFilters(item.value);
                      }
                    }}
                    className={
                      activeButton === item.value
                        ? "read_status_buttons_active"
                        : "read_status_buttons"
                    }
                  >
                    {item?.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* ---favorites toggle--- */}
        <div>
          <Toggle
            checked={isFavoriteList}
            onToggle={() => setIsFavoriteList((prev) => !prev)}
          />
        </div>
      </div>

      {/* ---book cards--- */}
      <div className="book_list_div">
        <BookList books={books} />
      </div>
    </div>
  );
};

export default Home;
