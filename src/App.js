import './App.css';
import Advertisements from './pages/Advertisements';
import { Amplify } from "@aws-amplify/core";
import awsconfig from "./aws-exports";
import NavBar from './components/NavBar';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Matches from './pages/Matches';
import Thefts from './pages/Thefts';

Amplify.configure(awsconfig);

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavBar></NavBar>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">

      <Routes >
        <Route path="/" element={<Layout />} >
          <Route path="/ads" element={<Advertisements />} />
          <Route path="/thefts" element={<Thefts />} />
          <Route path="/matches" element={<Matches />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
