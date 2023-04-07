import { api, type RouterOutputs } from "@/utils/api";

const removeDeletedTaskFromCache = (
  oldData: RouterOutputs["categories"]["getAllCategoriesWithTasks"] | undefined,
  taskId: { id: string }
) => {
  const newData = oldData?.map((category) => {
    return {
      ...category,
      tasks: category.tasks.filter((task) => task.id !== taskId.id),
    };
  });

  return newData;
};

const useDeleteTask = () => {
  const utils = api.useContext();
  const deleteTask = api.tasks.delete.useMutation({
    onMutate: async (taskId) => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(undefined, (oldData) =>
        removeDeletedTaskFromCache(oldData, taskId)
      );

      return previousCategories;
    },
    onSettled: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
    },
  });

  return deleteTask;
};

export default useDeleteTask;
