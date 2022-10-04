import Produto from "./schemas/produto";

export default interface IRepositorioProdutos {
  getById(id: string): Promise<Produto | null>;
  getByCategoria(categoria: string): Promise<Produto[]>;
  getSugestoesMenorPreco(produto: Produto): Promise<Produto[]>;
  getAll(): Promise<Produto[]>;
}
