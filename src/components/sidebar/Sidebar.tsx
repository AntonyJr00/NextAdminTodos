import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import {
  IoServerOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoBuildOutline,
  IoCafeOutline,
  IoPersonOutline,
} from "react-icons/io5";

import { authOptions } from "@/auth";
import { LogoutButton, SidebarItem } from "@components/index";

const linkItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    title: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoServerOutline size={30} />,
  },
  {
    title: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoBuildOutline size={30} />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <IoCafeOutline size={30} />,
  },
  {
    title: "Perfil",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const imgUrl =
    session?.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";
  const userName = session?.user?.name ?? "Cynthia J, Watts";
  const userEmail = session?.user?.email ?? "Admin";
  const roles = session?.user?.role ?? ["no-roles"];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard/rest-todos" title="home">
            <Image
              width={100}
              height={100}
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              loading="eager"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            width={100}
            height={100}
            src={imgUrl}
            alt={"profile-img"}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            loading="eager"
            priority
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-700 lg:block text-xs my-2">
            [ {roles.join(" , ")} ]
          </span>
          <span className="hidden text-blue-700 lg:block">{userEmail}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {linkItems.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
