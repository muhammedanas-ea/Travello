import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userProfileSchema } from "../../../yup/validation";
import { UpdateProfile, UserProfileData } from "../../../api/UserApi";
import { useEffect, useState } from "react";
import { GenerateSuccess } from "../../../toast/Toast";
import { setUserDetails } from "../../../redux/userSlice/UserSlice";

export default function UserProfile() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showUserData = async () => {
      try {
        const id = userInfo.id;
        const response = await UserProfileData(id);
        if (response) {
          setLoading(true);
          const userDetails = {
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            number: response.data.number,
            houseName: response.data.houseName,
            state: response.data.state,
            city: response.data.city,
            is_block: response.data.is_block,
            is_verified: response.data.is_verified,
            is_admin: response.data.is_admin,
          };
          dispatch(
            setUserDetails({
              userInfo: userDetails,
            })
          );
          setProfile(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showUserData();
  }, [profile]);

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    number: userInfo.number,
    houseName: userInfo.houseName,
    state: userInfo.state,
    city: userInfo.city,
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userProfileSchema,
      onSubmit: async (values) => {
        try {
          const id = userInfo.id;
          const response = await UpdateProfile(values, id);
          if (response.data.status) {
            setProfile(true);
            GenerateSuccess(response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      },
    });
  return (
    <>
      {loading ? (
        <div className="py-9">
          <div className="contai-section">
            <Typography
              variant="h3"
              className="mr-4 ml-2 cursor-pointer py-1.5 text-gray-800 sm:text-2xl sm:font-extralight"
            >
              Profile
            </Typography>
            <hr className="border-1 border-gray-400" />
            <div className="contai-section">
              <div className="contai-section pt-12">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center gap-7">
                    <div className="w-full ">
                      <Input
                        size="lg"
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && (
                        <p className="pt-2 text-xs italic text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          size="lg"
                          label="House name"
                          name="houseName"
                          value={values.houseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.houseName && errors.houseName && (
                          <p className="pt-2 text-xs italic text-red-500">
                            {errors.houseName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          size="lg"
                          label="State"
                          name="state"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.state && errors.state && (
                          <p className="pt-2 text-xs italic text-red-500">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full ">
                      <Input
                        size="lg"
                        label="Residential City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.city && errors.city && (
                        <p className="pt-2 text-xs italic text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="w-full ">
                      <Input
                        size="lg"
                        label="Email Id"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <p className="pt-2 text-xs italic text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="w-full ">
                      <Input
                        size="lg"
                        label="Mobile Number"
                        name="number"
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.number && errors.number && (
                        <p className="pt-2 text-xs italic text-red-500">
                          {errors.number}
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-1/2">
                      Update Profile
                    </Button>
                  </div>
                </form>
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
