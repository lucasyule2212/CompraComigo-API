import { Collection } from "fireorm";
import Carrinho from "./carrinho";

@Collection("Sessao")
class Sessao {
  // código de barras
  id: string;
  carrinho: Carrinho;
}
export default Sessao;
