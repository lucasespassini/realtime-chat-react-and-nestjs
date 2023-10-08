import { useQuery } from "react-query";
import { api } from "../services/api";

export type Conversation = {
  cvt_ulid: string;
  messages: {
    msg_content: string;
    msg_date_send: string;
  }[];
  conversation_participants: {
    users: {
      usr_ulid: string;
      usr_username: string;
      usr_socket_id?: string;
    };
  }[];
};

type ConversationsResponse = {
  conversations: Conversation[];
};

const getConversations = async (): Promise<ConversationsResponse> => {
  const { data: conversations } = await api.get("/chat/conversations");

  return { conversations };
};

export const useConversationsQuery = () => {
  return useQuery(["conversations"], () => getConversations(), {
    staleTime: 30000,
  });
};
