import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Game of Thrones");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const movieSearch = async (search) => {
    if (search === "") {
      setMovies([]);
      return;
    }

    const url = `https://www.omdbapi.com/?s=${search}&apikey=d4c28cc3`;
    let response = await fetch(url);
    response = await response.json();
    if (response.Search) {
      setMovies(response.Search);
    }
  };

  useEffect(() => {
    movieSearch(search);
  }, [search]);

  const handleAddFavorite = (movie) => {
    const favoriteList = [...favorites, movie];
    setFavorites(favoriteList);
    alert("Movie added to favorites");
  };

  const handleRemoveFavorite = (movie) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(updatedFavorites);
    alert("Movie removed from favorites");
  };

  const toggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  const Favorite = ({ movie }) => {
    const handleButtonClick = () => {
      if (isFavorite(movie)) {
        handleRemoveFavorite(movie);
      } else {
        handleAddFavorite(movie);
      }
    };

    return (
      <Button
        variant={isFavorite(movie) ? "danger" : "success"}
        onClick={handleButtonClick}
      >
        {isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    );
  };

  const Heading = ({ heading }) => {
    const headingStyle = {
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#333",
      backgroundColor: "#f2f2f2",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    };

    return (
      <div className="col" style={headingStyle}>
        {heading}
      </div>
    );
  };

  const MovieList = ({ movies, actionComponent, isFavoriteComponent }) => {
    return (
      <Row className="movie-list">
        {movies.map((movie, index) => (
          <Col sm={6} md={4} lg={3} key={index}>
            <Card className="movie-item">
              <div className="movie-image">
                <Card.Img variant="top" src={movie.Poster} alt={movie.imdbID} />
                <div className="overlay">
                  <div className="favorite-icon">
                    {isFavoriteComponent ? (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFavorite(movie)}
                      >
                        Remove from Favorites
                      </Button>
                    ) : (
                      <actionComponent movie={movie} />
                    )}
                  </div>
                </div>
              </div>
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  Year: {movie.Year} <br />
                  Type: {movie.Type}
                </Card.Text>
                {!isFavoriteComponent && (
                  <Button
                    variant="success"
                    onClick={() => handleAddFavorite(movie)}
                  >
                    Add to Favorites
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const SearchBox = () => {
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

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movies" />
        <SearchBox />
        <button onClick={toggleFavorites}>
          {showFavorites ? "Back to Movies" : "Go to Favorites"}
        </button>
      </div>
      {showFavorites ? (
        <div>
          <div className="row d-flex align-items-center mt-4 mb-4">
            <Heading heading="Favorites" />
          </div>
          <div className="row">
            <div className="col">
              <div className="result-area">
                {favorites.length === 0 ? (
                  <p>No favorites added yet.</p>
                ) : (
                  <MovieList
                    movies={favorites}
                    actionComponent={Favorite}
                    isFavoriteComponent={true} // Set isFavoriteComponent to true
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="result-area">
              <Heading heading="Results" />
              <MovieList
                movies={movies}
                actionComponent={Favorite}
                isFavoriteComponent={false} // Set isFavoriteComponent to false
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
