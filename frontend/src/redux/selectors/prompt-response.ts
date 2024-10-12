import { useAppSelector } from "../hooks";

export const usePromptResponsesSelector = () =>
  useAppSelector((state) => state.promptResponse.promptResponses);
