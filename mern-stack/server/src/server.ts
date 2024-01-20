// server.ts
import 'dotenv/config';
import express, { Request , Response } from 'express';
import commentsRoutes from './routes/comments';
import moviesRoutes from './routes/movies';
import { connectToDatabase } from './db/conn';
// import { configDotenv } from 'dotenv';


/*****************************************/
//
// Start-Up
//
/*****************************************/

const app = express();

const cors = require("cors");

console.log(process.env);

const port = process.env.PORT || 3001;

/*****************************************/
//
// Configuration
//
/*****************************************/

// Cross Origin Resource Sharing
app.use(cors());

// this is the folder served in the production build
app.use(express.static('public'));

// parses url encoded bodies sent via web forms
app.use(express.urlencoded({extended: true}));

// parses json sent via API clients
app.use(express.json());


// apply custom routes for comments records
app.use(commentsRoutes);
app.use(moviesRoutes);

app.listen(port, ()=> { 
  connectToDatabase().catch((connectFailReason: any) => {
    console.log({connectFailReason});
  })
  console.log(`Express (TS) server listening on port ${port}`);
});

/*****************************************/
//
// Routes
//
/*****************************************/

app.get('/', (req: Request, res: Response) => {
  if(!req) {
    console.warn("no request object for route '/'");
  }
  res.send("Express w/Typescript");
});

app.get('/hello', (req: Request, res:Response) => {
  if(!req) {
    console.warn("no request object for route '/hello'");
  }
  res.send("Hello World!");
});