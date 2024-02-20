import { AgChartsReact } from "ag-charts-react";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardData } from "../../../api/PropertyApi";
import moment from "moment";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState();
  const { ownerInfo } = useSelector((state) => state.owner);
  const proprtyId = ownerInfo.id

  const fetchDashboardData = async () => {
    try {
      const response = await DashboardData(proprtyId);
      if (response) {
        setDashboardData(response.data);
        setOptions((prevOptions) => ({
          ...prevOptions,
          data: [
            {
              year: moment(response.data.firstDate).format("MMM"),
              avgTemp: 2.3,
              propertyBookings: response.data.newYearTotalSales,
            },
            {
              year: moment(response.data.startDate).format("MMM"),
              avgTemp: 6.3,
              propertyBookings: response.data.secondYearTotalSales,
            },
            {
              year: moment(response.data.thirdDate).format("MMM"),
              avgTemp: 16.2,
              propertyBookings: response.data.thirdYearTotalSales,
            },
          ],
        }));
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [proprtyId]);

  const [options, setOptions] = useState({
    data: [],
    series: [
      {
        type: "bar",
        xKey: "year",
        yKey: "propertyBookings",
        fills: ["#3366cc"],
        strokes: ["#ffffff"],
      },
    ],
    legend: {
      enabled: true,
      position: "bottom",
    },
  });

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  h-screen  dark:border-gray-700 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className=" flex  items-center gap-4 shadow-lg h-24 rounded bg-gray-50 dark:bg-gray-800">
            <div className="w-1/3 h-full flex items-center rounded-l justify-center bg-blue-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[2.5rem]  h-[2.5rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-600">
                {dashboardData && dashboardData.uniqueUser}
              </h1>
              <h1 className="uppercase font-bold mt-2 text-gray-800">
                total booking user
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 shadow-lg h-24 rounded bg-gray-50 dark:bg-gray-800">
            <div className="w-1/3 h-full flex items-center rounded-l justify-center bg-blue-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[2.5rem] h-[2.5rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-600">
                {dashboardData && dashboardData.bookings}
              </h1>
              <h1 className="uppercase font-bold mt-2 text-gray-800">
                total bookings
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 shadow-lg h-24 rounded bg-gray-50 dark:bg-gray-800">
            <div className="w-1/3 h-full flex items-center rounded-l justify-center bg-blue-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[2.5rem] h-[2.5rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-600">
                {dashboardData && dashboardData.totalSales}
              </h1>
              <h1 className="uppercase font-bold mt-2 text-gray-800">
                total sales
              </h1>
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded p-3  w-1/2 h-[65%]  bg-white">
          <AgChartsReact options={options} />
        </div>
      </div>
    </div>
  );
}

