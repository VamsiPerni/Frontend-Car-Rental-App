import { useNavigate } from "react-router";

const ProductResultCard = (props) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    brand,
    type,
    availability,
    rating,
    images,
    location,
    pricePerDay,
  } = props;

  const handleViewProduct = () => {
    navigate(`/${_id}/view`);
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 p-4 w-full max-w-4xl bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 group"
      onClick={handleViewProduct}
    >
      <div className="w-full sm:w-1/3 h-48 bg-gray-50 overflow-hidden rounded-xl">
        <img
          src={images}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="w-full sm:w-2/3 p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h3>
          <div className="flex items-center bg-amber-100 px-2 py-1 rounded-md">
            <span className="text-sm font-medium text-gray-700">
              ⭐ {rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span className="font-medium text-gray-700">{brand}</span>
          <span>•</span>
          <span>{type}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <span>📍{location}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          availability
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
          >
            {availability ? "Available to Rent" : "Currently Unavailable"}
          </span>
          <div className="text-right">
            <span className="block text-xs text-gray-400">Price per day</span>
            <span className="text-lg font-bold text-amber-600">
              ${pricePerDay}
            </span>
          </div>
        </div>

        <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export { ProductResultCard };
