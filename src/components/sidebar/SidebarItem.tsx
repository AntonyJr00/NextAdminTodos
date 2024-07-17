"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

export const SidebarItem = ({ title, path, icon }: Props) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl 
        hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
        ${
          path === pathName
            ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white"
            : "text-black"
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
