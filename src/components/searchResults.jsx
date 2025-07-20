import { useEffect, useState } from "react";
import { ProductResultCard } from "./productResultCard";
const LIMIT = 10;

const SearchResults = (props) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  const { searchQuery } = props;

  const getSearchResults = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/products/search?q=${searchQuery}&skip=${
          LIMIT * (page - 1)
        }&limit=${LIMIT}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data?.isSuccess) {
        setResults(data.data.products);
        setTotalPages(Math.ceil(data.total / LIMIT));
      } else {
        console.error("Search failed:", data.message);
      }
    } catch (err) {
      console.error("Error while fetching search results:", err.message);
    }
  };

  const handlePage = (pageNo) => {
    if (pageNo <= 1) {
      setPage(1);
    } else if (pageNo >= totalPages) {
      setPage(totalPages);
    } else {
      setPage(pageNo);
    }
  };

  useEffect(() => {
    console.log("---starting useEffect----");
    const timeoutId = setTimeout(getSearchResults, 400);

    return () => {
      console.log("---cleaning-up useEffect----");
      clearTimeout(timeoutId);
    };
  }, [page, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div>
      <h2>{searchQuery}</h2>
      <div>
        {results.map((elem) => {
          return (
            <div key={elem._id}>
              <ProductResultCard
                key={elem._id}
                id={elem._id}
                title={elem.title}
                brand={elem.brand}
                model={elem.model}
                type={elem.type}
                fuelType={elem.fuelType}
                transmission={elem.transmission}
                seats={elem.seats}
                color={elem.color}
                pricePerDay={elem.pricePerDay}
                availability={elem.availability}
                rating={elem.rating}
                description={elem.description}
                images={elem.images}
                location={elem.location}
                mileage={elem.mileage}
                registrationNumber={elem.registrationNumber}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-0.5 mb-3 gap-4">
        <button
          onClick={() => {
            handlePage(page - 1);
          }}
          className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm cursor-pointer"
        >
          Prev
        </button>
        <p>
          {page}/{totalPages}
        </p>
        <button
          onClick={() => {
            handlePage(page + 1);
          }}
          className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { SearchResults };
