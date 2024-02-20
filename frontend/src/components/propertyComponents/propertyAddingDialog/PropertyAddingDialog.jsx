import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { GetState } from "react-country-state-city";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import { AddPropertySchema } from "../../../yup/validation";
import { AddProperty } from "../../../api/PropertyApi";
import { GenerateSuccess } from "../../../toast/Toast";

// eslint-disable-next-line react/prop-types
export default function PropertyAddingDialog({onDataUpdate}) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOpen = () => setOpen(!open);

  const initialValues = {
    propertyName: "",
    price: "",
    room: "",
    gust: "",
    state: "",
    location: "",
    propertyType: "",
    number: "",
    amenities: [],
    describe: "",
    images: [],
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddPropertySchema,
    onSubmit: async (values,{resetForm}) => {
      try {
        const formData = new FormData();
        formData.append("propertyName", values.propertyName);
        formData.append("price", values.price);
        formData.append("room", values.room);
        formData.append("gust", values.gust);
        formData.append("state", values.state);
        formData.append("location", values.location);
        formData.append("propertyType", values.propertyType);
        formData.append("number", values.number);
        formData.append("describe", values.describe);

        for (let i = 0; i < values.amenities.length; i++) {
          formData.append("amenities", values.amenities[i]);
        }
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }

        const response = await AddProperty(formData);
        if (response.data.status) {
          resetForm(initialValues)
          GenerateSuccess(response.data.message);
          onDataUpdate(true)
          handleOpen();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFieldValue("images", selectedFiles);
  };

  useEffect(() => {
    GetState(101).then((result) => {
      setState(result);
    });
  }, []);

  const options = [
    { value: "wifi", label: "wifi" },
    { value: "petSpace", label: "petSpace" },
    { value: "pool", label: "pool" },
    { value: "bathtub", label: "bathtub" },
  ];

  const handleMultipleChange = (selectedOptions) => {
    setFieldValue(
      "amenities",
      selectedOptions.map((option) => option.value)
    );
    setSelectedOptions(selectedOptions);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Property
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="">Its a simple dialog.</DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <DialogBody className="max-h-[400px] overflow-y-auto">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Property name
              </Typography>
              <Input
                type="text"
                name="propertyName"
                value={values.propertyName}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              {touched.propertyName && errors.propertyName && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.propertyName}
                </p>
              )}
            </div>

            <div className="my-3">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium "
              >
                Per head rate
              </Typography>

              <Input
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              {touched.price && errors.price && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.price}
                </p>
              )}
              <div className="my-4 grid grid-cols-2  gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Number for rooms
                  </Typography>
                  <Input
                    type="text"
                    name="room"
                    value={values.room}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {touched.room && errors.room && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.room}
                    </p>
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Maximum guest capacity
                  </Typography>
                  <Input
                    type="text"
                    name="gust"
                    value={values.gust}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {touched.gust && errors.gust && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.gust}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-4 grid grid-cols-2  gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Select your property state
                  </Typography>
                  <select
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a state</option>
                    {state.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {touched.state && errors.state && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.state}
                    </p>
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Select your property location
                  </Typography>
                  <Input
                    type="text"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {touched.location && errors.location && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2  gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Select your property type
                  </Typography>
                  <select
                    name="propertyType"
                    value={values.propertyType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="lowToHigh">Villa</option>
                    <option value="highToLow">Cottage</option>
                    <option value="highToLow">Resort</option>
                    <option value="highToLow">Homestay</option>
                  </select>
                  {touched.propertyType && errors.propertyType && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.propertyType}
                    </p>
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Mobile number
                  </Typography>
                  <Input
                    type="text"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  {touched.number && errors.number && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.number}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Amenities
              </Typography>
              <Select
                options={options}
                onChange={handleMultipleChange}
                value={selectedOptions}
                isMulti={true}
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Add property images
              </Typography>
              <Input
                type="file"
                accept="image/*"
                className=" !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                multiple
                onChange={handleImageChange}
              />
               {touched.images && errors.images && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.images}
                    </p>
                  )}
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Describe your property
              </Typography>
              <Textarea
                name="describe"
                value={values.describe}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.describe && errors.describe && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.describe}
                </p>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
