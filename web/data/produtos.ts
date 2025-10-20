// web/data/produtos.ts
export const produtos = [
  { id: 1, nome: "Camiseta Champion", preco: 110, descricao: "Camiseta da AAAP em parceria com a Champion", img: "/assets/imgs/champions.jpeg" },
  { id: 2, nome: "Caneca de dia das mães", preco: 35, descricao: "Presente ideal para a sua querida mãe", img: "/assets/imgs/mae.jpeg" },
  { id: 3, nome: "Jaqueta Poli USP", preco: 90, descricao: "Jaqueta personalizada", img: "/assets/imgs/jaco.jpeg" },
  { id: 4, nome: "Camiseta Interusp 2025", preco: 70, descricao: "Camiseta 100% algodão que representa a Poli USP", img: "/assets/imgs/iusp2025.jpeg" },
  { id: 5, nome: "Shorts para o IUSP", preco: 80, descricao: "Shorts exclusivos para o Interusp 2025", img: "/assets/imgs/shorts.iusp.jpeg" },
  { id: 6, nome: "Bandana", preco: 25, descricao: "Bandana – edição especial Interusp", img: "/assets/imgs/bandana.jpeg" },
  { id: 7, nome: "Caneca Poli USP", preco: 40, descricao: "A caneca perfeita para seu open", img: "/assets/imgs/caneca.jpeg" },
  { id: 8, nome: "Boné - Poli USP", preco: 35, descricao: "Boné branco – Poli USP", img: "/assets/imgs/bone.jpeg" },
  { id: 9, nome: "Kit Bixo 2025", preco: 120, descricao: "Kit composto por sacochila, estojo, régua, caneca e camiseta", img: "/assets/imgs/kitbixo.jpeg" },
];


export function emReais(n: number) {
  try {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    const s = (Math.round(n * 100) / 100).toFixed(2);
    const [intPart, decPart] = s.split(".");
    let out = "", k = 0;
    for (let i = intPart.length - 1; i >= 0; i--) {
      out = intPart[i] + out;
      k++;
      if (k === 3 && i > 0) {
        out = "." + out;
        k = 0;
      }
    }
    return "R$ " + out + "," + decPart;
  }
}
