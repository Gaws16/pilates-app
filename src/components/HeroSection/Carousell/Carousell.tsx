import Image from "next/image";

const images = ["header-1.svg", "header-2.svg", "header-3.svg", "header-4.svg"];

export default function Carousell() {
  return (
    <div className="relative flex flex-wrap justify-center gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-full sm:w-[400px] h-[300px]">
          <Image
            key={index}
            src={`/${image}`}
            alt="header"
            objectFit="cover"
            layout="fill"
            priority
          />
        </div>
      ))}
    </div>
  );
}
