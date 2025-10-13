'use client';

import Image from 'next/image';
import { emReais } from '@data/produtos';

export default function ProdutoCard({ produto, onAdd, onRemove, quantidade = 0 }) {
  return (
    <article className="card">
      {produto?.img && (
        <div className="thumb relative">
          {/* Image em modo fill para ocupar a área da thumb sem distorcer */}
          <Image
            src={produto.img}
            alt={produto.nome}
            fill
            sizes="(max-width: 768px) 140px, 160px"
            priority={false}
          />
        </div>
      )}

      <div className="body">
        <div className="title">
          {produto.nome}{' '}
          <span className="price">{emReais(produto.preco)}</span>
        </div>

        <div className="desc">{produto.descricao}</div>

        <div className="actions">
          <button className="btn btn-rem" onClick={() => onRemove(produto.id)}>–</button>
          <span>{quantidade}</span>
          <button className="btn btn-add" onClick={() => onAdd(produto.id)}>Adicionar ao Carrinho</button>
        </div>
      </div>
    </article>
  );
}
