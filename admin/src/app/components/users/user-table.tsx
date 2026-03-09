"use client";
import React from "react";
import { useGetAllUsersQuery } from "@/redux/user/userApi";
import ErrorMsg from "../common/error-msg";
import dayjs from "dayjs";

const UserTable = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (!isLoading && isError) {
    return <ErrorMsg msg="There was an error" />;
  }

  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md mt-8">
      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[975px] 2xl:w-full">
          <table className="w-full text-base text-left text-gray-500">
            <thead>
              <tr className="border-b border-gray6 text-tiny">
                <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                  Name
                </th>
                <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold">
                  Email
                </th>
                <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold text-end">
                  Phone
                </th>
                <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold text-end">
                  Status
                </th>
                <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold text-end">
                  Registered At
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                >
                  <td className="pr-8 py-5 whitespace-nowrap font-medium text-heading">
                    {user.name}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B]">
                    {user.email}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {user.phone || "-"}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    <span className="text-[11px] text-success bg-success/10 px-3 py-1 rounded-md leading-none font-medium">
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {user.createdAt
                      ? dayjs(user.createdAt).format("MMM D, YYYY")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-4">
        <p className="mb-0 text-md border border-gray6 px-2 py-1 rounded-md">
          Total customers: {users?.length ?? 0}
        </p>
      </div>
    </div>
  );
};

export default UserTable;

