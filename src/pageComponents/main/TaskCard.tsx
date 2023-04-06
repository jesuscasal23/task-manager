import { api } from "@/utils/api";
import { Typography } from "@/components";

type CalloutProps = {
  title: string;
  description: string;
  id: string;
};

function TaskCard({ title, description, id }: CalloutProps) {
  const utils = api.useContext();
  const { mutate } = api.tasks.delete.useMutation({
    onSuccess: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
    },
  });

  const deleteTask = () => {
    mutate({
      id,
    });
  };

  return (
    <div className="group relative rounded-xl border border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <div className="flex justify-between">
          <Typography variant={"h2"}>{title}</Typography>
          <Typography onClick={deleteTask} style={{ cursor: "pointer" }}>
            X
          </Typography>
        </div>

        <Typography>{description}</Typography>
      </div>
    </div>
  );
}

export default TaskCard;
