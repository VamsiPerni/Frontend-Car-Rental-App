import { useLocation, useOutletContext } from "react-router";
import { CategoriesList } from "../components/categoriesList";
import { useEffect } from "react";

const HomePage = () => {
  const { setText } = useOutletContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setText("");
    }
  }, [location, setText]);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <div>
          <CategoriesList />
        </div>
      </main>
    </div>
  );
};

export { HomePage };
