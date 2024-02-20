import { Button, Chip } from "@material-tailwind/react";
import PropertyAddingDialog from "../propertyAddingDialog/PropertyAddingDialog";
import { useEffect, useState } from "react";
import { ListProperty } from "../../../api/PropertyApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OwnerPropertyLIst() {
  const { ownerInfo } = useSelector((state) => state.owner);
  const [PropertyList, setPropertyList] = useState([]);
  const [child, setChild] = useState();
  const navigate = useNavigate()

  const onDataUpdate = (data) => {
    setChild(data);
  };

  const id = ownerInfo.id

  useEffect(() => {
    const showPropertyData = async () => {
      try {
        const response = await ListProperty(id);
        if (response.data.status) {
          setPropertyList(response.data.propertyData);
          setChild(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showPropertyData();
  }, [id, child]);

  return (
    <div className="px-4 pb-5 sm:ml-64">
      <div className="px-4 rounded-md dark:border-gray-700">
        <div className="w-full grid grid-cols-1  bg-white border border-gray-200 rounded-lg shadow">
          <div className="p-5 flex justify-end">
            <PropertyAddingDialog onDataUpdate={onDataUpdate} />
          </div>
          <div className="p-3 px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {PropertyList.map((items, index) => {
              const {
                Image,
                PropertyName,
                State,
                City,
                Price,
                Is_approve,
                _id
              } = items;
              return (
                <div
                  key={index}
                  className="max-w-sm  bg-white   border border-[#00000027] rounded-md  dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <img
                      className="object-fill h-[210px] w-full rounded-t-md"
                      src={
                        Image
                          ? `${import.meta.env.VITE_USER_URL}/files/${Image[0]}`
                          : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                      }
                      alt=""
                    />
                    {console.log(`${import.meta.env.VITE_USER_URL}/files/${Image[0]}`,'image')}
                  </div>
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={Is_approve ? "approved" : "rejected"}
                    color={Is_approve ? "green" : "red"}
                    className="rounded-none"
                  />
                  <div className="p-5">
                    <h6 className="font-san mb-1 text-xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                      {PropertyName}
                    </h6>
                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                      {City},{State}
                    </p>
                   
                    <div className="mt-4">
                      <hr className="border-1 border-gray-400" />
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <div>
                        <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
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
                          onClick={() =>
                            navigate(`/property/propertydetails`, { state: { _id } })
                          }
                        >
                          View details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
