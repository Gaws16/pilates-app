import Schedule from "./Schedule";
import ScheduleTitle from "./ScheduleTItle";

export default function Calendar() {
  return (
    <div className="flex flex-col">
      <ScheduleTitle />
      <Schedule />
    </div>
  );
}
