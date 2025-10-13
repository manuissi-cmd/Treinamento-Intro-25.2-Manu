'use client';

import React, { useMemo, useState } from 'react';
import Navbar from '../../../../components/Navbar';
import ProdutoCard from '../../../../components/ProdutoCard';
import { produtos } from '@data/produtos';

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img?: string;
};
type CarrinhoState = Record<number, number>;

export default function HomePage() {
  const [carrinho, setCarrinho] = useState<CarrinhoState>({});

  const totalItensNoCarrinho = useMemo(
    () => Object.values(carrinho).reduce((total, q) => total + q, 0),
    [carrinho]
  );

  const handleAddItem = (id: number) => {
    setCarrinho(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveItem = (id: number) => {
    setCarrinho(prev => {
      const nova = Math.max(0, (prev[id] || 0) - 1);
      if (nova === 0) {
        const { [id]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: nova };
    });
  };

  return (
    <>
      <Navbar userName="manu.issi" cartCount={totalItensNoCarrinho} />

      <main className="container--lojinha">
        <h1 className="h1-lojinha">Produtos</h1>

        <div id="products" className="grid">
          {produtos.map((p: Produto) => (
            <ProdutoCard
              key={p.id}
              produto={p}
              quantidade={carrinho[p.id] || 0}
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </main>
    </>
  );
}
