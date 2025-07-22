import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductResultCard } from "./productResultCard";
const LIMIT = 10;

const SearchResults = (props) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  const { searchQuery } = props;
  const navigate = useNavigate();

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

  const [compareList, setCompareList] = useState(() => {
    const stored = localStorage.getItem("compareList");
    return stored ? JSON.parse(stored) : [];
  });

  const addToCompare = (item) => {
    if (compareList.length >= 3) return;
    const exists = compareList.some((i) => i._id === item._id);
    if (!exists) {
      const updated = [...compareList, item];
      setCompareList(updated);
      localStorage.setItem("compareList", JSON.stringify(updated));
    }
  };

  const removeFromCompare = (id) => {
    const updated = compareList.filter((item) => item._id !== id);
    setCompareList(updated);
    localStorage.setItem("compareList", JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem("compareList");
  };

  const handleCompare = () => {
    navigate(
      `/compare?cars=${compareList
        .map((elem) => {
          return elem.title;
        })
        .join(",")}`
    );
  };

  return (
    <div>
      <h2>{searchQuery}</h2>
      <div>
        {results.map((elem) => {
          return (
            <div key={elem._id}>
              <ProductResultCard
                key={elem._id}
                _id={elem._id}
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
                {...elem}
                compareList={compareList}
                addToCompare={addToCompare}
                removeFromCompare={removeFromCompare}
                disableAdd={
                  compareList.length >= 3 &&
                  !compareList.some((i) => i._id === elem._id)
                }
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
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50 p-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {compareList.map((item) => (
              <span
                key={item._id}
                className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded"
              >
                {item.title}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={clearCompare}
            >
              Clear
            </button>
            <button
              className={`px-3 py-1 rounded transition duration-200 
    ${
      compareList.length < 2
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
  `}
              onClick={handleCompare}
              disabled={compareList.length < 2}
            >
              Compare
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchResults };
