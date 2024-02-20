// Import tailwind Component section
import { Card, Typography } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "./DestinationSwiper.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DestinationSwiper() {
  const [scroll, setScroll] = useState(0);
  const navigate = useNavigate()
  const scrollLeft = () => {
    const container = document.getElementById("scrollHandler");
    setScroll(scroll - container.offsetWidth * 0.4);
    container.scrollLeft -= container.offsetWidth * 0.4;
  };
  const scrollRight = () => {
    const container = document.getElementById("scrollHandler");
    setScroll(scroll + container.offsetWidth * 0.4);
    container.scrollLeft += container.offsetWidth * 0.4;
  };

  const destination = [
    {
      image:
        "https://images.unsplash.com/photo-1523544545175-92e04b96d26b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "Karnataka",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627370778723-4d26700cd972?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "Kerala",
    },
    {
      image:
        "https://images.unsplash.com/photo-1644332346869-f9982b271f9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "Nagaland",
    },
    {
      image:
        "https://images.unsplash.com/photo-1637043765564-a071ff91a09f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "Megalaya",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "kashmir",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625771271992-87f4351c8121?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      destionName: "Delhi",
    },
  ];

  return (
    <div className="main-sparation pb-8">
      <div className="contai-section">
        <div className="pb-6">
          <Typography className="text-[#1e1e1e] font-fmaily">
            popular Destination
          </Typography>
        </div>
        <div className="flex gap-6 overflow-x-auto scroll" id="scrollHandler">
          {destination.map((items, index) => {
            const { image, destionName } = items;
            return (
              <Card
                key={index}
                className=" w-[17rem] h-80 card mt-2 rounded-lg bg-cover bg-center  object-cover"
                style={{ backgroundImage: `url(${image}) ` }}
                onClick={() => navigate('/propertyList')}
              >
                <div className="w-[17rem] h-80 cardText flex flex-col justify-center items-center rounded-lg animate-showcontent">
                  <Typography
                    variant="h3"
                    className="text-white font-medium leading-[1.5]"
                  >
                    {destionName}
                  </Typography>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="flex justify-between">
          <ChevronLeftIcon
            className=" invisible md:visible h-10 w-10 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black -ms-5 -mt-44 z-30 border-2 border-blue-gray-200 cursor-pointer"
            onClick={scrollLeft}
          />
          <ChevronRightIcon
            className="invisible md:visible h-10 w-10 -mt-44 z-30 -me-5 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black border-2 border-blue-gray-200 cursor-pointer"
            onClick={scrollRight}
          />
        </div>
      </div>
    </div>
  );
}
