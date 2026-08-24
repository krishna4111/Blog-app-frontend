import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const UserFilter = ({ filters, onFilterChange }) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  console.log("filters are ===>", filters);

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ search: searchInput });
  };

  return (
    <div className=" p-4 border border-gray-400 bg-gray-900  rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-8">
      <div className="relative">
        <Label htmlFor="roles">Search</Label>
        <TextInput
          type="text"
          id="search"
          placeholder="Search here"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="relative"
        ></TextInput>
        <Button
          type="button"
          className="absolute right-0 top-6 hover:cursor-pointer"
          onClick={handleSearch}
        >
          <FaSearch />
        </Button>
      </div>
      <div>
        <Label htmlFor="roles">Role</Label>
        <Select
          id="roles"
          value={filters.role}
          onChange={(e) => {
            onFilterChange({ role: e.target.value });
          }}
          required
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          value={filters.status}
          onChange={(e) => {
            onFilterChange({ status: e.target.value });
          }}
          required
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>
    </div>
  );
};

export default UserFilter;
