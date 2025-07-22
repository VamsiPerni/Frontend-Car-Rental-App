// // compareContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const CompareContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useCompare = () => useContext(CompareContext);

// export const CompareProvider = ({ children }) => {
//   const [compareItems, setCompareItems] = useState(() => {
//     const stored = localStorage.getItem("compareItems");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("compareItems")) || [];
//     setCompareItems(stored);
//   }, []);

//   const addToCompare = (product) => {
//     setCompareItems((prev) => {
//       if (prev.some((p) => p._id === product._id)) return prev;
//       if (prev.length >= 2) return prev;
//       return [...prev, product];
//     });
//   };

//   const removeFromCompare = (id) => {
//     setCompareItems((prev) => prev.filter((item) => item._id !== id));
//   };

//   return (
//     <CompareContext.Provider
//       value={{ compareItems, addToCompare, removeFromCompare, setCompareItems }}
//     >
//       {children}
//     </CompareContext.Provider>
//   );
// };
