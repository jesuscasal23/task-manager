import { api, type RouterOutputs } from "@/utils/api";

const removeDeletedCategoryFromCache = (
  oldData: RouterOutputs["categories"]["getAllCategoriesWithTasks"] | undefined,
  categoryId: { id: string }
) => {
  const newData = oldData?.filter((category) => category.id !== categoryId.id);

  return newData;
};

const useDeleteCategory = () => {
  const utils = api.useContext();
  const mutate = api.categories.deleteCategoryAndLinkedTasks.useMutation({
    onMutate: async (categoryId) => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(undefined, (oldData) =>
        removeDeletedCategoryFromCache(oldData, categoryId)
      );

      return previousCategories;
    },

    onSettled: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
    },
  });

  return mutate;
};

export default useDeleteCategory;
