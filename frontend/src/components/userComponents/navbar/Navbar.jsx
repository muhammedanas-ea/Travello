import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/solid";

// Import Logo Components
import { Logo } from "../../commonComponents/CommonComponets";

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmailVerify } from "../../../api/UserApi";
import { GenerateSuccess } from "../../../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice/UserSlice";


// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Bookings",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  const dispatch = useDispatch();

  const userLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(
      setUserDetails({
        userInfo: {},
      })
    );
    navigate("/login");
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
                  onClick={userLogout}
                >
                  {label}
                </button>
              ) : label === "Bookings" ? (
                <Link
                  className="font-normal"
                  style={{ color: isLastItem ? "red" : "inherit" }}
                  to="/bookingsummery"
                >
                  {label}
                </Link>
              ) : (
                <Link
                  className="font-normal"
                  style={{ color: isLastItem ? "red" : "inherit" }}
                  to="/userprofile"
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
  const params = useParams();
  const { id, token } = params;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        if (id && token) {
          const response = await EmailVerify(params.id, params.token);
          if (response.data.status) {
            localStorage.setItem("userToken", response.data.usertoken);
            const userDetails = {
              id: response.data.userData._id,
              name: response.data.userData.name,
              email: response.data.userData.email,
              number: response.data.number,
              houseName: response.data.houseName,
              state: response.data.state,
              city: response.data.city,
            };
            dispatch(
              setUserDetails({
                userInfo: userDetails,
              })
            );
            GenerateSuccess(response.data.message);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyEmailUrl();
  }, [id, token]);

  return (
    <Navbar className="z-50  shadow-md bg-white  rounded-none max-w-none mx-auto lg:pl-6 sticky top-0 left-0 right-0">
      <div className="container">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Link to="/home">
            <Logo />
          </Link>
          <div className="flex items-center gap-5">
            {localStorage.getItem("userToken") ? (
              <>
               <Button
                  className="border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                  size="sm"
                  variant="text"
                  onClick={() => navigate("/chat")}
                >
                  chats
                </Button>
                <span>{userInfo.name}</span>
                <ProfileMenu />
              </>
            ) : (
              <>
                <Button
                  className="border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                  size="sm"
                  variant="text"
                  onClick={() => navigate("/property/login")}
                >
                  List your property
                </Button>
                <Link className="text-gray-900 hover:text-[#000]" to="/login">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
}
