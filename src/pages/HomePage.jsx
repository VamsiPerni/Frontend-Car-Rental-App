import { useLocation } from "react-router";
import { CategoriesList } from "../components/categoriesList";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { useEffect } from "react";

const HomePage = (props) => {
  const { text, setText, handleSearchText } = props;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setText("");
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar text={text} handleSearchText={handleSearchText} />
      <main>
        <div>
          <CategoriesList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { HomePage };
