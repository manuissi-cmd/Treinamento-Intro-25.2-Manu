
import { types } from "util";
import type {Category, Product} from "./types"

// base vazia
const BASE = "";


export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/api/categorias`, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar categorias");
  return res.json();
}

// Produtos 
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/api/produtos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar produtos");
  return res.json();
}

// finalizar compra 
export async function postCompra(payload: {
  items: { productId: string; quantity: number; unitPrice: number }[];
  buyerName: string;
  total: number;
}) {
  const res = await fetch(`${BASE}/api/compras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao efetivar compra");
  return res.json();
}
