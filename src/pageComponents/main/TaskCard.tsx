import { api } from "@/utils/api";

const styles = {
  container:
    "my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
  title: "font-display m-0 text-xl text-sky-900 dark:text-sky-400",
  body: "prose mt-2.5 text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300",
};

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
    <div className={styles.container}>
      <div className="ml-4 flex-auto">
        <div className="flex justify-between">
          <p className={styles.title}>{title}</p>
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
        </div>

        <div className={styles.body}>{description}</div>
      </div>
    </div>
  );
}

export default TaskCard;
