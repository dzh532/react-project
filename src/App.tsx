import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from './utilits/store';

// импорт страниц
import Welcome from './components/Welcome';
import UserProfile from "./components/UserProfile";
import DataBase from "./components/DataBase";
import DataBaseCompany from "./components/DataBaseCompany";
import Graph from "./components/Graph";
import Login from "./components/Login";
import Registration from "./components/Registration";
import BusInCompanyPage from "./components/BusInCompanyPage";

import ErrorModal from './components/ErrorModal';
import Loading from "./components/Loading";
import Auth from "./components/Auth";

const InnerApp = () => {
  const { isLoading } = useSelector((state: RootState) => state.settings);

  return (
    <>
      <ErrorModal />
      <Loading isLoading={isLoading} />
      <Router>
        <Auth>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/data-base" element={<DataBase />} />
            <Route path="/data-base-company" element={<DataBaseCompany />} />
            <Route path="/bus-in-com" element={<BusInCompanyPage />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={ <div>Нет страницы</div>} />
          </Routes>
        </Auth>
      </Router>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <InnerApp />
  </Provider> 
);

export default App;