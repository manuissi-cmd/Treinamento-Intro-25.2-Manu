"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import ProdutoCard from "../../components/ProdutoCard";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProducts } from "@/lib/api"; 

type Categoria = { id: string; nome: string };
type Produto = {
  id: string;
  nome: string;
  descricao?: string;
  preco: number | string;
  img?: string;
  categorias?: Categoria[]; // do back vem { id, nome }
};

export default function HomePage() {
  const { user } = useAuth();
  const { items, add, setQty, remove, totalItems } = useCart();

  // dados vindos do back
  const [lista, setLista] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // busca e filtro
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<string>("");

  // carrega produtos do backend
  useEffect(() => {
    setLoading(true);
    setErr(null);
    fetchProducts()
      .then((data) => setLista(Array.isArray(data) ? (data as Produto[]) : []))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  // quantidade no carrinho
  const qtyById = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of items) map.set(it.product.id, it.quantity);
    return map;
  }, [items]);


  function handleAdd(id: string) {
    const p = lista.find((x) => x.id === id);
    if (!p) return;
    add(
      {
        id: p.id,
        nome: p.nome,
        descricao: p.descricao ?? "",
        preco: Number(p.preco ?? 0),
        categorias: (p.categorias ?? []).map((c) => c?.nome).filter(Boolean),
        img: p.img,
      } as any,
      1
    );
  }
  function handleRemove(id: string) {
    const q = qtyById.get(id) ?? 0;
    if (q <= 1) remove(id);
    else setQty(id, q - 1);
  }

  // lista de categorias 
  const categorias = useMemo(() => {
    const set = new Set<string>();
    for (const p of lista) {
      (p.categorias ?? [])
        .map((c) => c?.nome)
        .filter(Boolean)
        .forEach((n) => set.add(n as string));
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [lista]);

  // aplica busca e filtro
  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lista.filter((p) => {
      const nome = (p.nome ?? "").toLowerCase();
      const desc = (p.descricao ?? "").toLowerCase();
      const cats = (p.categorias ?? []).map((c) => c?.nome);

      const matchNome = !q || nome.includes(q) || desc.includes(q);
      const matchCat = !categoria || cats.includes(categoria);

      return matchNome && matchCat;
    });
  }, [lista, query, categoria]);

  return (
    <main className="min-h-screen bg-yellow-100 text-gray-900">
      <Navbar userName={user?.name ?? "Visitante"} cartCount={totalItems} />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold text-center mb-8">Produtos</h2>

        
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="flex-1 rounded-md border px-3 py-2"
            aria-label="Buscar produtos"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full sm:w-[260px] rounded-md border px-3 py-2"
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

       
        {loading && (
          <p className="text-center text-gray-600">Carregando produtos…</p>
        )}
        {err && (
          <p className="text-center text-red-600">
            Erro ao carregar: {err}. Tente novamente.
          </p>
        )}

        {!loading && !err && filtrados.length === 0 && (
          <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
        )}

        {!loading && !err && filtrados.length > 0 && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtrados.map((p) => (
              <ProdutoCard
                key={p.id}
                produto={p as any}
                quantidade={qtyById.get(p.id) ?? 0}
                onAdd={() => handleAdd(p.id)}
                onRemove={() => handleRemove(p.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
