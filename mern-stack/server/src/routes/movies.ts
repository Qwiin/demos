import express, {Request, Response} from "express";
import {ObjectId} from "mongodb";
import * as DBO from "../db/conn";

const moviesRoutes = express.Router();

/*****************************************/
//
// Routes
//
/*****************************************/

const getMovies = ((req: Request, res: Response) => {
  
  if(!req) {
    console.log("no request object");
  }

  let db_connect = DBO.getDb();
  
  // console.log({params: req.params});

  const params = req.params;
  
  const skip: number = params?.skip ? parseInt(params.skip) : 0;
  const limit: number = params?.limit ? parseInt(params.limit) : 100;
  
  // console.log({skip});

  db_connect?.collection("movies")
    // .find()
    .aggregate([ 
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "movie_id",
          as: "comments",
        }
      }
    ])
    .skip(skip).limit(limit)
    .toArray()
    .then((result: any[]) => {
      res.json(result);
      // res.send(
      //   result.map((obj)=>{
      //     return `<div><h3>${obj.name} <span style="font-size:10px; font-weight: normal">${obj._id}</span></h3><p>${obj.text}</p></div>`;
      //   }).join('')
      // );
    })
    .catch((findAllFailReason: any) => {
      console.error({findAllFailReason});
    });

});

//
// get all movies
//
moviesRoutes.route("/movies").get( getMovies );
moviesRoutes.route("/movies/:limit").get( getMovies );
moviesRoutes.route("/movies/:limit/:skip").get( getMovies );



//
// get movie by id
//
moviesRoutes.route("/movie/:id").get( (req: Request, res: Response) => {

  if(!req) {
    console.log("no request object");
  }

  let db_connect = DBO.getDb();
  let movieId = new ObjectId(req.params.id);
  // let query = { _id: movieId };
  
  db_connect?.collection("movies")
    .aggregate([ 
      {
        $match: {
          _id: movieId
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "movie_id",
          as: "comments",
        }
      }
    ]).toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((findOneFailReason: any) => {
      console.error({findOneFailReason});
    });
});

export default moviesRoutes;