import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { Button, Modal, Input } from "@/components";

type CreateTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CreateTaskModal = ({ open, setOpen }: CreateTaskModalProps) => {
  const queryClient = useQueryClient();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const createTask = api.tasks.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const onSubmit = (title: string, description: string) => {
    createTask.mutate({ title, description });
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="mb-2 text-base font-semibold leading-6 text-gray-900">
          create New Task
        </h3>
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
        <Button variant="secondary" onClick={() => setOpen(false)}>
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
