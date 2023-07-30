import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FC } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { HoverEffect, Modal, ProfileImage } from "~/components/ui";
import { getPlural } from "~/helpers";
import { FollowButton } from "../../home/components";

interface ProfileHeaderProps {
  name: string;
  image: string | null;
  tweetsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  name,
  image,
  tweetsCount,
  followersCount,
  followingCount,
  isFollowing,
}) => {
  const session = useSession();
  const isLoggedIn = !!session.data?.user?.id ?? false;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useRouter().query;
  const tweetText = getPlural(tweetsCount, "Tweet");
  const followersText = getPlural(followersCount, "Follower");

  function handleTogglePopup() {
    setIsModalOpen((prev) => !prev);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal
        isShown={isModalOpen}
        onClose={handleCloseModal}
        text="Sorry, this feature is not available yet."
        declineText="Close"
        isAcceptButton={false}
      />
      <header className="sticky top-0 z-10 mt-4 flex items-center border-b bg-white px-6 py-2">
        <Link href="..">
          <HoverEffect>
            <VscArrowLeft className="text-xl" />
          </HoverEffect>
        </Link>

        <ProfileImage src={image} className="ml-2 h-8 w-8 flex-shrink-0" />

        <div className="ml-2 flex flex-grow items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <p className="border-r border-slate-300 pr-2">
                {`${tweetsCount} ${tweetText}`}
              </p>
              <p className="border-r border-slate-300 pr-2">
                {`${followersCount} ${followersText}`}
              </p>
              <p>{`${followingCount} Follwing`}</p>
            </div>
          </div>

          {isLoggedIn && (
            <FollowButton
              isFollowing={isFollowing}
              userId={id}
              onClick={handleTogglePopup}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
