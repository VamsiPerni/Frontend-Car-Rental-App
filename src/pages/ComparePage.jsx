import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { HashLoader } from "react-spinners";

const ComparePage = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState({});

  //   console.log(query.get("cars"));
  const cars = query.get("cars").split(","); // This might be null
  //   console.log(cars);

  const getCarsComparison = async () => {
    try {
      setLoading(true);

      const resp = await axiosInstance.post("/ai/cars/comparisons", {
        cars,
      });

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
    getCarsComparison();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center gap-10 content-center">
        <HashLoader size={120} color="#10b981" speedMultiplier={1.2} />
        <div className="border-1 border-lime-800 p-8 rounded-lg">
          <p>Please wait !! , our AI response on the way </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-2xl text-blue-700">
      <div className="flex flex-col gap-4">
        {Object.entries(comparison).map(([key, val]) => {
          return (
            <div className="flex">
              <p className="w-50 font-bold text-2xl text-purple-800">{key}</p>
              <p className="text-lg text-blue-800">{val}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ComparePage };
