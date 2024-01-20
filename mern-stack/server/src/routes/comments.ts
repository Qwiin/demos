import express, {Request, Response} from "express";
import {ObjectId} from "bson";
import * as DBO from "../db/conn";

const commentsRoutes = express.Router();

/*****************************************/
//
// Routes
//
/*****************************************/

const getComments = ((req: Request, res: Response) => {
  
  if(!req) {
    console.log("no request object");
  }

  let db_connect = DBO.getDb();
  
  // console.log({params: req.params});

  const params = req.params;
  
  // const skip: number = params?.skip ? parseInt(params.skip) : 0;
  // const limit: number = params?.limit ? parseInt(params.limit) : 100;
  
  const movieId: string = params?.movie_id || "";

  // const o_id: ObjectId = new ObjectId(movieId);

  // console.log({o_id});

  db_connect?.collection("comments")
  
    // .find({movie_id: o_id})
    .find({"movie_id": new ObjectId(movieId)})
    //.skip(skip).limit(limit)
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
      res.json([]);
      console.error({findAllFailReason});
    });

});

//
// get all comments
//
commentsRoutes.route("/comments/:movie_id").get( getComments );
// commentsRoutes.route("/comments/:movie_id/:limit").get( getComments );
// commentsRoutes.route("/comments/:movie_id/:limit/:skip").get( getComments );



//
// get comment by id
//
commentsRoutes.route("/comment/:id").get( (req: Request, res: Response) => {

  if(!req) {
    console.log("no request object");
  }

  let db_connect = DBO.getDb();
  let query = { movie_id: new ObjectId(req.params.id) };
  
  db_connect?.collection("comments")
    .findOne(query)
    .then((result) => {
      res.json(result);
    })
    .catch((findOneFailReason: any) => {
      res.json([]);
      console.error({findOneFailReason});
    });
});

export default commentsRoutes;