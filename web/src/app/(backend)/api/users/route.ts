/* import { NextResponse } from "next/server";
import {users} from "@/backend/services/users"

export async function GET() {
  return NextResponse.json(await usersService.list());
}

export async function POST(req: Request) {
  const b = await req.json();
  const { email, name } = b;

  if (!email) {
    return NextResponse.json(
      { error: "Campo obrigatório: email." },
      { status: 400 }
    );
  }

  const user = await usersService.create({ email, name });
  return NextResponse.json(user, { status: 201 });
} */
