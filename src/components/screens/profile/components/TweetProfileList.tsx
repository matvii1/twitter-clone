import { useRouter } from "next/router";
import { type FC } from "react";
import { NoTweets } from "~/components/ui";
import { api } from "~/utils/api";
import { TweetCard } from "../../common";

export const TweetProfileList: FC = () => {
  const { id } = useRouter().query;

  const { data: tweets } = api.tweet.getTweetsByUser.useQuery({
    userId: String(id),
  });

  if (tweets == null || tweets.length === 0) {
    return <NoTweets />;
  }

  return (
    <ul className="mt-4">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </ul>
  );
};
