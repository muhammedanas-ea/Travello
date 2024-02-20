import { Typography, Button, Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BookingCancelUser,
  BoookigCompletedDetails,
} from "../../../api/UserApi";
import moment from "moment";
import { GenerateSuccess } from "../../../toast/Toast";

export default function BookingDetails() {
  const { state } = useLocation();
  const { bookingId } = state;
  const [bookingData, setBookingData] = useState(null);
  const [cancel, setCancel] = useState(true);

  useEffect(() => {
    const showBookingData = async () => {
      try {
        const response = await BoookigCompletedDetails(bookingId);
        if (response) {
          setCancel(true);
          setBookingData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showBookingData();
  }, [bookingId, cancel]);

  const handleBookingCancel = async (bookingId) => {
    try {
      const response = await BookingCancelUser(bookingId);
      if (response) {
        setCancel(false);
        GenerateSuccess(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {bookingData && bookingData.PropertyId ? (
          <div className="bg-white  overflow-hidden">
            <div className="px-6 py-8">
              <Typography
                variant="h3"
                className="text-gray-800 text-2xl font-extralight mb-6"
              >
                Transaction ID: {bookingData.TransactionId}
              </Typography>
              <hr className="border-1 border-gray-300 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div>
                    <Typography variant="h5" className="mb-5 text-gray-800">
                      Checking Details
                    </Typography>
                    <p className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-gray-600">
                      {bookingData.PropertyId.PropertyName}
                    </p>
                    <p className="mb-4 font-normal text-gray-600 dark:text-gray-400">
                      {bookingData.PropertyId.City},
                      {bookingData.PropertyId.State}
                    </p>

                    <div className="flex flex-col gap-4">
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Check In :{" "}
                        {moment(bookingData.ChekIn).format("MMM Do YY")}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Check Out :{" "}
                        {moment(bookingData.CheckOut).format("MMM Do YY")}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Rooms : {bookingData.TotalGuest}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Guests : {bookingData.TotalRooms}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Typography variant="h5" className="mb-5 text-gray-800">
                      User Details
                    </Typography>
                    <div className="flex flex-col gap-5">
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Name : {bookingData.Address.Name}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Email : {bookingData.Address.Email}
                      </p>
                      <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                        Number : {bookingData.Address.Mobile}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <img
                    className="object-fill w-full h-[13rem] rounded-lg"
                   
                    src={
                      bookingData && bookingData.PropertyId.Image
                        ? `${import.meta.env.VITE_USER_URL}/files/${bookingData.PropertyId.Image[0]}`
                        : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-2">
                <Typography variant="h5" className="text-gray-800">
                  Total Amount :
                </Typography>
                <p className="text-lg font-bold">Rs. {bookingData.TotalRate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="h5" className="text-gray-800">
                  Booking Status :
                </Typography>
                <Chip
                  variant="ghost"
                  size="sm"
                  value={
                    bookingData.bookingStatus === "success"
                      ? "success"
                      : "cancel"
                  }
                  color={
                    bookingData.bookingStatus === "success" ? "green" : "red"
                  }
                  className="text-center"
                />
              </div>
              <div className="flex justify-end">
                {bookingData.bookingStatus === "success" ? (
                  <Button
                    color="red"
                    buttonType="filled"
                    size="lg"
                    onClick={() => handleBookingCancel(bookingData._id)}
                  >
                    Cancel Booking
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center">
            No booking is available
          </div>
        )}
      </div>
    </div>
  );
}
