import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Button,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleThem } from "../redux/theme/themeSlice";
import useSignOut from "../hooks/useSignOut";

export default function Header() {
  const signout = useSignOut();

  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleThemChange = () => {
    console.log("toggle clicked");
    dispatch(toggleThem());
  };

  return (
    <Navbar className="text-white">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold  dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Krishna's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="search"
          rightIcon={IoSearchOutline}
          className="hidden md:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <IoSearchOutline />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden lg:inline"
          color="gray"
          pill
          onClick={handleThemChange}
        >
          <MdOutlineLightMode />
        </Button>
        {!currentUser ? (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
              Sign In
            </Button>
          </Link>
        ) : (
          // <img src={currentUser?.profilePicture}></img>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                // img={currentUser?.profilePicture ||}
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbbdPqXU3wwsJQPwkgU42saoIIg22ct8rNcFV_RU6PA&s=10"
                rounded
              ></Avatar>
            }
          >
            <DropdownHeader className="flex flex-col">
              <span className="truncate">{currentUser.username}</span>
              <span className="truncate">{currentUser.email}</span>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={signout}>Sign Out</DropdownItem>
          </Dropdown>
        )}
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as={"div"}>
          <Link to="/projects">Project</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
