import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { Button, Modal, Input } from "@/components";

type CreateCategoryModalProps = {
  open: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateCategoryModal = ({ open, setIsOpen }: CreateCategoryModalProps) => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState("");
  const createCategory = api.categories.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const onSubmit = () => {
    createCategory.mutate({ title: categoryTitle });
  };

  return (
    <Modal open={open} setIsOpen={setIsOpen}>
      <h3 className="mb-2 text-base font-semibold leading-6 text-gray-900">
        Create Category
      </h3>
      <Input
        label={"title"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCategoryTitle(e.target.value);
        }}
        value={categoryTitle}
      />

      <div className="flex justify-evenly">
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
