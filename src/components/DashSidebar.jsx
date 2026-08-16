import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
} from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
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
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
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

          <SidebarItem icon={GoSignOut} label={"User"} labelColor="dark">
            SignOut
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
