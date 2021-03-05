import React from "react";
import { Switch, Route } from "react-router-dom";
import Chooselibrary from "./Chooselibrary";
import Choosebook from "./Choosebook";
import Findbook from "./Findbook";
import Menu from "./components/Menu";
import Librarybar from "./components/Librarybar";
import Bookbar from "./components/Bookbar";

const App = () => {
  // const [book, setBook] = useState(savedbook || {});

  return (
    <>
      <Menu />
      <Librarybar />
      <Bookbar />
      <Switch>
        <Route path="/library">
          <Chooselibrary />
        </Route>
        <Route path="/choosebook">
          <Choosebook />
        </Route>
        <Route path="/findbook">
          <Findbook />
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
