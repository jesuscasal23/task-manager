const styles = {
  container:
    "my-8 flex rounded-3xl p-6 bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10",
  title: "font-display m-0 text-xl text-sky-900 dark:text-sky-400",
  body: "prose mt-2.5 text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300",
};

type CalloutProps = {
  title: string;
  description: string;
};

function TaskCard({ title, description }: CalloutProps) {
  return (
    <div className={styles.container}>
      <div className="ml-4 flex-auto">
        <p className={styles.title}>{title}</p>
        <div className={styles.body}>{description}</div>
      </div>
    </div>
  );
}

export default TaskCard;
