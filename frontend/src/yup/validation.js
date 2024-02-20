import * as Yup from "yup";
const imageFormats = ["image/jpeg","image/jpg", "image/png"];

export const SignupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter Your Name"),
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email"),
  password: Yup.string().min(6).required("Please enter password"),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email"),
  password: Yup.string().min(6).required("Please enter password"),
});

export const ForgotSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email"),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
  conformPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const AdminLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email"),
  password: Yup.string().min(4).required("Please enter password"),
});

export const RatingDescriptionSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Please enter a rating"),
    description: Yup.string()
    .max(1000, "Description must be at most 1000 characters")
    .required("Please enter a description"),
});

export const PropertySignupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!").trim()
    .required("Please Enter Your Name"),
  number: Yup.number().min(10).required("please enter your number"),
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email"),
  password: Yup.string().min(6).required("Please enter password"),
});

export const EditPropertySchema = Yup.object({
  propertyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number().min(0).required("please enter price"),
  room: Yup.string().min(0).required("please enter room"),
  gust: Yup.string().min(0).required("please enter gust"),
  state: Yup.string().required("please enter state"),
  location: Yup.string().required("please enetr location"),
  propertyType: Yup.string().required("please enter property type"),
  number: Yup.number().min(10).required("please enter your number"),
  amenities: Yup.array()
    .of(Yup.string())
    .required("Select at least one amenity"),
  describe: Yup.string().required("write your discrption"),
});
export const AddPropertySchema = Yup.object({
  propertyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number().min(0).required("please enter price"),
  room: Yup.string().min(0).required("please enter room"),
  gust: Yup.string().min(0).required("please enter gust"),
  state: Yup.string().required("please enter state"),
  location: Yup.string().required("please enetr location"),
  propertyType: Yup.string().required("please enter property type"),
  number: Yup.number().min(10).required("please enter your number"),
  amenities: Yup.array()
    .of(Yup.string())
    .required("Select at least one amenity"),
  describe: Yup.string().required("write your discrption"),
  image: Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      console.log(value);
      if (value) {
        return imageFormats.includes(value.type);
      }
      return true;
    })
});

export const userProfileSchema =Yup.object({
  name: Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Please Enter Your Name"),
  email:Yup.string()
  .email("please enter valied email")
  .required("please enter your email"),
  number: Yup.number().min(10).required("please enter your number"),
  houseName: Yup.string().required("Please Enter Your house name"),
  state: Yup.string().required("Please Enter Your state"),
  city: Yup.string().required("Please Enter Your city")
})

export const CheckInDetailSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!").trim()
    .required("Please Enter Your Name"),
  number: Yup.number().min(10).required("please enter your number"),
  email: Yup.string()
    .email("please enter valied email")
    .required("please enter your email"),
});