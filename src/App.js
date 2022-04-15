import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import Specs from "@pages/Specs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={ <Home /> } path="/pokedex" exact />
          <Route element={ <Specs /> } path="/pokemon/:name" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;