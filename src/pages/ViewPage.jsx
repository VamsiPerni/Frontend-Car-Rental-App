import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { axiosInstance } from "../axios/axiosInstance";
import { HashLoader } from "react-spinners";
import { StarIcon, ArrowLeftIcon } from "@heroicons/react/solid";

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      const data = res.data;
      setProduct(data.data.product);
      setMainImage(data.data.product.images);
      setReviews(data.data.reviews || []);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <HashLoader size={120} color="#10b981" speedMultiplier={1.2} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Car not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm pl-4 sm:pl-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to results
        </button>
      </div>

      {/* Hero Section with Darker Gradient */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-12 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
            <div className="flex items-center">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-amber-200" />
                <span className="ml-1">{product.rating}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{product.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Rest of your existing content remains the same */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="lg:w-2/3">
              <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                <img
                  src={mainImage || product.images}
                  className="w-full h-96 object-cover"
                  alt={product.title}
                />
              </div>

              {Array.isArray(product.extraImages) &&
                product.extraImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`rounded-lg overflow-hidden cursor-pointer ${
                        mainImage === product.images
                          ? "ring-2 ring-amber-500"
                          : ""
                      }`}
                      onClick={() => setMainImage(product.images)}
                    >
                      <img
                        src={product.images}
                        className="w-full h-24 object-cover"
                        alt="Main"
                      />
                    </div>
                    {product.extraImages.map((img, i) => (
                      <div
                        key={i}
                        className={`rounded-lg overflow-hidden cursor-pointer ${
                          mainImage === img ? "ring-2 ring-amber-500" : ""
                        }`}
                        onClick={() => setMainImage(img)}
                      >
                        <img
                          src={img}
                          className="w-full h-24 object-cover"
                          alt={`Extra ${i}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Details Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                {/* Price and Availability */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold text-amber-600">
                      ₹{product.pricePerDay}
                    </span>
                    <span className="text-gray-500"> / day</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.availability
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.availability ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Key Specifications */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Key Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="font-medium">{product.brand}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-medium">{product.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{product.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-medium">{product.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-medium">{product.transmission}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-medium">{product.seats}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Color:</span>{" "}
                      {product.color}
                    </p>
                    <p>
                      <span className="text-gray-500">Mileage:</span>{" "}
                      {product.mileage}
                    </p>
                    <p>
                      <span className="text-gray-500">Registration:</span>{" "}
                      {product.registrationNumber}
                    </p>
                    <p>
                      <span className="text-gray-500">Location:</span>{" "}
                      {product.location}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                        {review.user?.charAt(0) || "U"}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">
                          {review.user || "Anonymous"}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < (review.rating || 3)
                                  ? "text-amber-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { ViewPage };
