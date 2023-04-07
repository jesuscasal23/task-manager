import React from "react";
import { type RouterOutput } from "@/server/api/root";
import TaskCard from "@/pageComponents/main/TaskCard";
import { api } from "@/utils/api";

type TaskRowProps = {
  categoryWithTasks: RouterOutput["categories"]["getAllCategoriesWithTasks"][number];
};

function TaskRow({ categoryWithTasks }: TaskRowProps) {
  const utils = api.useContext();
  const { mutate: deleteCategory } =
    api.categories.deleteCategoryAndLinkedTasks.useMutation({
      onSuccess: () => {
        utils.categories.getAllCategoriesWithTasks.invalidate();
      },
    });

  return (
    <div style={{ width: "300px" }} className="mr-4">
      <div className="flex justify-between">
        <h3
          className={
            'dark:text-sky-400" center m-0 mb-6 text-center font-display text-xl text-sky-900'
          }
        >
          {categoryWithTasks.title}
        </h3>

        <h3
          className={
            'dark:text-sky-400" center m-0 text-center font-display text-xl text-sky-900'
          }
          onClick={() => deleteCategory({ id: categoryWithTasks.id })}
        >
          X
        </h3>
      </div>
      {categoryWithTasks.tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.title}
          id={task.id}
        />
      ))}
    </div>
  );
}

export default TaskRow;
