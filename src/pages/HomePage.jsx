import { CategoriesList } from "../components/categoriesList";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

const HomePage = (props) => {
  const { text, handleSearchText } = props;

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
