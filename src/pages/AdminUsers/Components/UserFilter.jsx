import { Label, Select, TextInput } from "flowbite-react";

const UserFilter = () => {
  return (
    <div className=" p-4 border border-gray-400 bg-gray-900  rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-8">
      <div>
        <Label htmlFor="roles">Search</Label>
        <TextInput
          type="text"
          id="search"
          placeholder="Search here"
        ></TextInput>
      </div>
      <div>
        <Label htmlFor="roles">Role</Label>
        <Select id="roles" required>
          <option>Admin</option>
          <option>User</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select id="status" required>
          <option>Active</option>
          <option>Inactive</option>
        </Select>
      </div>
    </div>
  );
};

// const UserFilter = () => {
//   return (
//     <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {/* Search */}
//         <div className="lg:col-span-1">
//           <label className="mb-2 block text-sm font-medium text-gray-300">
//             Search
//           </label>

//           <input
//             type="text"
//             placeholder="Search users..."
//             className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         {/* Role */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-gray-300">
//             Role
//           </label>

//           <select className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white focus:border-blue-500 focus:ring-blue-500">
//             <option>All Roles</option>
//             <option>User</option>
//             <option>Admin</option>
//           </select>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-gray-300">
//             Status
//           </label>

//           <select className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white focus:border-blue-500 focus:ring-blue-500">
//             <option>All Status</option>
//             <option>Active</option>
//             <option>Deleted</option>
//           </select>
//         </div>

//         {/* Sort */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-gray-300">
//             Sort By
//           </label>

//           <select className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-white focus:border-blue-500 focus:ring-blue-500">
//             <option>Newest</option>
//             <option>Oldest</option>
//             <option>Name A-Z</option>
//             <option>Name Z-A</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

export default UserFilter;
