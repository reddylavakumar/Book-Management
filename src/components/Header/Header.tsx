import "./../Component.scss";
interface HeaderProps {
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
}
const Header: React.FC<HeaderProps> = ({ setSearchKeyWord }) => {
  return (
    <div className="header">
      <div className="title">
        <div>
          <img
            alt="book-image"
            className={"book_image"}
            src="https://cdn-icons-png.flaticon.com/512/171/171322.png"
          />
        </div>
        <div>
          <h2>Book Management</h2>
        </div>
      </div>
      <div>
        <input
          id="global_search"
          className="input_field"
          placeholder="Search For Books titles, authors, genre..."
          onChange={(e) => setSearchKeyWord(e.target.value)}
        ></input>
      </div>
      <div className={"add_button_image"}>
        <button>Add new Book</button>
        <img
          className={"user_icon"}
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
        />
      </div>
    </div>
  );
};

export default Header;
