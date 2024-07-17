export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/app/lib/prisma";
import { NewTodo, TodoGrid } from "@todos/index";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div className="flex flex-col gap-8">
      <NewTodo />
      <h2 className="text-3xl font-bold">Rest Todos Page</h2>
      <TodoGrid todos={todos} />
    </div>
  );
}
