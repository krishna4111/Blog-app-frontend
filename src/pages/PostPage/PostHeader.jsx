import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PostHeader = ({ mode, filters, onFilterChange }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search: searchInput,
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  return (
    <div className=" w-full p-4">
      <div className="flex flex-col gap-6 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="shrink-0">
          <h1 className="text-3xl font-bold mb-2">
            {mode === "all" ? "All posts" : "My Posts"}
          </h1>
          <h3 className="text-lg font-semibold">
            {mode === "all"
              ? "Discover Amazing Posts From Our Community"
              : "Manage Your Published And Drafted Posts"}
          </h3>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
          <TextInput
            id="search"
            type="text"
            rightIcon={IoSearch}
            placeholder="search here"
            required
            value={searchInput}
            className="w-full sm:w-64"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />

          <Select
            id="sort-by"
            className="w-full sm:w-32"
            value={filters.sortBy}
            required
            onChange={(e) => {
              const sort = e.target.value;
              onFilterChange({ sortBy: sort });
            }}
          >
            <option value="recent">Recent</option>
            <option value="old">Old</option>
          </Select>

          {mode === "my" && (
            <Button
              className="w-full whitespace-nowrap sm:w-auto hover:cursor-pointer"
              onClick={() => {
                navigate("/dashboard/posts/create");
              }}
            >
              Create Post
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
