import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`Express (TS) server listening on port ${port}`)
})

// public folder to serve
app.use(express.static('public'));

// parses url-encoded bodies sent via HTML forms
app.use(express.urlencoded({extended: true}));

// parses json sent via API clients
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.get("/hello", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});