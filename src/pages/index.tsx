import { type NextPage } from "next";
import Image from "next/image";
import { api } from "@/utils/api";
import { useState } from "react";
import TaskRow from "@/pageComponents/main/TaskRow";
import { Button, Typography } from "@/components";
import CreateTaskModal from "@/pageComponents/main/CreateTaskModal";
import blurCyanImage from "@/images/blur-cyan.png";
import { ToastContainer } from "react-toastify";
import CreateCategoryModal from "@/pageComponents/main/CreateCategoryModal";

const Home: NextPage = () => {
  const { data: categoriesAndTasks } =
    api.categories.getAllCategoriesWithTasks.useQuery();

  const [isOpenCreateTask, setOpenCreateTask] = useState(false);
  const [isOpenCreateCategory, setOpenCreateCategory] = useState(false);

  return (
    <main className="h-screen bg-slate-900 pt-2">
      <Image
        className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
        src={blurCyanImage}
        alt=""
        width={530}
        height={530}
        unoptimized
        priority
      />
      <ToastContainer containerId="an id" draggable={false} />
      <CreateTaskModal open={isOpenCreateTask} setIsOpen={setOpenCreateTask} />
      <CreateCategoryModal
        open={isOpenCreateCategory}
        setIsOpen={setOpenCreateCategory}
      />

      <div className="flex justify-evenly">
        <Typography variant="h1">Task Manager</Typography>
        <div className="mt-8 flex align-middle">
          <Button onClick={() => setOpenCreateTask(true)} className="mr-2">
            Create Task
          </Button>
          <Button onClick={() => setOpenCreateCategory(true)}>
            Create Category
          </Button>
        </div>
      </div>

      <div style={{ width: "80%", marginLeft: "10%" }}>
        <div className="just flex">
          {categoriesAndTasks?.map((category) => (
            <TaskRow key={category.id} categoryWithTasks={category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
