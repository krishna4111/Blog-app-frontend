import { useState } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pagination, setPagination] = useState();

  const getPosts = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "",
  }) => {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      const params = new URLSearchParams();

      if (page) {
        params.append("page", page);
      }
      if (limit) {
        params.append("limit", limit);
      }
      if (search) {
        params.append("search", search);
      }

      if (sortBy) {
        params.append("sortBy", sortBy);
      }

      const result = await fetch(
        `http://localhost:4500/api/posts/view?${params}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await result.json();

      if (!data.success) {
        setErrorMessage(data.message);
        setIsLoading(false);
        console.error("Error when get posts", data.message);
        return;
      }

      setIsLoading(false);
      setErrorMessage(null);
      setPosts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error when getting posts", error);
    }
  };

  return { getPosts, pagination, posts, setPosts, isLoading, errorMessage };
};

export default usePosts;
