import { api } from "@/utils/api";

type UseCreateTaskProps = {
  onSuccessCallback?: () => void;
};

const useCreateTask = ({ onSuccessCallback }: UseCreateTaskProps = {}) => {
  const utils = api.useContext();

  const createTask = api.tasks.create.useMutation({
    onMutate: async () => {
      await utils.categories.getAllCategoriesWithTasks.cancel();

      const previousCategories =
        utils.categories.getAllCategoriesWithTasks.getData();

      utils.categories.getAllCategoriesWithTasks.setData(
        undefined,
        (oldData) => {
          console.log(oldData);
          return oldData;
        }
      );

      return previousCategories;
    },
    onSettled: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
      if (typeof onSuccessCallback === "function") {
        onSuccessCallback();
      }
    },
  });

  return createTask;
};

export default useCreateTask;
