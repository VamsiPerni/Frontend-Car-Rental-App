import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Navbar } from "../components/navbar";
import { SearchResults } from "../components/searchResults";
import { Footer } from "../components/footer";

const SearchPage = (params) => {
  const { text, handleSearchText } = params;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTextFromURL = searchParams.get("text");
    if (searchTextFromURL) {
      handleSearchText(searchTextFromURL);
    }
  }, []);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("text", text);
      return prev;
    });
  }, [text]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar text={text} handleSearchText={handleSearchText} />
      <main>
        <p>
          Search results for:
          <span className="text-red-800 font-bold">{text}</span>
        </p>
        <SearchResults searchQuery={text} />
      </main>
      <Footer />
    </div>
  );
};

export { SearchPage };
