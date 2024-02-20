import {
  ChevronDownIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Logo } from "../../commonComponents/CommonComponets";
import Sidebars from "../propertySidebar/PropertySidebar";
import { Link, useNavigate } from "react-router-dom";
import { setPropertyOwnerlogoutDetails } from "../../../redux/userSlice/PropertySlice";
import { useDispatch, useSelector } from "react-redux";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const propertyLogout = () => {
    localStorage.removeItem("propertyToken");
    dispatch(
      setPropertyOwnerlogoutDetails({
        ownerInfo:{}
      })
    );
    navigate("/property/login");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}

              {label === "Sign Out" ? (
                <button
                  className={`font-normal ${
                    isLastItem ? "text-red" : "text-blue-gray-900"
                  } hover:underline`}
                  onClick={propertyLogout}
                >
                  {label}
                </button>
              ) : (
                <Link
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                  to="/property/ownerprofile"
                >
                  {label}
                </Link>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { ownerInfo } = useSelector((state) => state.owner);
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Logo />
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-5 ml-3">
              <Button
                  className="border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                  size="sm"
                  variant="text"
                  onClick={() => navigate("/property/chat")}
                >
                  chats
                </Button>
                <span>{ownerInfo.name}</span>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebars isOpen={isSidebarOpen} />
    </div>
  );
}
