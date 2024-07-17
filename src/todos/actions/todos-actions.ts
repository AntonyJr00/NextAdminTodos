"use server";

import prisma from "@/app/lib/prisma";
import { getUserSessionServer } from "@/auth/action/auth-action";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), seconds * 1000));

export const toggleTodos = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw "Todo con id: " + id + ", no encontrado";
  const upadteTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/server-todos");

  return upadteTodo;
};

export const addTodo = async (
  description: string
): Promise<Todo | { msg: string }> => {
  try {
    const session = await getUserSessionServer();
    if (!session) throw Error("No se encuentra el ID del usuario");

    const todo = await prisma.todo.create({
      data: { description, userId: session.id },
    });

    revalidatePath("/server-todos");

    return todo;
  } catch (error) {
    return { msg: "Error al crear el todo" };
  }
};

export const deleteCompleted = async () => {
  const session = await getUserSessionServer();
  if (!session) throw Error("No se encuentra el ID del usuario");

  await prisma.todo.deleteMany({
    where: { complete: true, userId: session.id },
  });
  revalidatePath("/server-todos");
};
