"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

type CartItem = { product: Product; quantity: number };

type CartContextType = {
  items: CartItem[];
  add: (p: Product, q?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // carregar carrinho salvo no localStorage
  useEffect(() => {
    const raw = localStorage.getItem("lojinha:cart");
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // salvar carrinho sempre que mudar
  useEffect(() => {
    localStorage.setItem("lojinha:cart", JSON.stringify(items));
  }, [items]);

  // adicionar produto
  const add = (p: Product, q: number = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.product.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + q };
        return copy;
      }
      return [...prev, { product: p, quantity: q }];
    });
  };

  // remover produto
  const remove = (productId: string) => {
    setItems((prev) => prev.filter((it) => it.product.id !== productId));
  };

  // definir nova quantidade
  const setQty = (productId: string, qty: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.product.id === productId
          ? { ...it, quantity: Math.max(1, qty) }
          : it
      )
    );
  };

  // limpar carrinho
  const clear = () => setItems([]);

  // totais calculados
  const totalItems = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity * it.product.preco, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de um CartProvider");
  return ctx;
}
