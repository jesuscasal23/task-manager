import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tasks.findMany();
  }),
  getTasksByCategory: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tasks.findMany({
        where: {
          categoriesId: input.categoryId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        categoriesId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tasks.create({
        data: {
          title: input.title,
          description: input.description,
          categoriesId: input.categoriesId,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tasks.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
