import React from "react";
import { Heading, MovieList } from "./";

const Favorites = ({ favorites, handleRemoveFavorite }) => {
  return (
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
                actionComponent={null}
                handleRemoveFavorite={handleRemoveFavorite}
                isFavoriteComponent={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
