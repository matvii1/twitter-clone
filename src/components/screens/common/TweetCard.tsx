import Link from "next/link";
import { type FC } from "react";
import { ProfileImage } from "~/components/ui";
import { dateFormatter } from "~/helpers";
import { api } from "~/utils/api";
import { HeartButton } from "./HeartButton";
import { type Tweet } from "./InfiniteTweetList";

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const { user, content, likedByMe, createdAt, likesCount, id } = tweet;
  const trpcUtils = api.useContext();

  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: async ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.tweet.getRecent.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return;

        const countModifier = addedLike ? 1 : -1;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((tweet) => {
                if (tweet.id === id) {
                  return {
                    ...tweet,
                    likesCount: tweet.likesCount + countModifier,
                    likedByMe: addedLike,
                  };
                }

                return tweet;
              }),
            };
          }),
        };
      };

      trpcUtils.tweet.getRecent.setInfiniteData({}, updateData);
      await trpcUtils.tweet.getTweetsByUser.invalidate();
    },
  });

  function handleLikeToggle() {
    toggleLike.mutate({
      tweetId: id,
    });
  }

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`profile/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex items-center gap-1">
          <Link
            href={`/profile/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline "
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-xs text-gray-500">
            {dateFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton
          likedByMe={likedByMe}
          likesCount={likesCount}
          tweetId={id}
          isLoading={toggleLike.isLoading}
          onClick={handleLikeToggle}
        />
      </div>
    </li>
  );
};
