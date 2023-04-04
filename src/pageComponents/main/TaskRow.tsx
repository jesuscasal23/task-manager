import React from "react";
import { type RouterOutput } from "@/server/api/root";
import TaskCard from "@/pageComponents/main/TaskCard";

type TaskRowProps = {
  categoryWithTasks: RouterOutput["categories"]["getAllCategoriesWithTasks"][number];
};

function TaskRow({ categoryWithTasks }: TaskRowProps) {
  console.log(categoryWithTasks);
  return (
    <div style={{ width: "300px" }}>
      {categoryWithTasks.tasks.map((task) => (
        <TaskCard key={task.id} title={task.title} description={task.title} />
      ))}
    </div>
  );
}

export default TaskRow;
