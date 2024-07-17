import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    message: "HOLA MUNDO",
  });
}

export async function POST(req: Request) {
  return NextResponse.json({ hola: "POST TESTING", method: "POST" });
}

export async function PUT(req: Request) {
  return NextResponse.json({ title: { title: "HOLA" } }, { status: 201 });
}
