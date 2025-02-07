"use client";

import Image from "next/image";

type MainSectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};
export default function MainSection({
  title = "Aime Pilates Studio",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic molestiae, a dolorum unde, natus vel provident itaque ullam animi iste maiores accusantium placeat recusandae accusamus, nobis obcaecati inventore magni sunt.",
  buttonText = "Резервирай своя час сега",
}: MainSectionProps) {
  return (
    <section className="text-xl web:text-2xl flex flex-col items-center gap-3">
      <h1 className="text-3xl web:text-4xl">{title}</h1>
      <div
        className="text-2xl w-3/6 font-bold text-center text-[#483124] rounded-lg bg-cover bg-center p-10"
        style={{ backgroundImage: "url('/mini-background.svg')" }}
      >
        <p className="w-full h-full font-semibold">{description}</p>
      </div>
      <div className="flex items-center gap-3 w-full content-center justify-center">
        <button
          style={{ backgroundImage: "url('/mini-background.svg')" }}
          className=" h-full bg-cover bg-center w-2/6 web:w-2/5 p-3 font-semibold"
          onClick={() => console.log("Button clicked")}
        >
          {buttonText}
        </button>
        <Image
          src={"/small-girl.svg"}
          width={100}
          height={100}
          alt="small-girl"
        />
      </div>
    </section>
  );
}
