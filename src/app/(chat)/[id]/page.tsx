/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import { FormWrapper } from "@/components/common/Form/FormWrapper";
import InputField from "@/components/common/Form/InputField";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { useGetMessageQuery } from "@/redux/api/messageApi/messageApi";
import { setChatOrUserId } from "@/redux/features/chatSlice";

interface IMessage {
  message: string;
}

const defaultValue: IMessage = { message: "" };

// Singleton socket connection outside the component
const socket = io("http://localhost:3500");

const UserChat = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const reciverId = params?.id;
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Fetch messages based on the type
  const { data } = useGetMessageQuery(
    type === "group"
      ? { chatId: reciverId, receiverId: "", senderId: "" }
      : {
          chatId: "",
          receiverId: reciverId || "",
          senderId: user?.userId || "",
        },
    { refetchOnMountOrArgChange: true }
  );

  const [messages, setMessages] = useState<
    { sender: { _id: string; name: string }; content: string }[]
  >([]);

  // Handle new incoming message
  const handleNewMessage = useCallback(
    (newMessage: {
      sender: { _id: string; name: string };
      content: string;
      receiverId: string;
    }) => {
      console.log(
        user?.userId === newMessage.receiverId,
        reciverId === newMessage.sender._id,
        reciverId,
        newMessage.receiverId,
        newMessage.sender,
        user?.userId
      );
      if (
        user?.userId === newMessage.receiverId &&
        reciverId === newMessage.sender._id
      ) {
        console.log(newMessage, "gg");
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: newMessage.sender, content: newMessage.content },
        ]);
      }
    },
    []
  );

  // Handle new group message
  const handleNewGroupMessage = useCallback(
    (groupMessage: {
      chat: string;
      sender: { _id: string; name: string };
      content: string;
    }) => {
      if (groupMessage.chat === reciverId) {
        setMessages((prevMessages) => [...prevMessages, groupMessage]);
      }
    },
    [reciverId]
  );

  useEffect(() => {
    if (reciverId) {
      dispatch(setChatOrUserId(reciverId));
    }
    if (type === "single" && user) {
      socket.emit("register", user.userId);
      socket.on("receiveMessage", handleNewMessage);
    }

    if (type === "group") {
      socket.emit("joinGroup", reciverId);
      socket.on("receiveGroupMessage", handleNewGroupMessage);
    }

    // Cleanup socket event listeners on component unmount
    return () => {
      socket.off("receiveMessage", handleNewMessage);
      socket.off("receiveGroupMessage", handleNewGroupMessage);
    };
  }, [user, type, reciverId, handleNewMessage, handleNewGroupMessage]);

  useEffect(() => {
    if (data?.data) {
      const messages = data.data.map((message: any) => {
        return {
          sender: {
            _id: message.sender._id,
            name:
              user?.userId === message.sender._id
                ? "You"
                : message.sender.customer.name,
          },
          content: message.content,
        };
      });
      setMessages(messages);
      console.log(data.data, "dsd");
    }
  }, [data]);
  // Submit message
  const onSubmit = async (data: IMessage) => {
    const senderId = user?.userId;

    if (type === "single" && senderId && reciverId) {
      socket.emit("sendMessage", {
        senderId,
        receiverId: reciverId,
        message: data.message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: { _id: senderId, name: "you" }, content: data.message },
      ]);
    }

    if (type === "group" && senderId) {
      socket.emit("sendMessageToGroup", {
        chat: reciverId,
        sender: senderId,
        content: data.message,
      });
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className="flex flex-col relative"
    >
      <div
        style={{ height: "calc(100vh - 132px)" }}
        className="flex flex-col  "
      >
        {/* Chat Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages?.map((msg, index) => (
            <div key={index}>
              <div
                className={`message p-3 rounded-lg max-w-xs ${
                  msg.sender._id === user?.userId
                    ? "bg-zinc-950 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div className="text-xs font-semibold">{msg.sender?.name}</div>
                <div>{msg.content}</div>
              </div>
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
