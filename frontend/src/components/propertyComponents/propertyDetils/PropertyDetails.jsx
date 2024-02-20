import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {  PropertyHide, SinglePropertyDetails } from "../../../api/PropertyApi";
import EditPropertyDialog from "../editPropertyDialoge/EditPropertyDialoge";
import { GenerateSuccess } from "../../../toast/Toast";

export default function PropertyDetails() {
  const { state } = useLocation();
  const { _id } = state;
  const [singleData, setSingleData] = useState([]);
  const [child, setChild] = useState();
  const [loading, setLoading] = useState(false);

  const {
    PropertyName,
    Price,
    RoomCount,
    GuestCount,
    MobileNumber,
    City,
    State,
    PropertyType,
    Image,
    Is_list,
  } = singleData;

  const onDataUpdate = (data) => {
    setChild(data);
  };

  const showViewPropertyData = async () => {
    try {
      const response = await SinglePropertyDetails(_id);
      if (response) {
        setLoading(true);
        setSingleData(response.data.propertyData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showViewPropertyData();
  }, [_id, child]);

  const handleList = async (hide) => {
    try {
      const propertyId = _id;
      const response = await PropertyHide(propertyId, hide);
      if (response) {
        showViewPropertyData();
        GenerateSuccess(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg dark:border-gray-700 mt-16">
            <div className="w-full grid grid-cols-1  sm:rounded-lg">
              <div className="grid grid-cols-5 grid-rows-1 gap-4 bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="col-span-3 row-span-4">
                  <div className="p-6 grid grid-cols-2 gap-3">
                    <div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Property name
                        </Typography>
                        <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          {PropertyName}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Rooms
                        </Typography>
                        <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          {RoomCount}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          State
                        </Typography>
                        <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          {State}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Mobile number
                        </Typography>
                        <Typography className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                          {MobileNumber}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2 font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Per head rate
                        </Typography>
                        <Typography
                          variant="paragraph"
                          className="mb-4 font-normal text-gray-700 dark:text-gray-400"
                        >
                          Rs {Price}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Maximum Guests
                        </Typography>
                        <Typography className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          {GuestCount}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Location
                        </Typography>
                        <Typography className="mb-4 font-light text-gray-700 dark:text-gray-400">
                          {City}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h5"
                          className="font-san mb-2  font-normal leading-6 tracking-tight text-[#1e1e1e]"
                        >
                          Property type
                        </Typography>
                        <Typography className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                          {PropertyType}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="pl-6 pb-5 flex gap-4">
                    <EditPropertyDialog
                      data={singleData}
                      onDataUpdate={onDataUpdate}
                    />
                    {!Is_list ? (
                      <Button
                        variant="outlined"
                        onClick={() => handleList("showproperty")}
                      >
                        Show property
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleList("hideproperty")}
                      >
                        Hide property
                      </Button>
                    )}
                  </div>
                </div>
                <div className="col-span-2 row-span-4 col-start-4">
                  <img
                    className="object-cover w-full  h-full md:w-full "
                    src={
                      Image
                        ? `${import.meta.env.VITE_USER_URL}/files/${Image[0]}`
                        : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>loding</h1>
      )}
    </>
  );
}
