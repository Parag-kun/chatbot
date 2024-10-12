import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../utils";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  isLoading?: boolean;
}

const useButtonVariant = (variant: IButtonProps["variant"]) => {
  switch (variant) {
    case "contained": {
      return "bg-blue-500 text-white hover:bg-blue-600";
    }
    case "outlined": {
      return "border border-blue-500 bg-blue-100 hover:bg-white text-blue-500";
    }
  }
};

const Button: FC<IButtonProps> = ({
  variant = "contained",
  className,
  isLoading = false,
  children,
  ...props
}) => {
  const variantClass = useButtonVariant(variant);

  return (
    <button
      className={cn("px-6 py-2 rounded-lg", variantClass, className)}
      {...props}
    >
      {children}{isLoading ? "..." : ""}
    </button>
  );
};

export default Button;
