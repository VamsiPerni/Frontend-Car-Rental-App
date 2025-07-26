import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { HashLoader } from "react-spinners";

const ComparePage = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState({});
  const [carNames, setCarNames] = useState([]);

  const cars = query.get("cars")?.split(",") || [];

  const getCarsComparison = async () => {
    try {
      setLoading(true);
      setCarNames(cars); // Store car names for header

      const resp = await axiosInstance.post("/ai/cars/comparisons", { cars });

      if (resp.data.isSuccess) {
        SuccessToast(resp.data.message);
        setComparison(resp.data.data);
      } else {
        SuccessToast(resp.data.message);
      }
    } catch (err) {
      console.log(err);
      ErrorToast(
        `Cannot compare cars ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cars.length > 0) {
      getCarsComparison();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <HashLoader size={120} color="#3b82f6" speedMultiplier={1.2} />
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Generating Comparison
          </h3>
          <p className="text-gray-600">
            Our AI is analyzing {carNames.join(" and ")}...
          </p>
        </div>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Cars Selected
          </h2>
          <p className="text-gray-600">
            Please select cars to compare from the listings page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Back Button - Add this section */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Results
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {carNames.join(" vs ")} Comparison
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            AI-powered detailed comparison
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  {carNames.map((car, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {car}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verdict
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(comparison).map(([parameter, data]) => (
                  <tr key={parameter}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {parameter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {data.description}
                    </td>
                    {carNames.map((car) => (
                      <td
                        key={`${parameter}-${car}`}
                        className="px-6 py-4 text-sm text-gray-500"
                      >
                        {data[car] || "N/A"}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm text-blue-600">
                      {data.verdict}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            AI Analysis Summary
          </h3>
          <div className="prose prose-blue max-w-none">
            {Object.entries(comparison).length > 0 && (
              <p className="text-gray-700">
                Based on our analysis, {carNames[0]} and {carNames[1]} have
                distinct strengths in different areas. The best choice depends
                on your priorities like{" "}
                {Object.keys(comparison)
                  .slice(0, 3)
                  .map((param) => param.toLowerCase())
                  .join(", ")}{" "}
                and other factors.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ComparePage };
