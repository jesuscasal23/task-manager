import { api } from "@/utils/api";

type UseCreateTaskProps = {
  onSuccessCallback?: () => void;
};

const useCreateTask = ({ onSuccessCallback }: UseCreateTaskProps = {}) => {
  const utils = api.useContext();

  const createTask = api.tasks.create.useMutation({
    onMutate: async (newTask) => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(
        undefined,
        (oldData) => {
          const newData = oldData?.map((category) => {
            if (category.id === newTask.categoriesId) {
              return {
                ...category,
                tasks: [
                  ...category.tasks,
                  { ...newTask, id: `tempId${new Date().getTime()}` },
                ],
              };
            }

            return category;
          });

          return newData;
        }
      );

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback();
      }

      return previousCategories;
    },
    onSettled: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
    },
  });

  return createTask;
};

export default useCreateTask;
