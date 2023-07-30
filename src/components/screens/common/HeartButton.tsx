import { signIn, useSession } from "next-auth/react";
import { useState, type FC } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { HoverEffect, Modal } from "~/components/ui";

interface HeartButtonProps {
  likedByMe: boolean;
  tweetId: string;
  likesCount: number;
  onClick: () => void;
  isLoading: boolean;
}

export const HeartButton: FC<HeartButtonProps> = ({
  likedByMe,
  likesCount,
  onClick,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  const isAuth = session.status === "authenticated";

  const commonClasses =
    "mb-1 mt-1 flex items-center gap-2 self-start text-gray-500";

  function handleOpenPopup() {
    setIsModalOpen(true);
  }

  async function handleContinue() {
    await signIn();
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal
        isShown={isModalOpen}
        onClose={handleCloseModal}
        onContinue={() => void handleContinue()}
      />
      <button
        disabled={isLoading}
        className={twMerge(
          commonClasses,
          "group transition-colors duration-200",
          likedByMe ? "text-red-500" : "text-gray-500"
        )}
        onClick={isAuth ? onClick : handleOpenPopup}
      >
        <HoverEffect red>
          <HeartIcon
            className={twMerge(
              "group:focus-visible:fill-red-500 transition-colors duration-200",
              likedByMe
                ? "fill-red-500"
                : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
            )}
          />
        </HoverEffect>
        <span className="duration-200 group-hover:text-red-500">
          {likesCount}
        </span>
      </button>
    </>
  );
};
