import { useQuery } from "react-query";
import { api } from "../services/api";
import { SocketUser } from "../constants/Types";

type UsersResponse = {
  users: SocketUser[];
};

const getUsers = async (): Promise<UsersResponse> => {
  const { data: users } = await api.get("/users");

  return { users };
};

export const useUsersQuery = () => {
  return useQuery(["users"], () => getUsers(), {
    staleTime: 30000,
  });
};
