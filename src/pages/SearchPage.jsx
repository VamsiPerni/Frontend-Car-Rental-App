import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router";
import { SearchResults } from "../components/searchResults";

const SearchPage = () => {
  const { text, handleSearchText } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTextFromURL = searchParams.get("text");
    if (searchTextFromURL) {
      handleSearchText(searchTextFromURL);
    }
  });

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("text", text);
      return prev;
    });
  }, [text, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <p>
          Search results for:
          <span className="text-red-800 font-bold">{text}</span>
        </p>
        <SearchResults searchQuery={text} />
      </main>
    </div>
  );
};

export { SearchPage };
