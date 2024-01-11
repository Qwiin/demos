// server.ts
import express, { Request , Response } from 'express';


/*****************************************/
//
// Start-Up
//
/*****************************************/

const app = express();

const port = process.env.PORT || 3001;

app.listen(port, ()=> { 
  console.log(`Express (TS) server listening on port ${port}`);
});

/*****************************************/
//
// Configuration
//
/*****************************************/

// this is the folder served in the production build
app.use(express.static('public'));

// parses url encoded bodies sent via web forms
app.use(express.urlencoded({extended: true}));

// parses json sent via API clients
app.use(express.json());

/*****************************************/
//
// Routes
//
/*****************************************/

app.get('/', (req: Request, res: Response) => {
  res.send("Express w/Typescript");
});

app.get('/hello', (req:Request, res:Response) => {
  res.send("Hello World!");
});