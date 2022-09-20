import { Collection } from "fireorm";
import ItemCarrinho from "./itemCarrinho";

class Carrinho {
  itens: ItemCarrinho[];
  valorTotal: number;
}
export default Carrinho;
