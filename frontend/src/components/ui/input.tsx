import { FC, InputHTMLAttributes } from "react";
import { cn } from "../../utils";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: FC<IInputProps> = ({ error, className, ...props }) => {
  return (
    <input
      className={cn(
        "outline-none p-1 rounded border-b-2 border-gray-300 focus:border-gray-500",
        className
      )}
      {...props}
    />
  );
};

export default Input;
