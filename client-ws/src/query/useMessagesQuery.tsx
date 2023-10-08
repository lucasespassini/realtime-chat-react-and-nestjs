import { useQuery } from "react-query";
import { api } from "../services/api";

export type Message = {
  msg_content: string;
  msg_read: boolean;
  msg_date_send: string;
  users: {
    usr_ulid: string;
    usr_username: string;
  };
};

type MessagesResponse = {
  messages: Message[];
};

const getMessages = async (cvt_ulid: string): Promise<MessagesResponse> => {
  const { data: messages } = await api.get(`/chat/messages/${cvt_ulid}`);

  return { messages };
};

export const useMessagesQuery = (cvt_ulid: string) => {
  return useQuery(["messages", { cvt_ulid }], () => getMessages(cvt_ulid), {
    staleTime: 30000,
    enabled: !!cvt_ulid,
  });
};
