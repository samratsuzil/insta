import clsx from "clsx";
import React from "react";

interface StatsCardProps {
  type: string;
  title: string;
  count: number;
}
const StatsCard = ({ title, count, type }: StatsCardProps) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-white border rounded-lg overflow-hidden shadow-lg p-4">
      <div
        className={clsx(`p-4 w-full`, {
          "bg-green-400": type == "success",

          "bg-red-400": type == "danger",

          "bg-yellow-400": type == "warning",

          "bg-blue-400": type == "info",
        })}
      />
      <div className="text-gray-700 w-full">
        <h3 className="text-sm tracking-wider">{title}</h3>
        <p className="text-3xl">{count}</p>
      </div>
    </div>
  );
};

export default StatsCard;
