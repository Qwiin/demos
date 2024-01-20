import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import RTLogo from '../assets/RTLogo';
import IMDBLogo from '../assets/IMDBLogo';


type Movie = {
  _id: string;
  genres: string[];
  title: string;
  poster: string;
  movie_id: string;
  full_plot: string;
  year: number;
  released: string;
  imdb?: {
    rating: number;
    votes: number;
    id: number;
  };
  tomatoes?: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    }
  }
}

type MovieProps = {
  deleteMovie: (id: string) => {};
  editMovie: (id: string) => {};
  movie: Movie;
}

const GRID_TEMPLATE_COLUMNS:string = "minmax(80px, 1fr) minmax(160px, 6fr) minmax(60px, 1fr) minmax(100px, 1.0fr) minmax(120px, 1.5fr)";

const Movie = (props: MovieProps) => {

  return (
    <div style={{gridTemplateColumns: GRID_TEMPLATE_COLUMNS}} className="tw-grid tw-grid-flow-col tw-w-full">
      <div className="tw-col-span-1 tw-px-2 tw-border tw-flex tw-justify-center tw-items-center">
        <img src={props.movie.poster} alt="No IMG" className="tw-h-20 tw-max-w-20p tw-max-h-100p tw-border-2 tw-border-amber-950 tw-bg-slate-600 tw-my-3" />
      </div>
      <div className="tw-col-span-1 tw-border tw-flex tw-justify-left tw-items-center">
        <p className="tw-mx-2">{props.movie.title}</p>
      </div>
      <div className="tw-col-span-1 tw-flex tw-border tw-justify-center tw-items-center ">
        <p>{props.movie.year}</p>
      </div>
      <div className="tw-col-span-1 tw-flex tw-border tw-justify-center tw-items-center tw-flex-col tw-gap-2 px-0">
        <div className="tw-flex tw-flex-row tw-gap-2"><IMDBLogo/><p>{props.movie.imdb?.rating}/10</p></div>
        <div className="tw-flex tw-flex-row tw-gap-2"><RTLogo/><p>
          {props.movie.tomatoes?.viewer.meter 
            ? props.movie.tomatoes?.viewer.meter + "%" : "NR"}</p></div>
      </div>
      <div className="tw-col-span-1 tw-border tw-justify-center tw-items-center tw-flex tw-gap-0">
          <button className="btn btn-link" 
            onClick={() => {
              // props.editMovie(props.movie._id)
              alert("Implement Edit");
            }}
          >
            Edit
          </button>
          <button className="btn btn-link"
            onClick={() => {
              // props.deleteMovie(props.movie._id);
              alert("Implement Delete");
            }}
          >
            Delete
          </button>
      </div>
    </div>
  );

};

type MovieListProps = {
  fullScreen: boolean;
}

export default function MovieList(props: MovieListProps) {

  const listRef = useRef<HTMLInputElement>(null);
  const [movies, setMovies] = useState([]);
  

  // This method fetches the movies from the database.
  useEffect(() => {
    async function getMovies() {
      const response = await fetch(`http://localhost:5005/movies/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const movies = await response.json();
      setMovies(movies);
    }

    getMovies();

    return;
  }, [movies.length]);

  // This method will delete a movie
  async function deleteMovie(id: string) {
    await fetch(`http://localhost:5005/${id}`, {
      method: "DELETE"
    });

    const newMovies = movies.filter((el: any) => el._id !== id);
    setMovies(newMovies);
  }

  // This method will delete a movie
  async function editMovie(id: string) {
    await fetch(`http://localhost:5005/${id}`, {
      method: "EDIT"
    });

    const newMovies = movies.filter((el: any) => el._id !== id);
    setMovies(newMovies);
  }

  // This method will map out the movies on the table
  function movieList() {
    return movies.map((movie: any) => {
      return (
        <Movie
          movie={movie}
          deleteMovie={() => deleteMovie(movie._id)}
          editMovie={() => editMovie(movie._id)}
          key={movie._id}
        />
      );
    });
  }

  // This following section will display the table with the movies of individuals.
  return (
    <div id="MovieList" ref={listRef} 
      className="tw-relative tw-rounded-xl tw-bg-slate-200">
      <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-relative" >
        
          <div style={{gridTemplateColumns: GRID_TEMPLATE_COLUMNS}} className="tw-grid tw-grid- tw-grid-flow-col tw-gri tw-w-full tw-font-bold tw-shadow-md">
            <div className="tw-col-span-1 tw-border tw-gap-0 tw-px-0 tw-flex tw-justify-center tw-items-center tw-align-middle">
              <p>Movie</p>
              {/* Movie */}
            </div>
            <div className="tw-col-span-1 tw-border tw-items-center tw-justify-center tw-px-0 tw-mx-0 tw-flex">
              <p className="">Title</p></div>
            <div className="tw-col-span-1 tw-border tw-justify-center tw-items-center tw-flex">
              <p className="">Year</p></div>
            <div className="tw-col-span-1 tw-border tw-justify-center tw-items-center tw-flex">
              <p className="">Rating</p></div>
            <div className="tw-col-span-1 tw-border tw-justify-center tw-items-center tw-flex">
              <p className="">Action</p></div>
          </div>
        
        <div className="tw-relative tw-w-full tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-overflow-hidden">
          <div style={{height: (props.fullScreen ? "90vh" : "80vh")}} className="tw-relative tw-w-full tw-overflow-y-scroll tw-rounded-2xl tw-bg-slate-300" >{movieList()}</div>
        </div>
      </div>
    </div>
  );
}
