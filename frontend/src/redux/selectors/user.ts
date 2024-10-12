import { useAppSelector } from "../hooks";

export const useCurrentUserSelector = () =>
  useAppSelector((state) => state.user.currentUser);
