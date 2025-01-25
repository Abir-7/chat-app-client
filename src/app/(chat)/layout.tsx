import { AppSidebar } from "@/components/common/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-screen-2xl relative overflow-hidden h-screen ">
      <SidebarProvider>
        <AppSidebar />

        <div className=" w-full p-1 h-screen">
          <div className="bg-zinc-950 flex gap-2 p-4 text-white">
            <SidebarTrigger /> <h2 className="text-xl">Chat Room</h2>
          </div>
          <div className="">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
