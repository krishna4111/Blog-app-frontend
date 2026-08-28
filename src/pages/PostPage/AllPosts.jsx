import { useCallback, useEffect, useState } from "react";
import usePosts from "../../hooks/usePosts";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const AllPosts = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "recent",
  });

  const [page, setPage] = useState(1);

  const { getPosts, posts, pagination, isLoading, errorMessage } = usePosts();

  console.log("posts are this ", posts);

  useEffect(() => {
    getPosts({
      page,
      limit: 10,
      search: filters.search,
      sortBy: filters.sortBy,
    });
  }, [page, filters.search, filters.sortBy]);

  const handleFilterChange = useCallback((changes) => {
    setPage(1);

    setFilters((prev) => {
      return {
        ...prev,
        ...changes,
      };
    });
  }, []);

  return (
    <div className="w-full">
      <PostHeader
        mode="all"
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {isLoading && <p>Loading....</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <PostBody posts={posts} />
    </div>
  );
};

export default AllPosts;
