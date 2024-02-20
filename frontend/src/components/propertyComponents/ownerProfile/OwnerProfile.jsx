// import React from 'react';

import { useSelector } from "react-redux";


function OwnerProfile() {
  const { ownerInfo } = useSelector((state) => state.owner);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-16">
        <div className="w-full grid grid-cols-1  sm:rounded-lg">
          <div className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="p-3 ">
              <img
                className="object-cover w-full rounded-t-lg h-36 md:w-36 md:rounded-none md:rounded-l-lg"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt=""
              />
            </div>
            <div className="p-3 leading-normal">
              <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ownerInfo.name}
              </h5>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                {ownerInfo.email}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {ownerInfo.number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerProfile;
