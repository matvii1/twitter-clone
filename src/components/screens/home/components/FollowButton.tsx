import { type FC } from "react";

interface FollowButtonProps {
  onClick: () => void;
  isFollowing: boolean;
  userId: string | undefined | string[];
}

export const FollowButton: FC<FollowButtonProps> = ({
  onClick,
  isFollowing,
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-blue-600 px-2 py-2 text-white"
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};
