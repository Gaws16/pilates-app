import Image from "next/image";

export default function RuleItem({ rule }: { rule: string }) {
  return (
    <li className="flex gap-4 items-center">
      <Image src="/heart.svg" alt="heart" width={32} height={32} />
      <p className="border-b-2 border-black rounded-b-xl">{rule}</p>
    </li>
  );
}
