import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-[180px] h-[180px]">
      <Image
        src="/image.png"
        alt="logo"
        layout="contain"
        objectFit="intrinsic"
        width={180}
        height={180}
        priority
        quality={100}
      />
    </div>
  );
}
