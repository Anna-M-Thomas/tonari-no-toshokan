import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Chooselibrary from "./Chooselibrary";
import Choosebook from "./Choosebook";
import Findbook from "./Findbook";
import Header from "./components/Header";

const App = () => {
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [book, setBook] = useState({});

  return (
    <>
      <Header />
      <Switch>
        <Route path="/library">
          <Chooselibrary
            selectedLibraries={selectedLibraries}
            setSelectedLibraries={setSelectedLibraries}
          />
        </Route>
        <Route path="/choosebook">
          <Choosebook setBook={setBook} />
        </Route>
        <Route path="/findbook">
          <Findbook
            book={book}
            setBook={setBook}
            selectedLibraries={selectedLibraries}
          />
        </Route>
      </Switch>
      <div className="about">
        <a
          href="https://github.com/Anna-M-Thomas/tonari-no-toshokan"
          target="_blank"
          rel="noreferrer"
        >
          About
        </a>
      </div>
    </>
  );
};

export default App;
