import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";

const CreateCategoryModal = () => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const createCategory = api.categories.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const onSubmit = (title: string, description: string) => {
    createCategory.mutate({ title, description });
  };

  return <div>CreateCategoryModal</div>;
};

export default CreateCategoryModal;
