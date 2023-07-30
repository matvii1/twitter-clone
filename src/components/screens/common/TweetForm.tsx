import { useSession } from "next-auth/react";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from "react";
import { AccentButton, ProfileImage } from "~/components/ui";
import { updateTextAreaHeight } from "~/helpers";
import { api } from "~/utils/api";

export const TweetForm: FC = () => {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return <Form />;
};

function Form() {
  const [tweetQuery, setTweetQuery] = useState("");
  const session = useSession();
  const user = session?.data?.user;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const trpcUtils = api.useContext();

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (tweet) => {
      if (session.status !== "authenticated") return;

      const updateData: Parameters<
        typeof trpcUtils.tweet.getRecent.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null ?? oldData?.pages[0] == null) return;

        const newCacheTweet = {
          ...tweet,
          likesCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name ?? null,
            image: session.data.user.image ?? null,
          },
        };

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCacheTweet, ...oldData.pages[0].tweets],
            },
            ...oldData.pages.slice(1),
          ],
        };
      };

      trpcUtils.tweet.getRecent.setInfiniteData({}, updateData);

      setTweetQuery("");
    },
  });

  useLayoutEffect(() => {
    updateTextAreaHeight(textAreaRef.current);
  }, [tweetQuery]);

  function handleTweetSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createTweet.mutate({
      content: tweetQuery,
    });
  }

  function handleTweetChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTweetQuery(event.target.value);
  }

  return (
    <form
      className="flex flex-col gap-8 border-b px-4 py-4"
      onSubmit={handleTweetSubmit}
    >
      <div className="flex gap-4">
        <ProfileImage src={user?.image} />
        <textarea
          ref={textAreaRef}
          name="Tweet"
          id="tweet"
          onChange={handleTweetChange}
          value={tweetQuery}
          placeholder="What is on your mind?"
          className="min-h-[4rem] flex-grow resize-none overflow-y-hidden rounded-md px-4 py-3 text-lg outline-none"
        />
      </div>
      <AccentButton
        label="Tweet"
        className="max-w-fit self-end px-10 font-normal"
      />
    </form>
  );
}
