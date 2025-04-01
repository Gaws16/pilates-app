export default function ScheduleTitle({
  title = "График",
}: {
  title?: string;
}) {
  return (
    <div className="relative flex ">
      <h1 className="text-4xl text-[#a17d60]">{title}</h1>
    </div>
  );
}
