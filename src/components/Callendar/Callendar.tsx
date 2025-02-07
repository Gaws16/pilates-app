"use client";
import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Base styles

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 w-full h-full flex justify-center items-center">
      <ReactCalendar
        onChange={setDate}
        value={date}
        maxDetail="month"
        className="w-60"
      />
    </div>
  );
}
