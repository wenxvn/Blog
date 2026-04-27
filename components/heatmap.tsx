import clsx from "clsx";

type HeatmapItem = {
  date: string;
  count: number;
};

function level(count: number) {
  if (count <= 0) return "bg-slate-100 dark:bg-slate-800";
  if (count <= 1) return "bg-emerald-100 dark:bg-emerald-900/60";
  if (count <= 3) return "bg-emerald-300 dark:bg-emerald-700";
  if (count <= 5) return "bg-emerald-500 dark:bg-emerald-500";
  return "bg-emerald-700 dark:bg-emerald-300";
}

export function Heatmap({ data }: { data: HeatmapItem[] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
        {data.map((item) => (
          <span
            key={item.date}
            title={`${item.date}: ${item.count} 题`}
            className={clsx("h-3 w-3 rounded-sm", level(item.count))}
          />
        ))}
      </div>
    </div>
  );
}
