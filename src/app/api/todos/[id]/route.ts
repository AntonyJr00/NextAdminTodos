import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: { id: string };
}

//?-----------
const getTodo = async (id: string): Promise<Todo | undefined> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  return todo ?? undefined;
};
//?-----------

export async function GET(req: Request, segments: Segments) {
  const { id } = segments.params;
  const todo = await getTodo(id);
  if (!todo)
    return NextResponse.json(
      { msg: "ERROR no se encontro el todo con el ID: " + id },
      { status: 404 }
    );

  return NextResponse.json({ todo, valid: todo.complete });
}

//*----------PUT----------PUT--------------------PUT----------PUT----------PUT----------

const postSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(req: Request, segments: Segments) {
  try {
    const { id } = segments.params;
    const todo = await getTodo(id);
    if (!todo)
      return NextResponse.json(
        { msg: "error en la obtencion del todo by ID:" + id },
        { status: 404 }
      );

    const { complete, description } = await postSchema.validate(
      await req.json()
    );

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json({ updateTodo });
  } catch (error) {
    const { message, name } = error as Error;
    if (name === "ValidationError")
      return NextResponse.json({ message }, { status: 400 });

    return NextResponse.json(error, { status: 404 });
  }
}
