"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(
    currentTab > tabOptions.length ? 1 : currentTab
  );

  const onTabSelected = (tab: number) => {
    setSelected((prev) => (prev = tab));
    setCookie("selectedTab", String(tab));
    router.refresh();
  };
  // tabOptions.length
  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${"grid-cols-4"}`}
    >
      {tabOptions.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={option.toString()}
            className="peer hidden"
            checked={selected === option}
            onChange={(e) => e}
          />
          <label
            onClick={() => onTabSelected(option)}
            className={`block cursor-pointer select-none rounded-xl p-2 text-center hover:bg-blue-200 peer-checked:font-bold peer-checked:text-white transition-colors duration-300 ${
              selected === 1
                ? "peer-checked:bg-cyan-700"
                : "peer-checked:bg-blue-500"
            }`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
