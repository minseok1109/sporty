import { useState } from "react";
import SearchButton from "./SearchButton";
import { NavButton } from "./NavButton";

const SearchBar = () => {
  const sports = ["농구", "축구", "야구", "볼링", "탁구", "테니스"];

  const [userInput, setUserInput] = useState("");
  const onChange = (e) => {
    setUserInput(e.target.value);
  };
  return (
    <div className="container">
      <NavButton />
      <div className="inputBox">
        <input
          type="text"
          value={userInput}
          onChange={onChange}
          placeholder="검색"
        />
        <SearchButton sports={sports} />
      </div>
      <style jsx>{`
        input {
          width: 61.5625rem;
          border: none;
          border-bottom: 1px solid #c4c4c4;
          display: block;
        }
        .container {
          margin: 0.725rem;
          padding: 0.625rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
