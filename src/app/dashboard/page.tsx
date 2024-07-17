import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 dark:text-black place-items-center">
      <div className="flex flex-col gap-4 bg-sky-950 items-center justify-around p-7 rounded-lg">
        <h3 className="text-lg text-zinc-200">{session.user?.name}</h3>
        <p className="text-sm text-rose-400">{session.user?.email}</p>
        <Image
          className="w-36 rounded-lg"
          src={session.user?.image ?? ""}
          alt="img-profile"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
