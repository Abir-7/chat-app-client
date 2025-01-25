/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import { FormWrapper } from "@/components/common/Form/FormWrapper";
import InputField from "@/components/common/Form/InputField";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import io from "socket.io-client";
interface IMessage {
  message: string;
}

const defaultValue: IMessage = { message: "" };

const UserChat = ({ params }: { params: { id: string } }) => {
  const reciverId = params?.id;
  const { user } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<
    { senderId: string; message: string }[]
  >([]);
  const socket = io("http://localhost:3500");
  useEffect(() => {
    // Register the current user with socket
    if (user) {
      socket.emit("register", user.userId);
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      // Only update state if the message is for this user
      if (data.senderId === reciverId || data.senderId === user?.userId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [reciverId, user]);

  const onSubmit = async (data: IMessage) => {
    const senderId = user?.userId;
    const receiverId = reciverId;
    const message = data.message;
    if (senderId && receiverId) {
      socket.emit("sendMessage", { senderId, receiverId, message });
      setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className="flex flex-col relative"
    >
      <div className="flex flex-col h-screen">
        {/* Chat Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {" "}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderId === user?.userId ? "sent" : "received"
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        {/* Chat Messages Area End */}
      </div>
      <hr />
      <div>
        <FormWrapper<IMessage> defaultValues={defaultValue} onSubmit={onSubmit}>
          <div className="flex items-center gap-3">
            <div className="flex-grow mt-3">
              <InputField label="" name="message" />
            </div>
            <Button>
              <Send />
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default UserChat;
