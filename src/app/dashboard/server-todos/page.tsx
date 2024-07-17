export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/app/lib/prisma";
import { getUserSessionServer } from "@/auth/action/auth-action";
import { NewTodo, TodoGrid } from "@todos/index";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Server-Actions-Todos",
  description: "SEO Title",
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();
  console.log(user);
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: { description: "asc" },
  });
  console.log("construido");

  return (
    <div className="flex flex-col gap-8">
      <NewTodo />
      <h2 className="text-3xl font-bold">Server Todos Page</h2>
      <TodoGrid todos={todos} />
    </div>
  );
}
