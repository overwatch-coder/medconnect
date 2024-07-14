import { ChatPayload, Convo, Message, QuestionPayload } from "@/types/backend";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from ".";

export const baseChatUrl = "https://medconnect-ai.onrender.com";

export const useConvos = (isMessages: boolean = false) => {
  const [user] = useAuth();

  const [chats, setChats] = useState<Convo[]>();
  const [filteredChats, setFilteredChats] = useState<Convo[]>();
  const [isLoadedChats, setIsLoadedChats] = useState<boolean>(false);
  const handleGetChats = async () => {
    try {
      console.log("User", user);
      const res = await axios.get(
        `${baseChatUrl}/chats/user/${user?.staff?.chpsCompoundId}`
      );
      if (res.status == 200) {
        setChats(res.data);
        setFilteredChats(res.data)
      }
    } catch (error) {
      console.log("XYZ", error);
    } finally {
      setIsLoadedChats(true);
    }
  };

  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadedMessages, setIsLoadedMessages] = useState<boolean>(false);
  const handleGetMessages: () => void = async () => {
    try {
      setIsLoadedMessages(false);
      const res = await axios.get(`${baseChatUrl}/messages/${chatId}`);
      if (res.status == 200) {
        setMessages(res.data);
        console.log("MSGZ", res.data);
      }
    } catch (error) {
      console.log("XYZ", error);
    } finally {
      setIsLoadedMessages(true);
    }
  };

  const [selectedChat, setSelectedChat] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSendMessage = async (data: QuestionPayload, chatId: string) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post(`${baseChatUrl}/message/${chatId}`, data);
      if (res.data) {
        setMessages((prev) => [...messages, res.data]);
        console.log("MESSAGE", res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isMessages) handleGetChats();
    else handleGetMessages();
  }, [isMessages, chatId]);

  return {
    chats,
    setChats,
    isLoadedChats,
    selectedChat,
    setSelectedChat,
    messages,
    isLoadedMessages,
    handleSendMessage,
    isSubmitting,
    setFilteredChats,
    filteredChats
  };
};
