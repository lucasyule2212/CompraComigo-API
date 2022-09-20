import { Collection } from "fireorm";

class ItemCarrinho {
  // código de barras
  id: number | string;
  nome: string;
  preco: number;
  valorTotal: number;
  quantidade: number;
  image: string;
  priorizado: boolean;
}
export default ItemCarrinho;
