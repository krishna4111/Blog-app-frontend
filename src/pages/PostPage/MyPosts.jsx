import { useState } from "react";
import PostHeader from "./PostHeader";

const MyPosts = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "recent",
  });

  const handleFilterChange = (changedFilter) => {
    setFilters((prev) => {
      return {
        ...prev,
        ...changedFilter,
      };
    });
  };

  return (
    <div>
      <PostHeader
        mode="my"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default MyPosts;
