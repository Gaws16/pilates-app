import Image from "next/image";

export default function RuleItem({ rule }: { rule: string }) {
  return (
    <li className="flex gap-6 items-center py-3">
      <Image 
        src="/heart.svg" 
        alt="heart" 
        width={24} 
        height={24} 
        className="flex-shrink-0"
      />
      <p 
        className="w-full relative"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='3' viewBox='0 0 200 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1.5c10 0 20-1 30-1s20 2 30 2 20-2 30-2 20 2 30 2 20-2 30-2 20 2 30 2 20-2 20-2' stroke='rgba(0,0,0,0.8)' stroke-width='0.7' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "200px 3px",
          paddingBottom: "8px"
        }}
      >
        {rule}
      </p>
    </li>
  );
}
