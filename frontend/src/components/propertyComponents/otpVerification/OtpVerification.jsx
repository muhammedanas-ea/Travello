import { useState } from "react";
import otpImg from "../../../../public/staticImages/otp.jpg";
import { OtpChecking } from "../../../api/PropertyApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPropertyOwnerDetails } from "../../../redux/userSlice/PropertySlice";

function OtpVerification() {
  const { state } = useLocation();
  const { id } = state;
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await OtpChecking({ otp, id });
      if (response.data.status) {
        localStorage.setItem("propertyToken", response.data.propertytoken);
        const ownerDetails = {
          id: response.data.propertyData._id,
            name: response.data.propertyData.name,
            email: response.data.propertyData.email,
            number: response.data.propertyData.number,
        }
        dispatch(
          setPropertyOwnerDetails({
            ownerInfo:ownerDetails
          })
        );
        navigate("/property");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-screen bg-blue-500 text-white flex items-center justify-center">
        <img src={otpImg} alt="Vector Image" className="object-fill h-screen" />
      </div>
      <div className="w-1/2 bg-gray-100 p-10 flex items-center justify-center">
        <form className="w-2/3" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-1">Enter your otp</h2>
          <span className="text-xs text-gray-500">
            Send a otp in your email check it .
          </span>
          <div className="pt-5 mb-4">
            <div className="pb-2">
              <label htmlFor="" className="px-1">
                Enter otp
              </label>
            </div>
            <input
              className="shadow appearance-none border border-gray-600 rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="enter otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send otp
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
