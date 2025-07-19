import { CategoriesList } from "../components/categoriesList";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
