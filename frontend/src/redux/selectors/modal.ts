import { useAppSelector } from "../hooks";

export const useIsAuthModalSelector = () =>
  useAppSelector((state) => state.modal.currentModal === "auth");
export const useIsHistoryModalSelector = () =>
  useAppSelector((state) => state.modal.currentModal === "history");
