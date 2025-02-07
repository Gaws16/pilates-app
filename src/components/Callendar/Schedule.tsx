import React from "react";
import Image from "next/image";

const days = [
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
  "Неделя",
];

const Schedule: React.FC = () => {
  return (
    <table className="border-collapse m-32">
      <thead className="relative bg-[#a17d60] text-white">
        <tr>
          {days.map((day, index) => (
            <th
              key={index}
              className="border border-black w-[100px] h-[100px] text-center relative"
            >
              {day}
              {index === days.length - 1 && (
                <div className="absolute bottom-20  -right-7">
                  <Image
                    src="/bear.svg"
                    alt="Bear"
                    width={80}
                    height={80}
                    quality={100}
                  />
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(3)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {days.map((_, colIndex) => (
              <td
                key={colIndex}
                className="border border-black w-[100px] h-[100px] text-center"
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Schedule;
