export default function Title({
  text = "Силата в нечността, грацията в движението.",
}: {
  text?: string;
}) {
  return (
    <div
      className="relative flex justify-center items-center w-full sm:w-4/5 lg:w-3/6 rounded-xl bg-center bg-cover bg-no-repeat p-4"
      style={{ backgroundImage: "url('/mini-background.svg')" }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#483124] p-2 sm:p-4 rounded-lg break-words">
        {text}
      </h1>
    </div>
  );
}
