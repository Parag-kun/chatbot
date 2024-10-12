import { FC } from "react";
import { useCurrentUserSelector } from "../../redux/selectors/user";

const Avatar: FC = () => {
  const currentUser = useCurrentUserSelector();

  const initial = currentUser?.email[0].toUpperCase();

  return (
    <span className="bg-white text-blue-500 rounded-full w-6 h-6 inline-block font-bold">
      {initial}
    </span>
  );
};

export default Avatar;
