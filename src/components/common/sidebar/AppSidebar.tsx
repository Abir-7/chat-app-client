"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useGetAllUserQuery } from "@/redux/api/userApi/userApi";
import { logout } from "@/service/auth.service";

import { Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "../modal/Modal";
import { useGetUserGroupQuery } from "@/redux/api/chatApi/chatApi";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export function AppSidebar() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const type = searchParams.get("type");
  console.log("type", type);
  const logoutUser = async () => {
    await logout();
  };
  const { chatOrUserId } = useAppSelector((state) => state.chat);
  const { data: groups } = useGetUserGroupQuery(null);

  const { data, error } = useGetAllUserQuery("");
  console.log(data, error);
  const [selectedTab, setSelectedTab] = useState(type || "single");
  console.log(selectedTab);

  return (
    <Dialog>
      <Sidebar className="  absolute left-0 pb-4 ">
        <SidebarContent
          aria-describedby={undefined}
          className="bg-base-100 p-1"
        >
          {/* tab */}
          <DialogTitle>
            <div className="flex justify-evenly pt-1 items-center">
              <Button
                className={`${
                  selectedTab === "single"
                    ? "bg-zinc-300 hover:text-white text-black"
                    : ""
                } flex gap-0`}
                onClick={() => setSelectedTab("single")}
              >
                <Users></Users>
              </Button>{" "}
              <Button
                className={`${
                  selectedTab === "group"
                    ? "bg-zinc-300 hover:text-white text-black"
                    : ""
                } flex gap-0`}
                onClick={() => setSelectedTab("group")}
              >
                <Users></Users> <Users></Users>
              </Button>
            </div>
          </DialogTitle>
          <hr />
          <div>
            {/* sidebar group chat */}
            {selectedTab === "group" && (
              <div className="">
                <Modal data={data?.data || []}></Modal>
                <div className="text-center font-semibold mt-1">Group List</div>
                <hr />
                <div className="my-2 flex  flex-col gap-2">
                  {groups?.data?.map((group) => (
                    <Link key={group._id} href={`/${group._id}?type=group`}>
                      <div>
                        <div
                          className={`text-lg rounded-lg font-bold text-center py-2 ${
                            chatOrUserId === group._id
                              ? "text-white bg-zinc-400"
                              : "bg-zinc-950 text-white"
                          }`}
                        >
                          <div>{group.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* sidebar single chat */}
            {selectedTab === "single" && (
              <div>
                <p className=" mb-2 rounded-md text-white p-1 w-full text-center bg-zinc-950">
                  {" "}
                  User List
                </p>
                {data?.data?.map((user) => (
                  <Link
                    className={`flex flex-col   rounded-md my-2 ${
                      chatOrUserId === user?._id
                        ? "bg-zinc-400 text-black"
                        : "bg-zinc-950"
                    }`}
                    key={user._id}
                    href={`/${user._id}?type=single`}
                  >
                    {" "}
                    <div className="flex   gap-2  p-2 items-center">
                      <div className="w-10 h-10 bg-white rounded-full"></div>
                      <p className="text-white"> {user.customer?.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </SidebarContent>
        <div className="w-full px-1">
          <Button className="w-full" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      </Sidebar>
    </Dialog>
  );
}
