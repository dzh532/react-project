import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';

import Welcome from './components/Welcome';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;