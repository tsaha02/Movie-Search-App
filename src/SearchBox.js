import React from "react";

const SearchBox = ({ search, setSearch }) => {
  const searchBoxStyle = {
    backgroundColor: "#f2f2f2",
    padding: "10px",
  };

  return (
    <div className="col col-sm-4" style={searchBoxStyle}>
      <input
        className="form-control"
        placeholder="Search Your Movie Here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
      />
    </div>
  );
};

export default SearchBox;
