import Image from "next/image";

const images = ["header-1.svg", "header-2.svg", "header-3.svg", "header-4.svg"];

export default function Carousell() {
  return (
    <div className="relative flex flex-wrap justify-center gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <Image
            key={index}
            src={`/${image}`}
            alt="header"
            objectFit="contain"
            layout="intrinsic"
            width={300}
            height={200}
            priority
            className="block"
          />
        </div>
      ))}
    </div>
  );
}
