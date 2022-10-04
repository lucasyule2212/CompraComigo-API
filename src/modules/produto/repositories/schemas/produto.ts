import { Collection } from "fireorm";

@Collection("Produto")
class Produto {
  // código de barras
  id: string;
  nome: string;
  image_url: string;
  categoria: string;
  valor: number;
}
export default Produto;
