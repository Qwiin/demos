import React, {ReactNode, useEffect, useState} from "react";
import {Accordion, Button} from 'react-bootstrap';
import {MDBBtn, MDBCollapse} from 'mdb-react-ui-kit';
import "bootstrap/dist/css/bootstrap.css";

// import RTLogo from '../assets/RTLogo';
// import IMDBLogo from '../assets/IMDBLogo';
import CreateComment from "./CreateComment";

type Movie = {
  _id: string;
  genres: string[];
  title: string;
  poster: string;
  movie_id: string;
  plot: string;
  fullplot: string;
  year: number;
  released: string;
  imdb?: {
    rating: number;
    votes: number;
    id: number;
  };
  comments: MovieComment[];
  tomatoes?: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    }
  }
}

type MovieProps = {
  // deleteMovie: (id: string) => {};
  // editMovie: (id: string) => {};
  movie: Movie;
};

const MovieItem = (props: MovieProps) => {

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => setShowComments(!showComments);

  return (
    <Accordion.Item eventKey={props.movie._id}>
    <Accordion.Header>
      <div className="tw-flex tw-justify-between">
        <div className="tw-flex-1">({props.movie.year}) <b>{props.movie.title}</b></div>
      </div>
    </Accordion.Header>
    <Accordion.Body>
    <div>
      <div className="tw-grid tw-grid-rows-4 tw-grid-flow-col tw-gap-x-4 tw-gap-y-1">
        <div className="tw-row-span-4 tw-items-center tw-justify-center">
          <div className="tw-w-48 tw-h-full tw-flex tw-items-center tw-justify-center">
            <img src={props.movie.poster} alt="No Poster Img" className="tw-max-w-60p tw-max-h-100p tw-border-2 tw-h-64"/>
          </div>
        </div>
        <div className="tw-row-span-1 tw-flex tw-items-center"><b>{props.movie.title}</b> ({props.movie.year})</div>
        <div className="tw-row-span-3">{props.movie.fullplot || props.movie.plot || "No Plot Info Listed..."}</div>
      </div>
      {/* <MDBBtn tag='a' onClick={toggleComments}>
        View Comments
      </MDBBtn> */}
      { props.movie.comments.length > 0 &&
      <div className="tw-pt-2">
          <MovieComments movie={props.movie} expanded={showComments} />
      </div>
      }
      {/* <MDBBtn onClick={toggleComments} color="tertiary">View Comments</MDBBtn>
      <MDBCollapse open={showComments} className="tw-bg-transparent tw-h-10">
        <div className="tw-max-h-10 h-10 tw-w-full">
        </div>
      </MDBCollapse> */}
    </div>
    </Accordion.Body>
    </Accordion.Item>
  );

};
const CommentItem = (props: CommentItemProps) => {

  return (
    <Accordion.Item eventKey={props.comment._id}>
    <Accordion.Header>
      {/* <div className="tw-flex tw-justify-between">
        <div className="tw-flex-1">({props.comment.name}) <b>{props.comment.text}</b></div>
      </div> */}
    {/* </Accordion.Header> */}
    {/* <Accordion.Body> */}
    <div>
      <div className="tw-grid tw-grid-rows-4 tw-grid-flow-col tw-gap-4">
        <div className="tw-row-span-4 tw-items-center tw-justify-center">
          <div className="tw-w-48 tw-h-full tw-flex tw-items-center tw-justify-center">
            <p>{props.comment.name}</p>
          </div>
        </div>
        <div className="tw-row-span-1 tw-flex tw-items-center"><b>{props.comment.name}</b> ({props.comment.email})</div>
        <div className="tw-row-span-3">{props.comment.text}</div>
      </div>
    </div>
    {/* </Accordion.Body> */}
    </Accordion.Header>
    </Accordion.Item>
  );

};

type MovieComment = {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
};

type CommentItemProps = {
  comment: MovieComment;
}

type MovieCommentsProps = {
  expanded: boolean;
  movie: Movie;
}

const MovieComments = (props: MovieCommentsProps) => {

  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);

  // const [expanded, setExpanded] = useState(props.expanded || false)
  // const [comments, setComments] = useState([]);


  // async function fetchMovieComments() {
  //   const response = await fetch(`http://localhost:5005/comments/${props.movieId}`);

  //   if (!response.ok) {
  //     const message = `An error occurred: ${response.statusText}`;
  //     window.alert(message);
  //     return;
  //   }

  //   const comments = await response.json();
  //   setComments(comments);
  // }

  // useEffect(()=>{
  //   // if(expanded){
  //     fetchMovieComments();
  //   // }
  // }, [comments.length, expanded])

  const getCommentAccordionItems = (): ReactNode => {
    return props.movie.comments.map((comment: MovieComment) => {
      return <CommentItem
        comment={comment}
        key={comment._id}
      />
    });
  }
  
  return (
    <>
    <CreateComment dismissCallback={()=>{setShowCreateCommentModal(false)}} show={showCreateCommentModal}/>
    <Accordion defaultActiveKey="0">
      <Accordion.Header>
        <div className="tw-flex tw-justify-between tw-w-full">
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-4">
            <div className="tw-flex tw-items-center tw-justify-center"><p>Comments</p></div>
            <Button className={`tw-text-sm ${ showCreateCommentModal ? 'tw-hidden' : 'tw-visible'}`} variant="link" color="muted" onClick={(e)=>{ 
                e.preventDefault(); 
                e.stopPropagation(); 
                setShowCreateCommentModal(true) 
              }}>Post Your Review!</Button>
          </div>
          <p className="tw-px-4 tw-pb-1 tw-self-center tw-font-light">({props.movie.comments.length})</p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
      { getCommentAccordionItems() }
      </Accordion.Body>
    </Accordion>
    </>
  );
}



type MovieAccodionProps = {
  fullScreen: boolean;
}
export default function MovieAccordion(props: MovieAccodionProps) {

  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    const response = await fetch(`http://localhost:5005/movies/20`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const movies = await response.json();
    setMovies(movies);
  }

  // Fetch movies from the database when component is mounted.
  // TODO memoize

  useEffect(() => {
    fetchMovies();
    return;
  }, [movies.length]);

  const getAccordionItems = (): ReactNode => {
    return movies.map((movie: Movie) => {
      return <MovieItem
        movie={movie}
        key={movie._id}
      />
    })
  };
                          
    return (
      <div style={{overflowY: "scroll", height: (props.fullScreen ? "90vh" : "80vh")}}>
    <Accordion defaultActiveKey="0">
      { getAccordionItems() }
    </Accordion>
  
    </div>

);
};