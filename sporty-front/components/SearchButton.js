function SearchButton({ sports }) {
  return (
    <>
      {sports.map((sport, index) => (
        <button key={index}> {sport}</button>
      ))}
      <style jsx>{`
        button {
          width: 6.25rem;
          margin: 0.2rem;
          padding: 0.15rem;
          border: 1px solid #c4c4c4;
          background: #ffffff;
        }
        button:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}

export default SearchButton;
