import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

//*METODO________________

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take))
    return NextResponse.json(
      { msg: "Error TAKE tiene que se un numero", ok: false },
      { status: 400 }
    );

  if (isNaN(skip))
    return NextResponse.json(
      { msg: "Error SKIP tiene que se un numero", ok: false },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    skip: skip,
    take: take,
  });

  return NextResponse.json({
    ok: true,
    todos,
  });
}

//*METODO________________
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false), //todo: mostrar algo interesante
});

export async function POST(req: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    );
    const newTodo = await prisma.todo.create({
      data: { description, complete },
    });

    return NextResponse.json({ body: newTodo });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

//*METODO________________

export async function DELETE(req: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    return NextResponse.json({
      ok: true,
      msg: "Borrado exitosamente",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 400 }
    );
  }
}
