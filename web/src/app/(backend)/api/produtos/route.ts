// web/src/app/(backend)/api/produtos/route.ts
import { NextResponse } from "next/server";
import prisma from "@/backend/services/db";

// util do seu GET
function toNumber(x: unknown) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

// GET /api/produtos
export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      include: { categorias: { include: { categoria: true } } }, // pega nome da categoria via join
      orderBy: { nome: "asc" },
    });

    const data = Array.isArray(produtos)
      ? produtos.map((p) => ({
          id: p.id,
          nome: p.nome,
          descricao: p.descricao,
          preco: toNumber(p.preco), // seu schema usa String; aqui normalizamos pra número
          categorias: p.categorias.map((pc) => ({
            id: pc.categoria.id,
            nome: pc.categoria.nome,
          })),
        }))
      : [];

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[/api/produtos][GET] ERRO:", err);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/produtos
// Aceita:
// - por IDs: { nome, descricao, preco, categoriaIds: [ "id1","id2" ] }
// - por nomes: { nome, descricao, preco, categorias: [ "Camisetas","Roupas" ] }
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nome = typeof body?.nome === "string" ? body.nome.trim() : "";
    const descricao = typeof body?.descricao === "string" ? body.descricao : "";
    const precoStr = String(body?.preco ?? "0"); // schema usa String

    if (!nome) {
      return NextResponse.json({ error: "nome obrigatório" }, { status: 400 });
    }

    // 1) IDs vindos no corpo
    const categoriaIds: string[] = Array.isArray(body?.categoriaIds)
      ? body.categoriaIds.filter((x: unknown) => typeof x === "string")
      : [];

    // 2) Ou nomes de categorias
    let categoriaIdsFromNames: string[] = [];
    if (Array.isArray(body?.categorias)) {
      const nomes = body.categorias
        .map((n: unknown) => (typeof n === "string" ? n.trim() : ""))
        .filter((n: string) => n.length > 0);

      if (nomes.length) {
        // garante existência e busca ids (compatível com versões antigas)
        for (const nome of nomes) {
          await prisma.categoria.upsert({
            where: { nome },
            update: {},
            create: { nome },
          });
        }
        const cats = await prisma.categoria.findMany({
          where: { nome: { in: nomes } },
          select: { id: true },
        });
        categoriaIdsFromNames = cats.map((c) => c.id);
      }
    }

    const idsParaVincular = [...new Set([...categoriaIds, ...categoriaIdsFromNames])];

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: precoStr,
        categorias: {
          create: idsParaVincular.map((categoriaId) => ({
            categoria: { connect: { id: categoriaId } },
          })),
        },
      },
      include: { categorias: { include: { categoria: true } } },
    });

    return NextResponse.json(
      {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: toNumber(produto.preco),
        categorias: produto.categorias.map((pc) => ({
          id: pc.categoria.id,
          nome: pc.categoria.nome,
        })),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/produtos][POST] ERRO:", err);
    return NextResponse.json({ error: "erro inesperado" }, { status: 500 });
  }
}
