import { type FC } from "react";
import { useTabsContext } from "../contexts/TabsProvider";
import { FollowingTweets } from "./FollowingTweets";
import { RecentTweets } from "./RecentTweets";

export const Tweets: FC = () => {
  const { selectedTab } = useTabsContext();

  if (selectedTab === "Recent") {
    return <RecentTweets />;
  }

  return <FollowingTweets />;
};
