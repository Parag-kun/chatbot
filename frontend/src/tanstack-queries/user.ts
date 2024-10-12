import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getToken, setToken } from "../utils/token";
import { useSetCurrentUserDispatch } from "../redux/actions/user";
import { useClearModalDispatch } from "../redux/actions/modal";
import { useCurrentUserSelector } from "../redux/selectors/user";
import { useAppDispatch } from "../redux/hooks";
import { setChats } from "../redux/slices/chat";
import { BASE_URL } from "../env-vars";

export const useSignup = (
  options: Omit<
    MutationOptions<unknown, Error, { email: string; password: string }>,
    "mutationFn" | "mutationKey"
  > = {}
) => {
  const queryClient = useQueryClient();
  const dispatchClearModal = useClearModalDispatch();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body) => {
      const url = `${BASE_URL}/users/signup`;
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      } as RequestInit;

      const res = await fetch(url, options);
      const resBody = await res.json();

      return resBody.data?.token;
    },
    onSuccess: (data) => {
      setToken(data as string);

      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      dispatchClearModal();
    },
    ...options,
  });
};

export const useLogin = (
  options: Omit<
    MutationOptions<unknown, Error, { email: string; password: string }>,
    "mutationFn" | "mutationKey"
  > = {}
) => {
  const queryClient = useQueryClient();
  const dispatchClearModal = useClearModalDispatch();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body) => {
      const url = `${BASE_URL}/users/login`;
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      } as RequestInit;

      const res = await fetch(url, options);
      const resBody = await res.json();

      return resBody.data?.token;
    },
    onSuccess: (data) => {
      setToken(data as string);

      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      dispatchClearModal();
    },
    ...options,
  });
};

export const useCurrentUser = (
  options: Omit<QueryOptions, "queryKey" | "queryFb"> = {}
) => {
  const setCurrentUser = useSetCurrentUserDispatch();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const token = getToken();
      const url = `${BASE_URL}/users/current-user`;
      const options = {
        headers: { authorization: `Bearer ${token}` },
      } as RequestInit;

      const res = await fetch(url, options);
      const body = await res.json();

      const user = body.data?.user;

      if (user) {
        const { _id, email, role } = user;

        setCurrentUser({ _id, email, role });
      }

      return body.data?.user;
    },
    ...options,
  });
};

export const useGetUserChats = (
  userId: string,
  options: Omit<QueryOptions, "queryKey" | "queryFb"> = {}
) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["user-chats", userId],
    queryFn: async () => {
      if (!userId) {
        dispatch(setChats([]));
        return;
      }

      const token = getToken();
      const url = `${BASE_URL}/users/${userId}/chats`;
      const options = {
        headers: { authorization: `Bearer ${token}` },
      } as RequestInit;

      const res = await fetch(url, options);
      const body = await res.json();

      const chats = body.data?.chats;

      if (chats) {
        dispatch(setChats(chats));
      }

      return body.data?.chats;
    },
    ...options,
  });
};

export const useGetUsers = (
  options: Omit<QueryOptions, "queryKey" | "queryFb"> = {}
) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = getToken();
      const url = `${BASE_URL}/users`;
      const options = {
        headers: { authorization: `Bearer ${token}` },
      } as RequestInit;

      const res = await fetch(url, options);
      const body = await res.json();

      return body.data?.users;
    },
    ...options,
  });
};
