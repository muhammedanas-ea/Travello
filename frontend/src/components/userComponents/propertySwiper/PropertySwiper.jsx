import { Typography, Button } from "@material-tailwind/react";
import "./PropertySwiper.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PropertySwiperData } from "../../../api/UserApi";
import { GenerateError } from "../../../toast/Toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PropertySwiper() {
  const navigate = useNavigate();
  const [bestRated,setBestRated] = useState([])

  const fecthData = async () =>{
    const response = await PropertySwiperData()
    if(response){
      setBestRated(response.data)
    }
  }

  useEffect(() =>{
    fecthData()
  },[])

  const [scroll,setScroll] = useState(0)
  const propertyScrollLeft = () =>{
    const container = document.getElementById("propertyScrollHandler")
    setScroll(scroll - container.offsetWidth * 0.4)
    container.scrollLeft -= container.offsetWidth * 0.4
  }
  const propertyScrollRight = () =>{
    const container = document.getElementById("propertyScrollHandler")
    setScroll(scroll + container.offsetWidth * 0.4)
    container.scrollLeft += container.offsetWidth * 0.4
  }
 
  return (
    <div className="main-sparation">
      <div className="contai-section">
        <div className="pb-6">
          <Typography className="text-[#1e1e1e] font-fmaily">
            Best rated
          </Typography>
        </div>
        <div className="flex gap-5 overflow-x-auto propertyScroll" id="propertyScrollHandler">
          {bestRated && bestRated.map((item, index) => {
            const { Image, PropertyName, State, Price, City , _id} = item;

            return (
             
                <div key={index} className=" sahdow flex-shrink-0 mt-5 max-w-[300px] shadow-lg transition-transform  hover:scale-105 duration-300 bg-white border border-[#00000027] rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className="rounded-t-lg object-fill w-full h-44"
                      src={
                        Image
                          ? `${import.meta.env.VITE_USER_URL}/files/${Image[0]}`
                          : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                      }
                      alt=""
                    />
                  </a>
                  <div className="p-5 mt-[2.5]">
                    <a href="#">
                      <h6 className="font-san mb-1 text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                        {PropertyName}
                      </h6>
                    </a>
                    <p className="font-normal text-xs text-[#959595]">
                      {State},{City}
                    </p>
                    <div className="mt-7 flex justify-between items-center">
                      <div>
                        <h5 className="ont-san text-lg font-normal leading-6 tracking-tight text-[#1e1e1e]">
                          ₹ {Price}
                        </h5>
                        <span className="font-normal text-xs leading-3 tracking-tighter text-[#959595]">
                          Per night + Tax
                        </span>
                      </div>
                      <div className="pt-3 sm:pt-0">
                        <Button
                          className="h-10 border-solid rounded-md border border-[#000] transition ease-in-out delay-10  hover:bg-[#000] hover:text-white duration-20"
                          size="sm"
                          variant="text"
                          onClick={() => {
                            if (localStorage.getItem("userToken")) {
                              navigate(`/singleproperty`, { state: { _id } });
                            } else {
                              GenerateError("you must be need to  login");
                            }
                          }}
                        >
                          View property
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              
            );
          })}
        </div>
        <div className="flex justify-between">
          <ChevronLeftIcon className=" invisible md:visible h-10 w-10 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black -ms-5 -mt-44 z-30 border-2 border-blue-gray-200 cursor-pointer" onClick={propertyScrollLeft}/>
          <ChevronRightIcon className="invisible md:visible h-10 w-10 -mt-44 z-30 -me-5 rounded-lg bg-[#0000008a] text-blue-gray-200 hover:bg-black border-2 border-blue-gray-200 cursor-pointer" onClick={propertyScrollRight}/>
        </div>
      </div>
    </div>
  );
}
