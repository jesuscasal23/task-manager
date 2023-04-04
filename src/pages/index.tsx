import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useState } from "react";
import TaskRow from "@/pageComponents/main/TaskRow";
import { Button } from "@/components";
import CreateTaskModal from "@/pageComponents/main/CreateTaskModal";

const Home: NextPage = () => {
  const { data: categoriesAndTasks } =
    api.categories.getAllCategoriesWithTasks.useQuery();

  const [isOpenCreateTask, setOpenCreateTask] = useState(false);
  const [isOpenCreateCategory, setOpenCreateCategory] = useState(false);

  return (
    <main className="h-screen pt-2 dark:bg-slate-900">
      <div className="flex justify-center">
        <p className=" inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200  bg-clip-text font-display text-5xl leading-loose tracking-tight text-transparent">
          Task Manager
        </p>
      </div>

      <CreateTaskModal open={isOpenCreateTask} setOpen={setOpenCreateTask} />
      <div style={{ width: "80%", marginLeft: "10%" }}>
        <Button onClick={() => setOpenCreateTask(true)} className="mr-2">
          Create Task
        </Button>
        <Button onClick={() => setOpenCreateCategory(true)}>
          Create Category
        </Button>

        {categoriesAndTasks?.map((category) => (
          <TaskRow key={category.id} categoryWithTasks={category} />
        ))}
      </div>
    </main>
  );
};

export default Home;
