import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import LogInPage from "./Pages/LogInPage/LogInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import ArticlesPage from "./Pages/ArticlePage/ArticlePage";
import MyBlogsPage from "./Pages/MyBlogsPage/MyBlogsPage";
import MyProfilePage from "./Pages/MyProfilePage/MyProfilePage";
import WritePage from "./Pages/WritePage/WritePage";

import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Protected from "./components/Protected/Protected";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/article"
            element={
              <Protected>
                <ArticlesPage />
              </Protected>
            }
          />

          <Route
            path="/myblogs"
            element={
              <Protected>
                <MyBlogsPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <MyProfilePage />
              </Protected>
            }
          />
          <Route
            path="/write"
            element={
              <Protected>
                <WritePage />
              </Protected>
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
