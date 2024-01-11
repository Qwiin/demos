import express, {Request, Response} from "express";
import {ObjectId} from "mongodb";
import * as DBO from "../db/conn";

const commentRoutes = express.Router({mergeParams: true});

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
  
  const skip: number = params?.skip ? parseInt(params.skip) : 0;
  const limit: number = params?.limit ? parseInt(params.limit) : 100;
  
  // console.log({skip});

  db_connect?.collection("comments")
    .find().skip(10).skip(skip).limit(limit)
    .toArray()
    .then((result: any[]) => {
      res.send(
        result.map((obj)=>{
          return `<div><h3>${obj.name} <span style="font-size:10px; font-weight: normal">${obj._id}</span></h3><p>${obj.text}</p></div>`;
        }).join('')
      );
    })
    .catch((findAllFailReason: any) => {
      console.error({findAllFailReason});
    });

});

//
// get all comments
//
commentRoutes.route("/comments").get( getComments );
commentRoutes.route("/comments/:limit").get( getComments );
commentRoutes.route("/comments/:limit/:skip").get( getComments );



//
// get comment by id
//
commentRoutes.route("/comment/:id").get( (req: Request, res: Response) => {

  if(!req) {
    console.log("no request object");
  }

  let db_connect = DBO.getDb();
  let query = { _id: new ObjectId(req.params.id) };
  
  db_connect?.collection("comments")
    .findOne(query)
    .then((result) => {
      res.json(result);
    })
    .catch((findOneFailReason: any) => {
      console.error({findOneFailReason});
    });
});

export default commentRoutes;