import { type FC } from "react";
import { api } from "~/utils/api";
import InfiniteTweetList from "../../common/InfiniteTweetList";

export const RecentTweets: FC = () => {
  const tweets = api.tweet.getRecent.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const pages = tweets?.data?.pages.flatMap((page) => page.tweets);

  return (
    <InfiniteTweetList
      tweets={pages}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
};
