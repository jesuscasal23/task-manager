import React, { useState } from "react";
import { api } from "@/utils/api";
import { Button, Modal, Input, Select } from "@/components";
import useCreateTask from "@/hooks/useCreateTask";

type CreateTaskModalProps = {
  open: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateTaskModal = ({ open, setIsOpen }: CreateTaskModalProps) => {
  const createTask = useCreateTask({
    onSuccessCallback: () => {
      setIsOpen(false);
    },
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState({
    value: "",
    label: "Select a category",
  });

  const { data: categories } = api.categories.getAllCategories.useQuery();

  const onSubmit = (title: string, description: string) => {
    console.log(taskCategory);
    createTask.mutate({ title, description, categoriesId: taskCategory.value });
  };

  const createCategoryOptions = () => {
    if (Array.isArray(categories)) {
      return categories.map((category: { id: string; title: string }) => ({
        value: category.id,
        label: category.title,
      }));
    }
    return [];
  };

  return (
    <Modal open={open} setIsOpen={setIsOpen}>
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="mb-2 text-base font-semibold leading-6 text-gray-900">
          create New Task
        </h3>
        <Select
          label={"category"}
          options={createCategoryOptions()}
          onChange={(e: { label: string; value: string }) => {
            setTaskCategory(e);
          }}
          selectedOption={taskCategory}
        />
        <div className="mb-4">
          <Input
            label={"title"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTaskTitle(e.target.value);
            }}
            value={taskTitle}
          />

          <Input
            label={"description"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTaskDescription(e.target.value);
            }}
            value={taskDescription}
          />
        </div>
      </div>
      <div className="flex justify-evenly">
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => onSubmit(taskTitle, taskDescription)}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
