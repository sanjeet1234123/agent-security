interface PageHeaderProps {
  title?: string;
  description?: string;
}

export default function PageHeader({
  title = "Title",
  description = "Description",
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
}
