import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAppDispatch } from "../redux/hooks";
import {
  addResponse,
  setPromptResponses,
} from "../redux/slices/prompt-response";
import { getToken } from "../utils/token";

export const useGetPromptResponse = (
  options: Omit<
    MutationOptions<unknown, Error, { prompts: string[] }>,
    "mutationFn" | "mutationKey"
  > = {}
) => {
  const BASE_URL = import.meta.env.REACT_APP_API_URL as string;
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["prompt-response"],
    mutationFn: async (body) => {
      const url = `${BASE_URL}/chats`;
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      } as RequestInit;

      const res = await fetch(url, options);
      const resBody = await res.json();

      return resBody.data?.response;
    },
    onSuccess: (data) => {
      dispatch(addResponse(data as string));
    },
    ...options,
  });
};

export const useSavePromptResponse = (
  options: Omit<
    MutationOptions<
      unknown,
      Error,
      { chatId?: string; prompt: string; response: string }
    >,
    "mutationFn" | "mutationKey"
  > = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-response"],
    mutationFn: async (body) => {
      const token = getToken();
      const url = `${BASE_URL}/chats`;
      const options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      } as RequestInit;

      const res = await fetch(url, options);
      const resBody = await res.json();

      return resBody.data?.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-chats"] });
    },
    ...options,
  });
};

export const useGetChatPromptResponse = (
  chatId?: string,
  options: Omit<QueryOptions, "mutationFn" | "mutationKey"> = {}
) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["chat-response", chatId],
    queryFn: async () => {
      if (!chatId) {
        dispatch(setPromptResponses([]));
        return;
      }

      const token = getToken();
      const url = `${BASE_URL}/chats/${chatId}`;
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as RequestInit;

      const res = await fetch(url, options);
      const resBody = await res.json();

      const chat = resBody.data?.chat;

      if (chat) {
        dispatch(setPromptResponses(chat.responses));
      }

      return resBody.data?.responses;
    },
    ...options,
  });
};
