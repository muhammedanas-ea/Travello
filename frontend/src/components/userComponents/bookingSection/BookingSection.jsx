import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MangeWalletPayment, PaymentDetails } from "../../../api/UserApi";
import { CheckOutForm } from "../checkOutForm/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
const PUBLIC_KEY =
  "pk_test_51ODm4bSHaENjV1jr6QBv93m7yUjiUR2bCql3CNylL2bhvGcr3Fr8ZUEzlInPA3zAyDN8k8EUUUzGChUNHKWZXzAh00Q4Z4tzgS";
const stripePromise = loadStripe(PUBLIC_KEY);

export default function BookingSection() {
  const { state } = useLocation();
  const { bookingData } = state;
  const [paymentData, setPaymentData] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethode, setPaymentMethode] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const showBookingData = async () => {
      try {
        const response = await PaymentDetails(bookingData);
        if (response.data.status) {
          setLoading(true);
          setPaymentData(response.data.booking);
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showBookingData();
  }, [bookingData]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handlePaymentOption = (e) => {
    setPaymentMethode(e.target.value);
  };

  const handleWalletPayment = async (bookingId) => {
    try {
      const response = await MangeWalletPayment(bookingId);
      if(response.data.status){
        navigate('/success')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="py-9">
          <div className="contai-section">
            <div className="grid grid-cols-5 grid-rows-1 gap-12">
              <div className="col-span-3">
                <div className="mb-6">
                  <Typography
                    variant="h3"
                    className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                  >
                    Check in details
                  </Typography>

                  <div className="flex w-full mt-2 flex-col items-start bg-white   rounded-lg  md:flex-row  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img
                      className="object-fill w-full rounded-t-lg h-96 md:h-[13rem] md:w-48 md:rounded-none md:rounded-s-lg"
                      src={
                        paymentData.PropertyId.Image
                          ? `${import.meta.env.VITE_USER_URL}/files/${paymentData.PropertyId.Image[0]}`
                          : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                      }
                      alt=""
                    />
                    <div className="flex flex-col  justify-start p-4 leading-normal">
                      <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                        {paymentData.PropertyId.PropertyName}
                      </h6>
                      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                        {paymentData.PropertyId.City},
                        {paymentData.PropertyId.State}
                      </p>
                      <div className="flex gap-16 my-3">
                        <div>
                          <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                            Check In
                          </p>
                          <p className="mt-2">
                            {moment(paymentData.ChekIn).format("MMM Do YY")}
                          </p>
                        </div>
                        <div>
                          <p className="font-normal  leading-3 tracking-tighter text-[#959595]">
                            Check Out
                          </p>
                          <p className="mt-2">
                            {moment(paymentData.CheckOut).format("MMM Do YY")}
                          </p>
                        </div>
                      </div>
                      <p className="font-normal mt-2 leading-3 tracking-tighter text-[#959595]">
                        {paymentData.TotalRooms} Bedrooms ,{" "}
                        {paymentData.TotalGuest} guests
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <Typography
                    variant="h3"
                    className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                  >
                    Your details
                  </Typography>
                  <div className="mt-2">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex gap-2 mb-3 items-center">
                          <h6 className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                            Name :
                          </h6>
                          <p className="text-gray-700">
                            {paymentData.Address.Name}
                          </p>
                        </div>
                        <div className="flex w-full mb-3  gap-2 items-center">
                          <h6 className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                            Email :
                          </h6>
                          <p className="text-gray-700">
                            {paymentData.Address.Email}
                          </p>
                        </div>
                        <div className="flex gap-2  mb-3  items-center">
                          <p className="font-san  text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                            Mobile :
                          </p>
                          <p className="text-gray-700">
                            {paymentData.Address.Mobile}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 col-start-4">
                <div className="h-[225px] bg-[#f3f0f0] mt-[5rem] border border-gray-800 px-5 py-5 shadow-lg rounded-md flex flex-col justify-between">
                  <h5 className="mt-2 ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1ed2]">
                    Price details
                  </h5>
                  <div className="pt-3 pb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="walletPayment"
                        onChange={handlePaymentOption}
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="ml-2 font-san text-lg">
                          Wallet Payment
                        </span>
                        <span className="ml-2 font-san text-lg">
                          ₹ {paymentData.UsersId.wallet}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="pb-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="onlinePayment"
                        onChange={handlePaymentOption}
                      />
                      <span className="ml-2 font-san text-lg">
                        Online Payment
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1edc]">
                      Total Amount :
                    </h5>
                    <h5 className="ont-san text-2xl  font-normal leading-6 tracking-tight text-[#1e1e1edc]">
                      ₹ {paymentData.TotalRate}
                    </h5>
                  </div>
                </div>
                <div className="w-full mt-8 mb-5">
                  {clientSecret && paymentMethode === "onlinePayment" ? (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckOutForm
                        bookingId={paymentData._id}
                        fee={paymentData.TotalRate}
                      />
                    </Elements>
                  ) : paymentMethode === "walletPayment" ? (
                    <Button
                      onClick={() => handleWalletPayment(paymentData._id)}
                      className="w-full leading-9"
                      size="lg"
                    >
                      Pay now
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          Loading.......
        </div>
      )}
    </>
  );
}
