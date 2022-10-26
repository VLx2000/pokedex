import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Specs from "./pages/Specs";
import PokemonProvider from "./context/lista_pokemon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PokemonProvider>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Specs />} path="/pokemon/:name" />
          </Routes>
        </PokemonProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;