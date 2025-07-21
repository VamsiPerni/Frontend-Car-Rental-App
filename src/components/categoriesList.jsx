import { useEffect, useState } from "react";

const CategoriesList = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      setProducts(result.data.products);
    } catch (err) {
      console.log("Error while getting products", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Our Partner Brands
        </h1>
        <p className="text-gray-600">
          Discover the finest automotive brands we collaborate with
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {Array.from(
          new Map(products.map((item) => [item.brand, item])).values()
        ).map((elem) => (
          <div
            key={elem._id}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
          >
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-2 text-amber-800 font-bold">
              {elem.brand.charAt(0)}
            </div>
            <p className="text-sm font-medium text-gray-700 text-center">
              {elem.brand}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CategoriesList };
