import InfoCard from "../../components/InfoCard/InfoCard";
import React, { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import BookList from "../../components/BookList/BookList";
import Toggle from "../../components/Toggle/Toggle";
import booksListData from "../../components/BooksData/BooksData";
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
  // const booksData: BookData[] = useMemo(() => {
  //   return [
  //     {
  //       id: "1",
  //       title: "1984",
  //       author: "George Orwell",
  //       genre: "Dystopian",
  //       publishedYear: 1949,
  //       coverImage: "",
  //       // "https://example.com/1984-cover.jpg",
  //       isRead: true,
  //       isFavorite: true,
  //       createdAt: "2023-01-15T10:00:00Z",
  //       status: "finished",
  //       description:
  //         "A dystopian novel set in a totalitarian society where the Party controls everything, including thought. A timeless critique of surveillance and government control.",
  //       tags: ["classic", "political", "dystopia"],
  //     },
  //     {
  //       id: "2",
  //       title: "The Hobbit",
  //       author: "J.R.R. Tolkien",
  //       genre: "Fantasy",
  //       publishedYear: 1937,
  //       coverImage: "",

  //       // coverImage: "https://example.com/the-hobbit-cover.jpg",
  //       isRead: false,
  //       isFavorite: false,
  //       createdAt: "2023-03-02T15:30:00Z",
  //       status: "to read",
  //       description:
  //         "The story of Bilbo Baggins, a hobbit who embarks on an unexpected adventure that takes him through Middle-earth.",
  //       tags: ["fantasy", "adventure", "classic"],
  //     },
  //     {
  //       id: "3",
  //       title: "Becoming",
  //       author: "Michelle Obama",
  //       genre: "Biography",
  //       publishedYear: 2018,
  //       coverImage: "",

  //       // coverImage: "https://example.com/becoming-cover.jpg",
  //       isRead: true,
  //       isFavorite: true,
  //       createdAt: "2023-05-20T14:00:00Z",
  //       status: "finished",
  //       description:
  //         "Michelle Obama's memoir about her life, focusing on her roots, her time in the White House, and the experiences that shaped her as a person.",
  //       tags: ["inspirational", "political", "memoir"],
  //     },
  //     {
  //       id: "4",
  //       title: "The Silent Patient",
  //       author: "Alex Michaelides",
  //       genre: "Mystery",
  //       publishedYear: 2019,
  //       coverImage: "",

  //       // coverImage: "https://example.com/the-silent-patient-cover.jpg",
  //       isRead: false,
  //       isFavorite: false,
  //       createdAt: "2023-06-10T12:15:00Z",
  //       status: "reading",
  //       description:
  //         "A psychological thriller about a woman who shoots her husband and then refuses to speak. A psychotherapist becomes obsessed with uncovering the truth behind her silence.",
  //       tags: ["thriller", "psychological", "mystery"],
  //       readingProgress: {
  //         currentPage: 120,
  //         totalPages: 350,
  //         updatedAt: "2023-06-20T10:00:00Z",
  //       },
  //     },
  //     {
  //       id: "5",
  //       title: "The Power of Habit",
  //       author: "Charles Duhigg",
  //       genre: "Self-Help",
  //       publishedYear: 2012,
  //       coverImage: "",

  //       // coverImage: "https://example.com/the-power-of-habit-cover.jpg",
  //       isRead: true,
  //       isFavorite: false,
  //       createdAt: "2023-02-10T08:45:00Z",
  //       status: "finished",
  //       description:
  //         "An exploration of how habits are formed and how they can be changed, offering insight into personal and professional growth.",
  //       tags: ["self-help", "psychology", "growth"],
  //     },
  //     {
  //       id: "6",
  //       title: "Sapiens: A Brief History of Humankind",
  //       author: "Yuval Noah Harari",
  //       genre: "History",
  //       publishedYear: 2011,
  //       coverImage: "",

  //       // coverImage: "https://example.com/sapiens-cover.jpg",
  //       isRead: false,
  //       isFavorite: true,
  //       createdAt: "2023-04-12T17:00:00Z",
  //       status: "to read",
  //       description:
  //         "A fascinating exploration of the history of humankind, from the dawn of Homo sapiens to the present day.",
  //       tags: ["history", "non-fiction", "philosophy"],
  //     },
  //     {
  //       id: "7",
  //       title: "The Catcher in the Rye",
  //       author: "J.D. Salinger",
  //       genre: "Fiction",
  //       publishedYear: 1951,
  //       coverImage: "",

  //       // coverImage: "https://example.com/catcher-in-the-rye-cover.jpg",
  //       isRead: true,
  //       isFavorite: false,
  //       createdAt: "2023-03-25T09:00:00Z",
  //       status: "finished",
  //       description:
  //         "The story of Holden Caulfield, a disillusioned teenager who grapples with depression, alienation, and the transition from childhood to adulthood.",
  //       tags: ["classic", "coming-of-age", "fiction"],
  //     },
  //     {
  //       id: "8",
  //       title: "Dune",
  //       author: "Frank Herbert",
  //       genre: "Sci-Fi",
  //       publishedYear: 1965,
  //       coverImage: "",

  //       // coverImage: "https://example.com/dune-cover.jpg",
  //       isRead: false,
  //       isFavorite: true,
  //       createdAt: "2023-06-01T11:30:00Z",
  //       status: "to read",
  //       description:
  //         "A science fiction epic set in a distant future where noble houses vie for control over the desert planet Arrakis, the only source of the valuable spice melange.",
  //       tags: ["sci-fi", "epic", "space"],
  //     },
  //     {
  //       id: "9",
  //       title: "Dune",
  //       author: "Frank Herbert",
  //       genre: "Sci-Fi",
  //       publishedYear: 1965,
  //       coverImage: "",

  //       // coverImage: "https://example.com/dune-cover.jpg",
  //       isRead: false,
  //       isFavorite: true,
  //       createdAt: "2023-06-01T11:30:00Z",
  //       status: "to read",
  //       description:
  //         "A science fiction epic set in a distant future where noble houses vie for control over the desert planet Arrakis, the only source of the valuable spice melange.",
  //       tags: ["sci-fi", "epic", "space"],
  //     },
  //   ];
  // }, []);

  const booksData: BookData[] = useMemo(() => {
    return booksListData;
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
