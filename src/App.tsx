import "./App.css";
import Dashboard from "./app/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./app/login/Login";
import LandingPage from "./app/Static/Static";
import Project from "./app/Project/Project";

function App() {
  return (
    <>
      <LandingPage />
      {/* <Dashboard/> */}

      <Router>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/project" element={<Project />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
