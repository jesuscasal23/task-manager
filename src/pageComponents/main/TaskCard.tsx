import { api } from "@/utils/api";

type CalloutProps = {
  title: string;
  description: string;
  id: string;
};

function TaskCard({ title, description, id }: CalloutProps) {
  const utils = api.useContext();
  const deleteTask = api.tasks.delete.useMutation({
    onSuccess: () => {
      utils.categories.getAllCategoriesWithTasks.invalidate();
    },
  });

  return (
    <div className="group relative rounded-xl border border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <p
          onClick={() => {
            deleteTask.mutate({
              id,
            });
          }}
          style={{ cursor: "pointer" }}
        >
          X
        </p>
        <h2 className="mt-4 font-display text-base text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default TaskCard;
