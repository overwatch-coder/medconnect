"use server";

import { handleApiError, hasField } from "@/lib/validations";
import {
  Conversation,
  ConversationChats,
  GetChatsResponse,
  MessageResponse,
  PostChatResponse,
} from "@/types/backend";
import axios from "axios";

// const baseUrl = process.env.AI_CHAT_URL!;
const baseUrl = "https://medconnect-ai.onrender.com";

export type ChatPatient = {
  name: string;
  age: number;
  gender: string;
  location: string;
};

// start chat with a patient
export const getChatDiagnosis = async (
  patient: ChatPatient,
  question: string,
  chatId?: string
) => {
  try {
    const chatData = {
      patient: patient,
      question: {
        text: question,
      },
    };

    const res = await axios.post(`${baseUrl}/chat`, chatData);

    if (res.status !== 200) {
      throw new Error("There was an error while generating the response");
    }

    const data = res.data as PostChatResponse;

    return getChatMessages(data.chatObjectId);
  } catch (error: any) {
    if (
      error?.response?.status === 500 &&
      hasField(error?.response?.data, "detail")
    ) {
      const data = error.response.data as {
        detail: string;
      };

      const answer =
        (data.detail.match(/AI:\s*(.*)$/m)?.[1].trim() as string) ||
        "Rate limit exceeded. Please try again later.";

      if (chatId) {
        const result = await getChatMessages(chatId);

        if (result.status) {
          return {
            status: true as const,
            message: "Response generated successfully",
            conversation: {
              ...result.conversation,
              chats: result.conversation?.chats?.concat([
                {
                  role: "user" as const,
                  chatId: chatId,
                  messageId: crypto.randomUUID(),
                  message: question,
                },
                {
                  role: "ai" as const,
                  chatId: chatId,
                  messageId: crypto.randomUUID(),
                  observation: [],
                  answer: answer,
                },
              ]),
            },
          };
        }
      }

      const randomId = crypto.randomUUID();

      return {
        status: true as const,
        message: "Response generated successfully",
        conversation: {
          id: randomId,
          chatObjectId: randomId,
          chats: [
            {
              role: "user" as const,
              chatId: randomId,
              messageId: crypto.randomUUID(),
              message: question,
            },
            {
              role: "ai" as const,
              chatId: randomId,
              messageId: crypto.randomUUID(),
              observation: [] as string[],
              answer: answer,
            } as ConversationChats,
          ],
        } as Conversation,
      };
    }

    return handleApiError(error);
  }
};

// get all chats
export const getChats = async () => {
  try {
    // Fetch all chats
    const res = await axios.get(`${baseUrl}/chats`);
    console.log("CHATS=========", res.data);
    if (res.status !== 200) {
      throw new Error("Could not fetch chats");
    }
    const allChats = res.data as GetChatsResponse[];

    return getFormattedConversations(allChats);
  } catch (error: any) {
    return handleApiError(error);
  }
};

// get messages from a chat by it's id
export const getChatMessages = async (chatId: string) => {
  try {
    const result = await axios.get(`${baseUrl}/messages/${chatId}`);

    if (result.status !== 200) {
      throw new Error("Could not fetch chat messages");
    }

    const chatMessages = result.data as MessageResponse[];

    // append the messages to the conversation
    const chatResults = await getChats();

    if (!chatResults.status) {
      return chatResults;
    }

    const selectedConvo = chatResults.conversations.filter(
      (conversation) => conversation.id === chatId
    )[0];

    const formattedMessages = chatMessages.map((message) => [
      {
        role: "user" as const,
        chatId: message.chatObjectId,
        messageId: message.id,
        message: message.question,
      },
      {
        role: "ai" as const,
        chatId: message.chatObjectId,
        messageId: message.id,
        observation: message.observation,
        answer: message.answer,
      },
    ]);

    selectedConvo.chats = formattedMessages[0] as ConversationChats[];

    return {
      status: true as const,
      message: "Response generated successfully!",
      conversation: {
        ...selectedConvo,
        chats:
          formattedMessages[0] !== undefined && formattedMessages[0].length > 0
            ? (formattedMessages[0] as ConversationChats[])
            : [],
      } as Conversation,
    };
  } catch (error: any) {
    return handleApiError(error);
  }
};

// format chat response to be used in the frontend
export const getFormattedConversations = async (
  allChats: GetChatsResponse[]
) => {
  const conversations: Conversation[] = allChats.map((chat) => ({
    ...chat,
    chatObjectId: chat.id,
    chats: [],
  }));

  return {
    status: true as const,
    message: "Response generated successfully!",
    conversations: conversations,
  };
};

// get chats with messages
export const getChatsWithMessages = async () => {
  try {
    const chats = await getChats();

    if (!chats.status) {
      return chats;
    }

    const chatWithMessagePromise = chats.conversations.map(async (chat) => {
      const messages = await getChatMessages(chat.id);

      if (!messages.status) {
        return messages;
      }

      return {
        ...chat,
        chats: (messages.conversation.chats as ConversationChats[]) || [],
        status: true as const,
        message: "Response generated successfully!",
      };
    });

    const chatsWithMessages = await Promise.all(chatWithMessagePromise);

    if (!chatsWithMessages[0].status) {
      return chatsWithMessages[0];
    }

    return {
      status: true as const,
      message: "Response generated successfully!",
      conversations: chatsWithMessages as Conversation[],
    };

    // Fetch all chats
  } catch (error: any) {
    return handleApiError(error);
  }
};
