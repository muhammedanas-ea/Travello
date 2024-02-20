import { Button } from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { VerifyNotification } from "../../../api/AdminApi";
import { useNavigate } from "react-router-dom";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

export default function Notification() {
  const [nofitificationData, setstateNofitificationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const notificationData = async () => {
      try {
        const response = await VerifyNotification();
        if (response) {
          setstateNofitificationData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    notificationData();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-16">
        <div className="w-full grid grid-cols-1  sm:rounded-lg">
          <div className="w-full grid grid-cols-1 gap-5 items-center bg-[#e5e2e2]   md:flex-row">
            {nofitificationData.length > 0 ? (
              nofitificationData.map((item, index) => {
                const { propertOwner, _id } = item;
                return (
                  <Alert
                    key={index}
                    className="w-full"
                    icon={<Icon />}
                    action={
                      <Button
                        variant="text"
                        color="white"
                        size="sm"
                        className="!absolute top-3 right-3"
                        onClick={() =>
                          navigate(`/admin/viewdetail`, { state: { _id } })
                        }
                      >
                        view details
                      </Button>
                    }
                  >
                    {propertOwner.name} send a property verification requst
                  </Alert>
                );
              })
            ) : (
              <div className="w-full h-[80vh] flex justify-center items-center">
                <p>No Notifications Right Now !</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
