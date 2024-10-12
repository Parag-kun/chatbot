import { useAppDispatch } from "../hooks";
import { setModal } from "../slices/modal";

export const useSetAuthModalDispatch = () => {
  const dispatch = useAppDispatch();

  const dispatchAction = () => {
    dispatch(setModal("auth"));
  };

  return dispatchAction;
};

export const useSetHistoryModalDispatch = () => {
  const dispatch = useAppDispatch();

  const dispatchAction = () => {
    dispatch(setModal("history"));
  };

  return dispatchAction;
};

export const useClearModalDispatch = () => {
  const dispatch = useAppDispatch();

  const dispatchAction = () => {
    dispatch(setModal(null));
  };

  return dispatchAction;
};
