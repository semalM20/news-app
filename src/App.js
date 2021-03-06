import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Finance from "./components/Finance";
import Entertainment from "./components/Entertainment";
import Sports from "./components/Sports";
import Tech from "./components/Tech";
import SearchResults from "./components/SearchResults";
import SearchState from "./context/SearchState";

// function App() {
const App = () => {
  // const [searchText, setSearchText] = useState("");

  // const searchT = (text) => {
  //   setSearchText(text);
  // };
  return (
    <>
      <SearchState>
        <Router>
          <Navbar title="News App" dark={true} search={true} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="sports" element={<Sports />} />
            {/* <Route
            path="/search"
            element={<SearchResults searchText={searchText} />}
          /> */}
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </Router>
      </SearchState>
    </>
  );
};

export default App;
