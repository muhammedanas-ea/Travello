import { Carousel, Button, Typography } from "@material-tailwind/react";

// Import Image of slider
import sliderImg1 from "../../../../public/staticImages/property-signin.webp";
import sliderImg2 from "../../../../public/staticImages/property-signin.webp";

//Import style
import "./Slider.css";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const sliderDetails = [
    {
      image: sliderImg1,
      text: "Let’s find the best resort for your vacation",
      buttonText: "Discover more",
    },
    {
      image: sliderImg2,
      text: "The Beauty of Nature",
      buttonText: "Best rated",
    },
  ];

  const navigate = useNavigate()

  return (
    <Carousel>
      {sliderDetails.map((item, index) => {
        const { image, text, buttonText } = item;
        return (
          <div key={index} className="relative h-screen w-full">
            <img
              src={image}
              alt="image 1"
              className="h-screen w-full object-cover"
            />
            <div className="absolute inset-0 grid h-screen w-full place-items-center bg-black/75">
              <div className="w-3/4 text-center md:w-2/4 pt-10">
                <Typography
                  variant="small"
                  color="white"
                  className="mb-9 tracking-wide text-3xl md:text-4xl lg:text-5xl"
                >
                  {text}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Button
                    className="border-solid tracking-wide rounded-md border border-[#fff] transition ease-in-out delay-10 bg-[#00000070]  hover:bg-[#000] hover:border-[#0c0c0c] hover:text-white duration-20"
                    size="md"
                    color="white"
                    variant="text"
                    onClick={() => navigate('/propertyList')}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
