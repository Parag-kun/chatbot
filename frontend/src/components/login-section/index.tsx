import { FC } from "react";
import Button from "../ui/button";
import {
  useClearModalDispatch,
  useSetAuthModalDispatch,
} from "../../redux/actions/modal";
import LoginSignupModal from "./login-singup-modal";
import { useIsAuthModalSelector } from "../../redux/selectors/modal";
import { useCurrentUser } from "../../tanstack-queries/user";
import { useCurrentUserSelector } from "../../redux/selectors/user";
import Avatar from "./avatar";
import { clearToken } from "../../utils/token";
import { useSetCurrentUserDispatch } from "../../redux/actions/user";
import { useQueryClient } from "@tanstack/react-query";

interface ILoginSectionProps {
  closeFloater?: VoidFunction;
}

const LoginSection: FC<ILoginSectionProps> = ({ closeFloater }) => {
  const queryClient = useQueryClient();
  const isAuthModalOpen = useIsAuthModalSelector();
  const dispatchClearModal = useClearModalDispatch();
  const dispatchAuthModal = useSetAuthModalDispatch();
  const currentUser = useCurrentUserSelector();
  const setCurrentUser = useSetCurrentUserDispatch();

  const handleLogout = () => {
    clearToken();
    setCurrentUser(null);
    closeFloater?.();

    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    queryClient.invalidateQueries({ queryKey: ["user-chats"] });
  };

  return (
    <div className="flex flex-col gap-4">
      {currentUser ? (
        <Button
          onClick={handleLogout}
          className="flex items-center gap-4 text-sm"
        >
          Logout <Avatar />
        </Button>
      ) : (
        <Button
          onClick={() => {
            dispatchAuthModal();
            closeFloater?.();
          }}
          className="text-sm"
        >
          Login / Signup
        </Button>
      )}
      <LoginSignupModal isOpen={isAuthModalOpen} onClose={dispatchClearModal} />
    </div>
  );
};

export default LoginSection;
