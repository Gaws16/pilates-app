import Image from "next/image";
import Title from "../Common/Title";

export default function Princing() {
  return (
    <>
      <Title title="Цени" />
      <div className="flex justify-center gap-24 ">
        <div
          style={{ backgroundImage: "url('/price-back.svg')" }}
          className="w-[735px] h-[424px] bg-no-repeat bg-center flex flex-col justify-center gap-4 items-center text-3xl font-semibold"
        >
          <p>Цена за една трениовка 10 лв</p>
          <p>Карта за 10 посещения 45 лв</p>
          <p>Месечна карта 75 лв</p>
        </div>
        <Image src="/price-pic.svg" alt="woman" width={256} height={256} />
      </div>
    </>
  );
}
