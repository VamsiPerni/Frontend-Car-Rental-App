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
import { ComparePage } from "./pages/ComparePage";
import { ViewPage } from "./pages/ViewPage";
import { PublicLayout } from "./pages/PublicLayout";
import { ProtectedLayout } from "./pages/ProtectedLayout";

const App = () => {
  const { appLoading, user } = useAppContext();
  const { isAuthenticated } = user;

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

  return (
    <BrowserRouter>
      <Routes>
        {/*Auth pages without Navbar  */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/:id/view" element={<ViewPage />} />
        </Route>

        {/* Protected Pages */}
        <Route element={<ProtectedLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
