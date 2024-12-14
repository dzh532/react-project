import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from './utilits/store';

// импорт страниц
import Welcome from './components/Welcome';
import UserProfile from "./components/UserProfile";
import DataBase from "./components/DataBase";
import Graph from "./components/Graph";
import Login from "./components/Login";
import Registration from "./components/Registration";

import ErrorModal from './components/ErrorModal';
import Loading from "./components/Loading";

const InnerApp = () => {
  const { isLoading } = useSelector((state: RootState) => state.settings);

  return (
    <>
      <ErrorModal />
      <Loading isLoading={isLoading} />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/data-base" element={<DataBase />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<div>Нет страницы</div>} />
        </Routes>
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




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider, useSelector } from "react-redux";
// import store, { RootState } from './utilits/store';

// // импорт страниц
// import Welcome from './components/Welcome';
// import UserProfile from "./components/UserProfile";
// import DataBase from "./components/DataBase";
// import Graph from "./components/Graph";
// import Login from "./components/Login";
// import Registration from "./components/Registration";

// import ErrorModal from './components/ErrorModal';
// import Loading from "./components/Loading";

// const App = () => {
//   const { isLoading } = useSelector((state: RootState) => state.settings);

//   return (
//     <>
//       <Provider store={store}>
//         <ErrorModal />
//         <Loading isLoading={isLoading} />
//         <Router>
//           <Routes>
//             <Route path="/" element={<Welcome />} />
//             <Route path="/user-profile" element={<UserProfile />} />
//             <Route path="/data-base" element={<DataBase />} />
//             <Route path="/graph" element={<Graph />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="*" element={<div>Нет страницы</div>} />
//           </Routes>
//         </Router>
//       </Provider>
//     </>
//   );
// };

// export default App;