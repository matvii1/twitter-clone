import { type Prisma } from "@prisma/client";
import { type inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  type createTRPCContext,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          content: input.content,
          userId: ctx.session!.user.id,
        },
      });

      return tweet;
    }),
  getRecent: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z
          .object({
            id: z.string(),
            createdAt: z.date(),
          })
          .optional(),
        onlyFollowing: z.boolean().optional(),
      })
    )
    .query(
      async ({
        input: { limit = 10, cursor = null, onlyFollowing = false },
        ctx,
      }) => {
        const currentUserId = ctx.session?.user?.id;
        const whereClause =
          !onlyFollowing || currentUserId == null
            ? undefined
            : {
                user: {
                  followers: {
                    some: {
                      id: currentUserId,
                    },
                  },
                },
              };

        return await getTweets({
          limit,
          cursor,
          ctx,
          whereClause,
        });
      }
    ),
  toggleLike: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ input: { tweetId }, ctx }) => {
      const userId = ctx.session!.user.id;
      const data = { tweetId, userId };

      const existingLike = await ctx.prisma.like.findUnique({
        where: {
          tweetId_userId: data,
        },
      });

      if (existingLike) {
        await ctx.prisma.like.delete({
          where: {
            tweetId_userId: data,
          },
        });

        return {
          addedLike: false,
        };
      }

      await ctx.prisma.like.create({
        data,
      });

      return {
        addedLike: true,
      };
    }),
  getTweetsByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session?.user?.id;

      const tweets = await ctx.prisma.tweet.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        where: {
          userId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          likes:
            currentUserId == null
              ? false
              : {
                  where: {
                    userId: currentUserId,
                  },
                },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: { likes: true },
          },
        },
      });

      const simplifiedTweets = tweets.map((tweet) => ({
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        likesCount: tweet._count.likes,
        user: tweet.user,
        likedByMe: tweet._count.likes > 0,
      }));

      return simplifiedTweets;
    }),
});

async function getTweets({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Prisma.TweetWhereInput;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
  limit: number;
  cursor: { id: string; createdAt: Date } | null;
}) {
  const currentUserId = ctx.session?.user?.id;

  const tweets = await ctx.prisma.tweet.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause,
    select: {
      id: true,
      content: true,
      createdAt: true,
      likes:
        currentUserId == null
          ? false
          : {
              where: {
                userId: currentUserId,
              },
            },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: { likes: true },
      },
    },
  });

  let nextCursor: typeof cursor | undefined = undefined;

  if (tweets.length > limit) {
    const lastTweet = tweets.pop();

    nextCursor =
      lastTweet != null
        ? { id: lastTweet.id, createdAt: lastTweet.createdAt }
        : undefined;
  }

  const simplifiedTweets = tweets.map((tweet) => ({
    id: tweet.id,
    content: tweet.content,
    createdAt: tweet.createdAt,
    likesCount: tweet._count.likes,
    user: tweet.user,
    likedByMe: tweet._count.likes > 0,
  }));

  return {
    tweets: simplifiedTweets,
    nextCursor,
  };
}
