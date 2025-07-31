// import { Search } from "lucide-react";
// import React, { useCallback, useEffect } from "react";

// const SearchTasks = ({
//   placeholder,
//   tasks,
//   setFilteredTask,
//   searchQuery,
//   setSearchQuery,
// }) => {
//   const timerIdRef = useRef(null);
//   useEffect(() => {
//     //perform search logic and filter based on search query
//     const filteredTask = tasks.filter((task) => {
//       const case1 = task.title
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());

//       const case2 = task.description
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());

//       return case1 || case2;
//     });

//     setFilteredTask(filteredTask);
//   }, [searchQuery, setFilteredTask, tasks]);

//   //debounce search input change
//   const handleSearchInputChange = useCallback(
//     (event) => {
//       const query = event.target.value;

//       //Clear the previous Time
//       clearTimeout(timerIdRef.current);

//       //Set a new timeout and update the ref
//       timerIdRef.current = setTimeout(() => {
//         setSearchQuery(query);
//       }, 300);
//     },
//     [setSearchQuery]
//   );

//   return (
//     <div className="search-box-container">
//       <input
//         type="text"
//         onChange={handleSearchInputChange}
//         placeholder={placeholder}
//       />
//       <img src={Search} alt="Search icon" />
//     </div>
//   );
// };

// export default SearchTasks;

import Search from "../assets/search.svg";
import React, { useCallback, useEffect, useState } from "react";

const SearchTasks = ({
  placeholder,
  tasks,
  setFilteredTask,
  searchQuery,
  setSearchQuery,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    //1. set a timeout to update the actual searchQuery state
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    //2. Retun a cleanup function

    return () => {
      clearInterval(handler);
    };
  }, [inputValue, setSearchQuery]);

  useEffect(() => {
    //perform search logic and filter based on search query
    const filteredTask = tasks.filter((task) => {
      const case1 = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return case1 || case2;
    });

    setFilteredTask(filteredTask);
  }, [searchQuery, setFilteredTask, tasks]);

  return (
    <div className="search-box-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <img src={Search} alt="Search icon" />
    </div>
  );
};

export default SearchTasks;
