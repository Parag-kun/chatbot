import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface IModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: VoidFunction;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      <div
        style={{
          opacity: isOpen ? 0.4 : 0,
          transition: "opacity 0.2s",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="absolute top-0 bottom-0 left-0 right-0 bg-[#0000004a]"
      ></div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        // onClick={onClose}
      >
        <div className="p-6 bg-white relative rounded-lg shadow-2xl">
          <img
            src="/cross-icon.png"
            className="w-5 h-5 absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
