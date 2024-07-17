"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import { CiLogout } from "react-icons/ci";
import { IoLogInOutline, IoReload } from "react-icons/io5";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoReload className="animate-spin" size={20} color="#000" />
        <span className="group-hover:text-gray-700 font-semibold text-lg">
          Loading...
        </span>
      </button>
    );
  }
  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoLogInOutline size={20} color="#000" />
        <span className="group-hover:text-gray-700 font-semibold text-lg">
          Login
        </span>
      </button>
    );
  }
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout size={20} color="#000" />
      <span className="group-hover:text-gray-700 font-semibold text-lg">
        Logout
      </span>
    </button>
  );
};
