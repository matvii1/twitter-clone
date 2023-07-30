import { useSession } from "next-auth/react";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { TweetProfileList } from "./components";
import ProfileHeader from "./components/ProfileHeader";

export const ProfileDetails = () => {
  const { id } = useRouter().query;
  const session = useSession();
  const currentUserId = session.data?.user?.id ?? "";

  const data = api.profile.getById.useQuery({ id: String(id) });
  const profile = data.data;

  if (profile?.name == null || data == null) {
    return <ErrorPage statusCode={404} />;
  }

  const { name, following, tweets: initialTweets, followers, image } = profile;
  const isFollwing =
    !!following.find((following) => {
      return following.id === currentUserId;
    }) ?? false;

  return (
    <>
      <Head>
        <title>Twitter clone Profile</title>
      </Head>

      <ProfileHeader
        name={name}
        image={image}
        followersCount={followers.length}
        followingCount={following.length}
        tweetsCount={initialTweets.length}
        isFollowing={isFollwing}
      />
      <main>
        <TweetProfileList />
      </main>
    </>
  );
};
