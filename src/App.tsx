"use client";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/auth/Login/Login";
import LandingPage from "./components/static/Static";
import { ThemeProvider } from "@/components/theme-provider";
import { Token } from "./components/Storage/Storage";
import { Registration } from "./components/auth/register/Registration";
import Profile from "./components/auth/Profile/Profile";
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
    </>
  );
}

export default App;
