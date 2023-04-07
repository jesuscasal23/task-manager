import React, { useState } from "react";
import { Button, Modal, Input } from "@/components";
import useCreateCategory from "@/hooks/useCreateCategory";

type CreateCategoryModalProps = {
  open: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateCategoryModal = ({ open, setIsOpen }: CreateCategoryModalProps) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const createCategory = useCreateCategory({
    onSuccessCallback: () => setIsOpen(false),
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
