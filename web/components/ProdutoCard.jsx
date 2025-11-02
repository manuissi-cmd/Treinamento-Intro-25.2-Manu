'use client';

import Image from 'next/image';
import { emReais } from '../data/produtos';
import { imageFor } from '../data/imagens';


export default function ProdutoCard({ produto, onAdd, onRemove, quantidade = 0 }) {
  // Define mostrar a imagem do produto
  const imgSrc = produto?.img ?? imageFor(produto?.nome);

  return (
    <article className="card bg-yellow-200 border border-yellow-400 rounded-2xl shadow-md p-4 flex flex-col items-center justify-between transition-transform hover:scale-[1.02]">
      
      {/* Exibe a imagem */}
      {imgSrc && (
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-inner">
          <Image
            src={imgSrc}
            alt={produto?.nome ?? 'Produto'}
            width={220}
            height={220}
            className="object-contain"
            priority={false}
          />
        </div>
      )}

      {/* Informações principais do produto */}
      <div className="body mt-3 text-center">
        <h3 className="font-bold text-lg">{produto?.nome}</h3>
        <p className="text-sm text-gray-700">{produto?.descricao}</p>
        <p className="font-semibold mt-1">{emReais(Number(produto?.preco) || 0)}</p>
      </div>

      {/* Área de ações: remover, exibir quantidade e adicionar */}
      <div className="actions mt-4 flex items-center justify-center gap-3">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded-lg"
          onClick={() => onRemove(produto.id)}
        >
          –
        </button>

        <span className="font-bold">{quantidade}</span>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md"
          onClick={() => onAdd(produto.id)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
}
