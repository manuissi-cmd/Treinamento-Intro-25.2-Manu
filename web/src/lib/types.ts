
export type Category = { id: string; nome: string };

export type Product = {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;        
  categorias: Category[];
};
