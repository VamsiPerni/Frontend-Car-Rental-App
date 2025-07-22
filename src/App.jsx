import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { useAppContext } from "./contexts/appContext";
import { HashLoader } from "react-spinners";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { useState } from "react";
import { ComparePage } from "./pages/ComparePage";

const App = () => {
  const { appLoading, user } = useAppContext();
  const { isAuthenticated } = user;

  const [text, setText] = useState("");

  const handleSearchText = (newVal) => {
    setText(newVal);
  };

  console.log("🟡 : App : isAuthenticated:", isAuthenticated);
  console.log("🟡 : App : isAuthenticated: final", !isAuthenticated);

  if (appLoading) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center gap-10 content-center">
        <HashLoader size={120} color="#10b981" speedMultiplier={1.2} />
        <div className="border-1 border-lime-800 p-8 rounded-lg">
          <p>Please note:</p>
          <p>Backend is hosted on free server</p>
          <p>It may take upto 2 minutes to warmup (for the first time)!</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              text={text}
              setText={setText}
              handleSearchText={handleSearchText}
            />
          }
        />
        <Route path="/signup" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/search"
          element={
            <SearchPage text={text} handleSearchText={handleSearchText} />
          }
        />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
