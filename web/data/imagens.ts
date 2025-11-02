// caminhos das imagens dos produtos
export const IMAGE_MAP: Record<string, string> = {
  "boné - poli usp": "/assets/imgs/bone.jpeg",
  "camiseta champion": "/assets/imgs/champions.jpeg",
  "caneca poli usp": "/assets/imgs/caneca.jpeg",
  "caneca de dia das mães": "/assets/imgs/mae.jpeg",
  "jaqueta poli usp": "/assets/imgs/jaco.jpeg",
  "camiseta interusp 2025": "/assets/imgs/iusp2025.jpeg",
  "shorts para o iusp": "/assets/imgs/shorts.iusp.jpeg",
  "bandana": "/assets/imgs/bandana.jpeg",
  "kit bixo 2025": "/assets/imgs/kitbixo.jpeg",
};

// retorna o caminho da imagem com base no nome do produto 
export function imageFor(name?: string) {
  if (!name) return undefined;
  return IMAGE_MAP[name.trim().toLowerCase()];
}
