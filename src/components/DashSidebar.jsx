import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
  SidebarCollapse,
} from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import useSignOut from "../hooks/useSignOut";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { BsFillSignpost2Fill } from "react-icons/bs";

export default function DashSidebar() {
  const user = useSelector((state) => state.user);
  const signout = useSignOut();

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlLocatedAt = urlParams.get("tab");

    if (urlLocatedAt) {
      setTab(urlLocatedAt);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56 ">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col">
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={CgProfile}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>

          {user.currentUser.role === "admin" && (
            <Link to="/dashboard?tab=users">
              <SidebarItem
                active={tab === "users"}
                icon={FaUsers}
                label={"User"}
                labelColor="dark"
                as="div"
              >
                Users
              </SidebarItem>
            </Link>
          )}

          <SidebarCollapse
            icon={BsFillSignpost2Fill}
            className="hover:cursor-pointer"
            label="E-commerce"
          >
            <Link to="/dashboard?tab=all-post">
              <SidebarItem
                className="mb-2"
                active={tab === "all -post"}
                as="div"
              >
                All Posts
              </SidebarItem>
            </Link>
            <Link to="/dashboard?tab=my-post">
              <SidebarItem active={tab === "my-post"} as="div">
                My Posts
              </SidebarItem>
            </Link>
          </SidebarCollapse>

          <SidebarItem
            icon={GoSignOut}
            label={"User"}
            labelColor="dark"
            onClick={signout}
          >
            SignOut
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
