import { CSSProperties, FC } from "react";
import { cn } from "../../utils";

interface ILoaderProps {
  size?: number;
  color?: CSSProperties["color"];
  className?: string;
}

const Loader: FC<ILoaderProps> = ({
  size = 10,
  color = "blueviolet",
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size, borderColor: color }}
      className={cn("rounded-full border-t-4 loader", className)}
    />
  );
};

export default Loader;
