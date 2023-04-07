import { api, type RouterOutputs } from "@/utils/api";

type UseCreateTaskProps = {
  onSuccessCallback?: () => void;
};

const addNewCategoryToCache = (
  oldData: RouterOutputs["categories"]["getAllCategoriesWithTasks"] | undefined,
  newTask: {
    title: string;
    description: string;
    categoriesId: string;
  }
) => {
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
};

const useCreateTask = ({ onSuccessCallback }: UseCreateTaskProps = {}) => {
  const utils = api.useContext();

  const createTask = api.tasks.create.useMutation({
    onMutate: async (newTask) => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(undefined, (oldData) =>
        addNewCategoryToCache(oldData, newTask)
      );

      if (onSuccessCallback && typeof onSuccessCallback === "function") {
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
