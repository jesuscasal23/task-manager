import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.categories.findMany();
  }),
  getAllCategoriesWithTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.categories.findMany({
      include: {
        tasks: true,
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.categories.create({
        data: {
          title: input.title,
        },
      });
    }),
});
