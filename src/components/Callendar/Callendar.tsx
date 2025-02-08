import Title from "../Common/Title";
import Schedule from "./Schedule";

export default function Calendar() {
  return (
    <div className="flex flex-col">
      <Title title="График" />
      <Schedule />
    </div>
  );
}
