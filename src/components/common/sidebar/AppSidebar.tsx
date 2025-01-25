"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useGetAllUserQuery } from "@/redux/api/userApi/userApi";
import { logout } from "@/service/auth.service";

import { Users } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Modal from "../modal/Modal";

export function AppSidebar() {
  const logoutUser = async () => {
    await logout();
  };

  const { data, error } = useGetAllUserQuery("");
  console.log(data, error);
  const groupRef = useRef<HTMLDivElement>(null);
  const singleRef = useRef<HTMLDivElement>(null);
  const toggleVisibility = (data: string) => {
    if (data === "group") {
      if (groupRef.current && singleRef.current) {
        groupRef.current.classList.remove("hidden");
        singleRef.current.classList.add("hidden");
      }
    }
    if (data === "single") {
      if (groupRef.current && singleRef.current) {
        groupRef.current.classList.add("hidden");
        singleRef.current.classList.remove("hidden");
      }
    }
  };

  return (
    <Dialog>
      <Sidebar className="  absolute left-0 ">
        <SidebarContent
          aria-describedby={undefined}
          className="bg-base-100 p-1"
        >
          <DialogTitle>
            <div className="flex justify-evenly pt-1 items-center">
              <Button className="" onClick={() => toggleVisibility("single")}>
                <Users></Users>
              </Button>{" "}
              <Button
                onClick={() => toggleVisibility("group")}
                className="flex gap-0"
              >
                <Users></Users> <Users></Users>
              </Button>
            </div>
          </DialogTitle>
          <hr />
          <div>
            <div ref={groupRef} className="hidden">
              <Modal data={data?.data || []}></Modal>
            </div>

            <div ref={singleRef}>
              <p className=" mb-2 rounded-md text-white p-1 w-full text-center bg-zinc-950">
                {" "}
                User List
              </p>
              {data?.data?.map((user) => (
                <Link
                  className="flex flex-col  bg-zinc-800 rounded-md my-2"
                  key={user._id}
                  href={`/${user._id}`}
                >
                  {" "}
                  <div className="flex   gap-2  p-2 items-center">
                    <div className="w-10 h-10 bg-white rounded-full"></div>
                    <p className="text-white"> {user.customer?.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SidebarContent>
        <Button className="" onClick={logoutUser}>
          Logout
        </Button>
      </Sidebar>
    </Dialog>
  );
}
