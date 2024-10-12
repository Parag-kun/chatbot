import { useAppDispatch } from "../hooks";
import { ICurrentUser, setCurrentUser } from "../slices/user";

export const useSetCurrentUserDispatch = () => {
  const dispatch = useAppDispatch();

  const dispatchAction = (currentUser: ICurrentUser["currentUser"]) => {
    dispatch(setCurrentUser(currentUser));
  };

  return dispatchAction;
};
