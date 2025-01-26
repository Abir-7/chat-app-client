import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { IUser } from "@/interface/users/user.interface";
import { useCreateGroupMutation } from "@/redux/api/chatApi/chatApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Modal = ({ data }: { data: IUser[] }) => {
  const groupNameRef = useRef<HTMLInputElement>(null);
  const { user } = useAppSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [createUserGroup] = useCreateGroupMutation();

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    console.log(id);

    setSelectedUsers((prev) => {
      if (isChecked) {
        // Add the user ID if it's checked
        return [...prev, id];
      } else {
        // Remove the user ID if it's unchecked
        return prev.filter((userId) => userId !== id);
      }
    });
  };
  console.log(selectedUsers);
  const createGroup = async (creatorId: string) => {
    if (groupNameRef.current?.value) {
      const data = {
        name: groupNameRef.current?.value,
        users: selectedUsers,
        creatorId,
      };
      const res = await createUserGroup(data);
      console.log(res);
      if (res?.data?.success) {
        toast.success("group created");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="w-full bg-gray-950 p-1 text-white rounded-md"
      >
        Create Group
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="p-2">
            <Input ref={groupNameRef} placeholder="Group Name"></Input>
            <div className="my-2">Select Users</div>
            <div className="flex flex-wrap gap-3 mb-3">
              {data?.map((user) => (
                <div key={user._id}>
                  <div className="flex items-center gap-1">
                    <Input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(
                          user._id,
                          (e.target as HTMLInputElement).checked
                        )
                      }
                    />
                    <Image
                      className="w-8 h-8 object-cover rounded-full"
                      width={100}
                      height={100}
                      alt=""
                      src={`${config.backendBaseUrl}/${user.customer?.image}`}
                    ></Image>
                    <div>{user.customer?.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => createGroup(user?.userId ? user.userId : "")}
              className="w-full"
            >
              Create
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
