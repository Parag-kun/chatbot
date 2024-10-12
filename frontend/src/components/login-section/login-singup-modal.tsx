import { FC, useState } from "react";
import Modal, { IModalProps } from "../ui/modal";
import Input from "../ui/input";
import Button from "../ui/button";
import { cn } from "../../utils";
import { useLogin, useSignup } from "../../tanstack-queries/user";

interface ILoginSignupModalProps extends Omit<IModalProps, "children"> {}

const LoginSignupModal: FC<ILoginSignupModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [body, setBody] = useState({ email: "", password: "" });

  const handleFieldChange = (field: keyof typeof body, value: string) => {
    body[field] = value;

    setBody({ ...body });
  };

  const { isPending: isSigningUp, mutateAsync: signup } = useSignup();
  const { isPending: isLogging, mutateAsync: login } = useLogin();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <div
            className={cn(
              "flex-1 text-center py-2 font-semibold cursor-pointer",
              isLogin ? "" : "border-b-4 border-blue-500"
            )}
            onClick={() => setIsLogin(false)}
          >
            Singup
          </div>
          <div
            className={cn(
              "flex-1 text-center py-2 font-semibold cursor-pointer",
              isLogin ? "border-b-4 border-blue-500" : ""
            )}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <Input
              className="w-[300px]"
              value={body.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Password</label>
            <Input
              className="w-[300px]"
              value={body.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
            />
          </div>
          {isLogin ? (
            <Button
              isLoading={isLogging}
              variant="outlined"
              onClick={() => login(body)}
            >
              Login
            </Button>
          ) : (
            <Button
              isLoading={isSigningUp}
              variant="outlined"
              onClick={() => signup(body)}
            >
              Singup
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LoginSignupModal;
