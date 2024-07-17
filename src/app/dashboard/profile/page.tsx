"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("hola mundo ");
  }, []);

  return (
    <div>
      <h1 className="dark:text-black">Profile Page</h1>
      <hr />

      <div className="flex flex-col gap-6 bg-zinc-700 p-4">
        <h3>{session?.user?.name ?? "No Nanme"}</h3>
        <h3>{session?.user?.email ?? "No Email"}</h3>
        <h3>{session?.user?.image ?? "No Img"}</h3>

        <div className=" font-semibold text-lg">{JSON.stringify(session)}</div>
      </div>
    </div>
  );
}
