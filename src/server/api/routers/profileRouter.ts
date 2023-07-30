import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id }, ctx }) => {
      const profile = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          tweets: true,
          followers: true,
          following: true,
        },
      });

      return profile;
    }),
});
