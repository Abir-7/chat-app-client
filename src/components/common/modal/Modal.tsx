import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IUser } from "@/interface/users/user.interface";
import Image from "next/image";

const Modal = ({ data }: { data: IUser[] }) => {
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
            <Input placeholder="Group Name"></Input>
            <p className="my-2">Select Users</p>
            <div className="flex flex-wrap gap-3 mb-3">
              {data.map((user) => (
                <div key={user._id}>
                  <div className="flex items-center gap-1">
                    <Checkbox />
                    <Image
                      className="w-8 h-8 object-cover rounded-full"
                      width={100}
                      height={100}
                      alt=""
                      src={`http://localhost:3500/${user.customer?.image}`}
                    ></Image>
                    <div>{user.customer?.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full">Create</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
