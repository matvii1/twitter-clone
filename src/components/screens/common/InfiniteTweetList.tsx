import { type FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ErrorMessage, Loading, NoTweets } from "~/components/ui";
import { TweetCard } from "./TweetCard";

export interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likesCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface InfiniteTweetListProps {
  tweets: Tweet[] | undefined;
  isError: boolean;
  isLoading: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
}

const InfiniteTweetList: FC<InfiniteTweetListProps> = ({
  tweets,
  isError,
  isLoading,
  hasMore,
  fetchNewTweets,
}) => {
  if (isLoading) return <Loading />;

  if (isError) return <ErrorMessage />;

  if (tweets == null || tweets.length === 0) {
    return <NoTweets />;
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore ?? false}
        loader={<Loading />}
      >
        {tweets.map((tweet) => (
          <TweetCard tweet={tweet} key={tweet.id} />
        ))}
      </InfiniteScroll>
    </ul>
  );
  return;
};

export default InfiniteTweetList;
