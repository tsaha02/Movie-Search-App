import React from "react";
import { Row } from "react-bootstrap";
import MovieItem from "./MovieItem";

const MovieList = ({
  movies,
  actionComponent,
  handleAddFavorite,
  handleRemoveFavorite,
  isFavoriteComponent,
}) => {
  return (
    <Row className="movie-list">
      {movies.map((movie, index) => (
        <MovieItem
          key={index}
          movie={movie}
          actionComponent={actionComponent}
          handleRemoveFavorite={handleRemoveFavorite}
          isFavoriteComponent={isFavoriteComponent}
        />
      ))}
    </Row>
  );
};

export default MovieList;
