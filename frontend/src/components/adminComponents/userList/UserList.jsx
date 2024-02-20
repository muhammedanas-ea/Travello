import { Button, Chip, IconButton, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { UserDetails } from "../../../api/AdminApi";
import DialogBox from "../dialogBox/DialogBox";
import { UserUnblock } from "../../../api/AdminApi";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [totalPage, setTotalpage] = useState();
  const [child, setChild] = useState();
  const [active, setActive] = React.useState(1);
  const [search, setSearch] = useState(0);

  const handleUnblock = async (id) => {
    try {
      const response = await UserUnblock({ id });
      if (response.data.status) {
        setChild(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const showUserData = async () => {
      try {
        const response = await UserDetails(active, search);
        if (response.data.status) {
          setUserData(response.data.userData);
          setTotalpage(response.data.totalPages);
          setChild(false);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showUserData();
  }, [child, active, search]);

  const onDataUpdate = (data) => {
    setChild(data);
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === totalPage) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-16">
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <div className="h-[70px] py-6 flex justify-between items-center bg-gray-50 px-4">
            <h1 className="font-medium ">User Details</h1>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => {
                  e.target.value.length !== 0
                    ? setSearch(e.target.value)
                    : setSearch(0);
                }}
              />
            </div>
          </div>
          <div className="pt-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => {
                  const { name, email, is_block, _id } = item;
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {name}
                      </th>
                      <td className="px-6 py-4">{email}</td>
                      <td className="px-3 py-4">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={is_block ? "block" : "unblock"}
                          color="green"
                          className="text-center"
                        />
                      </td>
                      <td className="flex items-center px-6 py-4 space-x-3">
                        {!is_block ? (
                          <DialogBox id={item} onDataUpdate={onDataUpdate} />
                        ) : (
                          <Button
                            className="rounded-md font-medium"
                            size="sm"
                            onClick={() => handleUnblock(_id)}
                          >
                            Unblock
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPage }).map((_, index) => (
            <IconButton key={index} {...getItemProps(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPage}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
