// We need to write the LoadingSkeleton separately from up-coming projects , becuase if we write the skeleton is separate separte components then if we change the library / provider then we need to go to every component and need to change that. So insted of that if we write like this then it would be more usefull

// The below code is just an example for future , IT IS NO-WHERE included or related to the website

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return <Skeleton />;
};

export { LoadingSkeleton };
