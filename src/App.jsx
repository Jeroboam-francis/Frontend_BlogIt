import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LogInPage from "./Pages/LogInPage/LogInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import MyBlogsPage from "./Pages/MyBlogsPage/MyBlogsPage";
import WritePage from "./Pages/WritePage/WritePage";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Protected from "./Components/Protected/Protected";
import BlogPreviewPage from "./Pages/BlogPreviewPage/BlogPreviewPage";
import BlogListingPage from "./Pages/BlogListingPage/BlogListingPage";
import ProfileView from "./Pages/Profile/ProfileView";
import ProfileEdit from "./Pages/Profile/ProfileEdit";

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
            path="/blogs"
            element={
              <Protected>
                <BlogListingPage />
              </Protected>
            }
          />

          <Route
            path="/my-blogs"
            element={
              <Protected>
                <MyBlogsPage />
              </Protected>
            }
          />

          <Route
            path="/myblogs/:blogId"
            element={
              <Protected>
                <BlogPreviewPage />
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
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfileView />
              </Protected>
            }
          />

          <Route
            path="/profile/edit"
            element={
              <Protected>
                <ProfileEdit />
              </Protected>
            }
          />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
