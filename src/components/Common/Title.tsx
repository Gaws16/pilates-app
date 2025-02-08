export default function Title({ title = "График" }: { title?: string }) {
  return (
    <div
      className="relative flex bg-cover bg-center w-2/12 justify-center"
      style={{ backgroundImage: "url('/mini-background.svg')" }}
    >
      <h1 className="text-4xl p-6 text-[#483124]">{title}</h1>
    </div>
  );
}
