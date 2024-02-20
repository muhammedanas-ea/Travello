import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserGoogleSignin } from "../../../api/UserApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/userSlice/UserSlice";

export default function GoogleSignin() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          UserGoogleSignin(res.data)
            .then((res) => {
              if (res.data.status) {
                localStorage.setItem("userToken", res.data.usertoken);
                const userDetails = {
                  id: res.data.userData._id,
                  name: res.data.userData.name,
                  email: res.data.userData.email,
                  number: res.data.number,
                  houseName: res.data.houseName,
                  state: res.data.state,
                  city: res.data.city,
                  is_block: res.data.userData.is_block,
                  is_verified: res.data.userData.is_verified,
                  is_admin: res.data.userData.is_admin,
                };
                dispatch(
                  setUserDetails({
                    userInfo: userDetails,
                  })
                );
                navigate("/home");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <button
        className="w-full mb-4 px-3  py-2 font-bold text-gray-800 bg-[#fff] rounded border border-gray-500 hover:bg-[#f8f7f7de] focus:outline-none focus:shadow-outline"
        type=""
        onClick={login}
      >
        Login with Google
      </button>
    </>
  );
}
