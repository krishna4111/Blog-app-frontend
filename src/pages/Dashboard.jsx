import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import AdminUsers from "./AdminUsers/AdminUsers";
import AllPosts from "./PostPage/AllPosts";
import MyPosts from "./PostPage/MyPosts";

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-2">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* main section  */}
      {tab === "profile" && <DashProfile />}
      {tab === "users" && <AdminUsers />}
      {tab === "all-post" && <AllPosts />}
      {tab === "my-post" && <MyPosts />}
    </div>
  );
}
