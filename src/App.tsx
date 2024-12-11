import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';

// импорт страниц
import Welcome from './components/Welcome';
import UserProfile from "./components/UserProfile";
import DataBase from "./components/DataBase";
import Graph from "./components/Graph";
import Login from "./components/Login";
import Registration from "./components/Registration";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/data-base" element={<DataBase />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;