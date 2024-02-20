import React, { useEffect, useState } from "react";
import {
  Button,
  Rating,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { MdOutlinePets } from "react-icons/md";
import { FaBath, FaSwimmingPool, FaWifi } from "react-icons/fa";
import SingleProperty from "../singleProperty/SingleProperty";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddReview,
  BookingDetails,
  UserSingleProperty,
} from "../../../api/UserApi";
import DatePicker from "react-datepicker";
import { GenerateError, GenerateSuccess } from "../../../toast/Toast";
import { Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import { RatingDescriptionSchema } from "../../../yup/validation";
import "./SinglePropertyDetails.css";

function SinglePropertyDetails() {
  const { state } = useLocation();
  const { _id } = state;
  const [siglePropertyData, setSinglePropertyData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState();
  const [reviewCheck, setReviwCheck] = useState();

  const {
    PropertyName,
    RoomCount,
    GuestCount,
    City,
    State,
    Image,
    Description,
    Amenities,
    Price,
  } = siglePropertyData;

  useEffect(() => {
    const showSinglePropertyData = async () => {
      try {
        const response = await UserSingleProperty(_id);
        if (response.data.status) {
          setReviwCheck(response.data.bookingCheck);
          setSinglePropertyData(response.data.propertyData);
          setFetchAgain(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showSinglePropertyData();
  }, [_id, fetchAgain]);

  const predefinedAmenities = [
    {
      content: "pool",
      icon: <FaSwimmingPool className="h-7 w-7" />,
    },
    {
      content: "wifi",
      icon: <FaWifi className="h-7 w-7" />,
    },
    {
      content: "bathtub",
      icon: <FaBath className="h-7 w-7" />,
    },
    {
      content: "petSpace",
      icon: <MdOutlinePets className="h-7 w-7" />,
    },
  ];

  const matchingAmenities =
    Amenities && Array.isArray(Amenities)
      ? predefinedAmenities.filter((predefinedAmenity) =>
          Amenities.includes(predefinedAmenity.content)
        )
      : [];

  const data = [
    {
      label: "About",
      value: 1,
    },
    {
      label: "Amenities",
      value: 2,
    },
    {
      label: "Reviews",
      value: 3,
    },
    {
      label: "Add Reviews",
      value: 4,
    },
  ];

  const [activeTab, setActiveTab] = React.useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [increment, setIncrement] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  const navigate = useNavigate();
  let differenceInDays = 0;
  if (startDate && endDate) {
    const differenceInTime = endDate.getTime() - startDate.getTime();
    differenceInDays = differenceInTime / (1000 * 3600 * 24);
  }
  const totalAmount = roomCount * Price * differenceInDays;

  const handleSatrtDate = (e) => {
    const selectedDate = new Date(e);
    setStartDate(selectedDate);
  };

  const handleEndDate = (e) => {
    const selectedDate = new Date(e);
    setEndDate(selectedDate);
  };

  const handleIncrement = () => {
    if (increment < RoomCount * 3) {
      setIncrement(increment + 1);
      if ((increment + 1) % 3 !== 0) {
        setRoomCount((Math.floor((increment + 1) / 3)) + 1);
      }
    } else if (increment === RoomCount * 3) {
      GenerateError("Room capacity is reached");
    }
  };
  const handleDecrement = () => {
    if (increment > 1) {
      setIncrement(increment - 1);
      if ((increment - 1) % 3 === 0 && increment > 3) {
        setRoomCount(roomCount - 1);
      }
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (startDate === null) {
      return GenerateError("select a start check in date");
    } else if (endDate === null) {
      return GenerateError("select a start check out date");
    }
    try {
      const response = await BookingDetails({
        totalAmount,
        roomCount,
        increment,
        startDate,
        endDate,
        _id,
      });
      if (response.data.status) {
        const updatedBookingData = response.data.id;
        navigate(`/booking`, { state: { bookingData: updatedBookingData } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    rating: null,
    description: "",
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RatingDescriptionSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await AddReview({ values, _id });
          if (response) {
            GenerateSuccess(response.data.message);
            setFetchAgain(true);
            resetForm();
          }
        } catch (err) {
          console.log(err);
        }
      },
    });

  const handleRatingChange = (newValue) => {
    handleChange({
      target: {
        name: "rating",
        value: newValue,
      },
    });
  };

  return (
    <>
      <SingleProperty props={Image} />
      <div className="grid grid-cols-5 grid-rows-5 py-5 gap-4">
        <div className="col-span-3 row-span-5">
          <Typography
            className="font-san font-normal text-4xl leading-10 tracking-tighter  m-0 mr-16 mb-3 text-[#1e1e1e]"
            variant="h3"
          >
            {PropertyName}
          </Typography>
          <Typography className="mb-5 font-normal text-gray-700 dark:text-gray-400">
            {City},{State}
          </Typography>
          <Typography className="font-normal text-sm leading-3 tracking-tighter text-[#959595]">
            Up to {GuestCount} Guests + {RoomCount} Rooms
          </Typography>
          <div className="group mt-10 inline-flex flex-wrap items-center gap-8 w-full">
            {matchingAmenities.map((item, index) => {
              const { content, icon } = item;
              return (
                <Tooltip key={index} content={content}>
                  <span className="cursor-pointer rounded-md border border-green-200 bg-gray-900/7 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    {icon}
                  </span>
                </Tooltip>
              );
            })}
          </div>
          <div className="pt-10">
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900" : ""}
                  >
                    {label === "Add Reviews"
                      ? reviewCheck?.length > 0
                        ? label
                        : null
                      : label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                <TabPanel value={activeTab}>
                  <div
                    style={{
                      display: activeTab !== null ? "block" : "none",
                    }}
                  >
                    {activeTab === 1 ? (
                      <div>
                        <div className="mb-3">
                          <Typography
                            variant="h3"
                            className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                          >
                            Explore Your Stay
                          </Typography>
                          <span>{Description}</span>
                        </div>
                        <div className="mb-3">
                          <Typography
                            variant="h3"
                            className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                          >
                            Amenities
                          </Typography>
                          <div className="flex gap-12">
                            {matchingAmenities.map((item, index) => {
                              return (
                                <div
                                  className="flex gap-3 items-center pt-3"
                                  key={index}
                                >
                                  <span className="cursor-pointer rounded-md border border-green-200 bg-gray-900/7 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                    {item.icon}
                                  </span>
                                  <span>{item.content}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div
                          className={`${
                            siglePropertyData?.Ratings?.length > 0
                              ? "newClass h-[300px] overflow-y-scroll"
                              : ""
                          } mb-3`}
                        >
                          <Typography
                            variant="h3"
                            className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                          >
                            Reviews
                          </Typography>
                          <div>
                            {siglePropertyData?.Ratings?.map((item, index) => {
                              return (
                                <article className="pb-3" key={index}>
                                  <div className="flex items-center mb-4">
                                    <img
                                      className="w-10 h-10 me-4 rounded-full"
                                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                      alt=""
                                    />
                                    <div className="font-medium dark:text-white">
                                      <p>
                                        {item.Users?.name}
                                        <time
                                          dateTime="2014-08-16 19:00"
                                          className="block text-sm text-gray-500 dark:text-gray-400"
                                        >
                                          {item.Users?.email}
                                        </time>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                    <Rating
                                      value={item?.ReviewRating}
                                      readonly
                                    />
                                  </div>
                                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                                    {item?.ReviewDescription}
                                  </p>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 2 ? (
                      <div>
                        <div className="mb-3">
                          <Typography
                            variant="h3"
                            className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                          >
                            Amenities
                          </Typography>
                          <div className="flex gap-12">
                            {matchingAmenities.map((item, index) => {
                              return (
                                <div
                                  className="flex gap-3 items-center pt-3"
                                  key={index}
                                >
                                  <span className="cursor-pointer rounded-md border border-green-200 bg-gray-900/7 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                    {item.icon}
                                  </span>
                                  <span>{item.content}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : activeTab === 3 ? (
                      <div
                        className={
                          siglePropertyData?.Ratings?.length > 0
                            ? `newClass h-[300px] overflow-y-scroll`
                            : ""
                        }
                      >
                        <Typography
                          variant="h3"
                          className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                        >
                          Reviews
                        </Typography>
                        <div>
                          {siglePropertyData?.Ratings?.map((item, index) => {
                            return (
                              <article className="pb-3" key={index}>
                                <div className="flex items-center mb-4">
                                  <img
                                    className="w-10 h-10 me-4 rounded-full"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                    alt=""
                                  />
                                  <div className="font-medium dark:text-white">
                                    <p>
                                      {item.Users?.name}
                                      <time
                                        dateTime="2014-08-16 19:00"
                                        className="block text-sm text-gray-500 dark:text-gray-400"
                                      >
                                        {item.Users?.email}
                                      </time>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                  <Rating value={item.ReviewRating} readonly />
                                </div>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  {item?.ReviewDescription}
                                </p>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    ) : activeTab === 4 && reviewCheck?.length > 0 ? (
                      <div className="mb-3">
                        <Typography
                          variant="h3"
                          className="py-5 cursor-pointer  text-gray-800 sm:text-xl sm:font-extralight"
                        >
                          Add Reviews
                        </Typography>
                        <div>
                          <form onSubmit={handleSubmit} action="">
                            <div className="mb-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                              >
                                Review Rating
                              </Typography>
                              <Rating
                                value={values.rating}
                                onChange={(newValue) =>
                                  handleRatingChange(newValue)
                                }
                                onBlur={handleBlur}
                              />
                              {touched.rating && errors.rating && (
                                <p className="pt-2 text-xs italic text-red-500">
                                  {errors.rating}
                                </p>
                              )}
                            </div>
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                              >
                                Review Description
                              </Typography>

                              <Textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full rounded-md h-[80px] border  border-gray-700"
                              />
                              {touched.description && errors.description && (
                                <p className="pt-2 text-xs italic text-red-500">
                                  {errors.description}
                                </p>
                              )}
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button type="submit">Add Review</Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div>{Description}</div>
                    )}
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
        <div className="col-span-2 row-span-5 col-start-4">
          <form onSubmit={handleDetailsSubmit} action="">
            <div className="h-[360px] bg-[#EDE3E3] px-5 py-5 shadow-lg rounded-md">
              <div className=" flex gap-3 items-center mt-2 mb-8">
                <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                  ₹ {Price}
                </h5>
                <span className="font-normal text-lg leading-3 tracking-tighter text-[#959595]">
                  Per night + Tax
                </span>
              </div>
              <div className="grid grid-cols-2 w-full rounded-none gap-6">
                <div className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
                  <div className="m-3">
                    <span className="text-gray-700">Check In</span>
                    <DatePicker
                      onChange={handleSatrtDate}
                      selected={startDate}
                      placeholderText="Check In"
                      className=" bg-white mt-1 hover:bg-gray-200 outline-none"
                      minDate={new Date()}
                      maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    />
                  </div>
                </div>
                <div className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
                  <div className="m-3">
                    <span className="text-gray-700">Check Out</span>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDate}
                      placeholderText="Check Out"
                      className=" bg-white hover:bg-gray-200 mt-1 outline-none "
                      minDate={
                        startDate
                          ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                          : null
                      }
                      maxDate={
                        startDate
                          ? new Date(
                              startDate.getTime() + 30 * 24 * 60 * 60 * 1000
                            )
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 w-full rounded-none  mt-5 gap-6">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm"
                >
                  <div className="m-3">
                    <span className="text-gray-700">No. of Guests</span>
                    <p className="mt-1">{increment} guests</p>
                  </div>
                </div>
                <div className="w-full h-[80px] bg-white rounded-md hover:bg-gray-200 shadow-sm">
                  <div className="m-3">
                    <span className="text-gray-700">No. of Rooms</span>
                    <p className="mt-1">{roomCount} rooms</p>
                  </div>
                </div>
              </div>
              {isOpen ? (
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center justify-center rounded-md  bg-white">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-900"
                    >
                      -
                    </button>
                    <span className="m-5">{increment}</span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : null}
              <h5 className="ont-san text-2xl mt-12 font-normal leading-6 tracking-tight text-[#1e1e1e]">
                Total Amount : ₹ {totalAmount}
              </h5>
            </div>
            <div className="w-full mt-5">
              <Button type="submit" className="w-full bg-black hover:bg-[#0c0c0cf8] leading-9" size="lg">
                Check Availability
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SinglePropertyDetails;
