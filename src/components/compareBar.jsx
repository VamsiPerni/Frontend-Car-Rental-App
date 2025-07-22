import { useCompare } from "../contexts/compareContext";
import { useNavigate } from "react-router";

const CompareBar = () => {
  const { compareItems, setCompareItems } = useCompare();
  const navigate = useNavigate();

  if (compareItems.length === 0) return null;

  const handleCompare = () => {
    navigate("/compare");
  };

  const clearCompare = () => {
    setCompareItems([]);
    localStorage.removeItem("compareItems");
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-white shadow-lg border border-gray-300 p-4 rounded-xl flex justify-between items-center">
      <div className="flex items-center gap-3 overflow-x-auto">
        {compareItems.map((item) => (
          <div key={item._id} className="text-sm text-gray-700">
            {item.title}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={compareItems.length < 2}
        >
          Compare ({compareItems.length})
        </button>
        <button
          onClick={clearCompare}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export { CompareBar };
