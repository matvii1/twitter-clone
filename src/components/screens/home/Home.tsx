import { type FC } from "react";
import { TweetForm } from "../common";
import { Header } from "./components";
import { Tweets } from "./components/Tweets";
import { TabsProvider } from "./contexts/TabsProvider";

export const HomeScreen: FC = () => {
  return (
    <TabsProvider>
      <Header />
      <TweetForm />
      <Tweets />
    </TabsProvider>
  );
};
