import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BookingDetailsOwner } from "../../../api/PropertyApi";
import moment from "moment";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function BookingDetails() {
  const { ownerInfo } = useSelector((state) => state.owner);
  const [data, setData] = useState([]);
  const [active, setActive] = React.useState(1);
  const [totalPage, setTotalpage] = useState();

  const id = ownerInfo.id;

  useEffect(() => {
    const showUserData = async () => {
      try {
        const response = await BookingDetailsOwner(id, active);
        if (response) {
          setData(response.data.bookingData);
          setTotalpage(response.data.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showUserData();
  }, [id, active]);

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
          <div className="h-[70px] w-full py-6  bg-gray-50 px-4">
            <h1 className="font-medium ">Booking Details</h1>
          </div>
          <div className="pt-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Property Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Rooms
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Guests
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check In
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check Out
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment methode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking Status
                  </th>
                </tr>
              </thead>
              {data.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.PropertyName}
                      </th>
                      <td className="px-6 py-4">{item.details.Address.Name}</td>
                      <td className="px-6 py-4">
                        {item.details.Address.Mobile}
                      </td>
                      <td className="px-6 py-4">{item.details.TotalRooms}</td>
                      <td className="px-6 py-4">{item.details.TotalGuest}</td>
                      <td className="px-6 py-4">
                        {moment(item.details.ChekIn).format("MMM Do YY")}
                      </td>
                      <td className="px-6 py-4">
                        {moment(item.details.ChekOut).format("MMM Do YY")}
                      </td>
                      <td className="px-6 py-4">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item.details.paymentMethode}
                          color="green"
                          className="text-center"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item.details.bookingStatus}
                          color={
                            item.details.bookingStatus === "cancel"
                              ? "red"
                              : "green"
                          }
                          className="text-center"
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
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
