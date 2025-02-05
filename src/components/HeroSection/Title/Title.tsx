import Image from "next/image";

export default function Title({
  text = "Силата в нежността, грацията в движението.",
}: {
  text?: string;
}) {
  return (
    <div
      className="relative flex justify-center items-center w-3/6 rounded-xl bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/mini-background.svg')" }}
    >
      <h1 className="text-4xl font-bold text-center text-[#483124] p-4 rounded-lg">
        {text}
      </h1>
    </div>
  );
}
