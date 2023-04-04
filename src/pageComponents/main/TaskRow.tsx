import React from "react";
import { type RouterOutput } from "@/server/api/root";
import TaskCard from "@/pageComponents/main/TaskCard";

type TaskRowProps = {
  categoryWithTasks: RouterOutput["categories"]["getAllCategoriesWithTasks"][number];
};

function TaskRow({ categoryWithTasks }: TaskRowProps) {
  return (
    <div style={{ width: "300px", marginRight: "20px" }}>
      <h3
        className={
          'dark:text-sky-400" center m-0 text-center font-display text-xl text-sky-900'
        }
      >
        {categoryWithTasks.title}
      </h3>
      {categoryWithTasks.tasks.map((task) => (
        <TaskCard key={task.id} title={task.title} description={task.title} />
      ))}
    </div>
  );
}

export default TaskRow;
