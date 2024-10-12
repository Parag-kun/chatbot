import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils";

interface IFloaterProps extends PropsWithChildren {
  isVisible: boolean;
  className?: string;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}

const MainBody: FC<IFloaterProps> = ({
  children,
  className = "",
  isVisible,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <div
        className={cn(
          "absolute top-2 left-2 w-2 h-20 rounded-full bg-black cursor-pointer",
          isVisible
            ? "opacity-0 pointer-events-none"
            : "opacity-30 pointer-events-auto"
        )}
        onClick={onOpen}
      />
      <div
        style={{ transition: "transform 0.2s" }}
        className={cn(
          "absolute top-2 left-2 bg-white shadow-xl p-4 z-10 rounded-lg",
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-[-200%] opacity-0",
          className
        )}
      >
        {children}
      </div>
      <div
        style={{ transition: "opacity 0.2s" }}
        className={cn(
          "absolute top-0 bottom-0 left-0 right-0 bg-black",
          isVisible
            ? "opacity-20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
    </>
  );
};

const Floater: FC<IFloaterProps> = (props) => {
  return createPortal(
    <MainBody {...props} />,
    document.getElementById("floater")!
  );
};

export default Floater;
