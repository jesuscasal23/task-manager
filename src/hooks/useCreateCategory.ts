import { api } from "@/utils/api";

type UseCreateCategoryProps = {
  onSuccessCallback?: () => void;
};

const useCreateCategory = ({
  onSuccessCallback,
}: UseCreateCategoryProps = {}) => {
  const utils = api.useContext();

  const createCategory = api.categories.create.useMutation({
    onMutate: async (newCategory) => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(
        undefined,
        (oldData) => {
          const newCategoryWithPlaceholderValues = {
            ...newCategory,
            id: `tempId${new Date().getTime()}`,
            tasks: [],
          };

          if (!oldData) {
            return [newCategoryWithPlaceholderValues];
          }

          const newData = [...oldData, newCategoryWithPlaceholderValues];

          return newData;
        }
      );

      if (onSuccessCallback && typeof onSuccessCallback === "function") {
        onSuccessCallback();
      }

      return previousCategories;
    },

    onSettled: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
      utils.categories.getAllCategories.invalidate();
    },
  });

  return createCategory;
};

export default useCreateCategory;
