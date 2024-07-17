import { NextResponse, NextRequest } from "next/server";
import bCrypt from "bcryptjs";

import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Furina Focalors",
      email: "test1@google.com",
      password: bCrypt.hashSync("123456"),
      role: ["admin", "superuser"],
      isActive: true,
      image:
        "https://i.pinimg.com/originals/9d/58/86/9d5886dd2ec9547a6e6b9a4a55612391.jpg",
      todo: {
        create: [
          { description: "Piedra de alma", complete: true },
          { description: "Piedra del poder", complete: false },
          { description: "Piedra del tiempo", complete: false },
          { description: "Piedra del espacio", complete: false },
          { description: "Piedra de la realidad", complete: false },
        ],
      },
    },
  });

  console.log(user);

  return NextResponse.json({
    msg: "Mensaje recibido 'seed'",
    status: 200,
    ok: true,
  });
}
