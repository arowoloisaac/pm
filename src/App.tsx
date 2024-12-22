"use client";
import "./App.css";
import Dashboard from "./app/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./app/Login/Login";
import LandingPage from "./app/Static/Static";
import { ThemeProvider } from "@/components/theme-provider";
import { Token } from "./components/Storage/Storage";
import { Registration } from "./app/Register/Registration";
import Profile from "./app/Profile/Profile";
import { useClearExpiredItems } from "./components/backgroundJob/backgroundJob";

function App() {
  useClearExpiredItems();

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {Token === null ? (
          <>
            <LandingPage />
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </>
        ) : (
          <Dashboard />
        )}
      </ThemeProvider>
      {/* <LandingPage /> */}
      {/* {Token === null ? <LandingPage /> : <Dashboard />}

      <Router>
        <Routes>
          <Route path="/:page" element={<Project />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
