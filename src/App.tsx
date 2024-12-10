"use client";
import "./App.css";
import Dashboard from "./app/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./app/Login/Login";
import LandingPage from "./app/Static/Static";
import { ThemeProvider } from "@/components/theme-provider";
import { Token } from "./components/Storage/Storage";
import { Registration } from "./app/Register/Registeration";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {Token === null ? <LandingPage /> : <Dashboard />}
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Router>
      </ThemeProvider>
      {/* <LandingPage /> */}
      {/* {Token === null ? <LandingPage /> : <Dashboard />}

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
