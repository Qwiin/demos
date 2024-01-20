import React, {useState} from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";

// import './App.css';
import './output.css';
import MovieAccordion from "./components/MovieAccordion";


const App = () => {
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  return (
    <div className="h-screen overflow-hidden tw-max-h-screen">
      <NavBar expanded={navBarExpanded} expandedCallback={(value: boolean)=>{ 
        setNavBarExpanded(value) 
        }}/>
      <Routes>
        <Route path="/" element={<MovieList fullScreen={!navBarExpanded}/>} />
        {/* <Route path="/edit/:id" element={<Edit />} /> */}
        {/* <Route path="/create" element={<Create />} /> */}
        <Route path="/accordion" element={<MovieAccordion fullScreen={!navBarExpanded}/>} />
        {/* <Route path="/contents" element={<Contents />} /> */}
      </Routes>
    </div>
  );
};

export default App;
