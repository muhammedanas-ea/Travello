import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminApprove, ViewPropertyDetails } from "../../../api/AdminApi";
import { GenerateSuccess } from "../../../toast/Toast";

export default function ViewDetails() {
  const { state } = useLocation();
  const { _id } = state;
  const [viewDetailsData, setViewDetailsData] = useState([]);
  const navigate = useNavigate();

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
  } = viewDetailsData;

  useEffect(() => {
    const showViewPropertyData = async () => {
      try {
        const response = await ViewPropertyDetails(_id);
        if (response) {
          setViewDetailsData(response.data.propertyData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showViewPropertyData();
  }, [_id]);

  const handleSubmit = async (verify) => {
    try {
      const response = await AdminApprove(verify, _id);
      if (response) {
        GenerateSuccess(response.data.message);
        navigate("/admin/notification");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              <div className="pl-6 pb-5  flex gap-10">
                <Button
                  variant="outlined"
                  size="md"
                  color="green"
                  onClick={() => handleSubmit(true)}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  size="md"
                  color="red"
                  onClick={() => handleSubmit(false)}
                >
                  Reject
                </Button>
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
  );
}
