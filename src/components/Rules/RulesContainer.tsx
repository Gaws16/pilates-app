import Image from "next/image";
import RuleItem from "./RuleItem";

export default function RulesContainer() {
  return (
    <div className="flex gap-6 items-center flex-col">
      <Image
        src="/rules-pic.svg"
        alt="rules"
        width={1000}
        height={600}
        className="mt-5"
      />
      <ul>
        <RuleItem rule="Правило 1" />
        <RuleItem rule="Правило 2" />
        <RuleItem rule="Правило 3" />
        <RuleItem rule="Правило 4" />
      </ul>
    </div>
  );
}
