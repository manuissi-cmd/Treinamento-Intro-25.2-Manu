// web/src/app/(backend)/api/categorias/route.ts
import { NextResponse } from "next/server";
import prisma from "@/backend/services/db";

// GET /api/categorias
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: "asc" },
    });
    const data = categorias.map((c) => ({ id: c.id, nome: c.nome }));
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[/api/categorias][GET] ERRO:", err);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/categorias
// Aceita:
// 1) { "nome": "Camisetas" }  -> cria/garante uma
// 2) { "nomes": ["Roupas","Acessórios"] } -> cria/garante várias (compatível sem createMany)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // LOTE: { nomes: string[] }
    if (Array.isArray(body?.nomes)) {
      const nomes = body.nomes
        .map((n: unknown) => (typeof n === "string" ? n.trim() : ""))
        .filter((n: string) => n.length > 0);

      const criadas: { id: string; nome: string }[] = [];
      for (const nome of nomes) {
        const cat = await prisma.categoria.upsert({
          where: { nome }, // requer unique(nome) — já está no seu schema
          update: {},
          create: { nome },
        });
        criadas.push({ id: cat.id, nome: cat.nome });
      }

      criadas.sort((a, b) => a.nome.localeCompare(b.nome));
      return NextResponse.json(criadas, { status: 201 });
    }

    // ÚNICA: { nome: string }
    const nome =
      typeof body?.nome === "string" ? body.nome.trim() : "";
    if (!nome) {
      return NextResponse.json({ error: "nome obrigatório" }, { status: 400 });
    }

    const cat = await prisma.categoria.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });

    return NextResponse.json({ id: cat.id, nome: cat.nome }, { status: 201 });
  } catch (err) {
    console.error("[/api/categorias][POST] ERRO:", err);
    return NextResponse.json({ error: "erro inesperado" }, { status: 500 });
  }
}

// DELETE /api/categorias  -> body: { id: string }
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
    }

    await prisma.categoria.delete({ where: { id } });
    return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("[/api/categorias][DELETE] ERRO:", err);
    return NextResponse.json({ error: "erro inesperado" }, { status: 500 });
  }
}
