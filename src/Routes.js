import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Book from "./Book";
import Library from "./Library";

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Library} />
          <Route exact path="/booksearch" component={Book} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  