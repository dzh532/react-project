import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';

// импорт страниц
import Welcome from './components/Welcome';
import UserProfile from "./components/UserProfile";
import Buses from "./components/Buses";
import Graph from "./components/Graph";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/bus-data" element={<Buses />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;