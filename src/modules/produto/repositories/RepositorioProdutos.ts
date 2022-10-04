import { getRepository, IRepository } from "fireorm";
import IRepositorioProdutos from "./IRepositorioProdutos";
import Produto from "./schemas/produto";

class RepositorioProdutos implements IRepositorioProdutos {
  private static INSTANCE: RepositorioProdutos;
  private fireOrm: IRepository<Produto>;

  private constructor() {
    this.fireOrm = getRepository(Produto);
  }

  public static getInstance(): RepositorioProdutos {
    if (!RepositorioProdutos.INSTANCE) {
      RepositorioProdutos.INSTANCE = new RepositorioProdutos();
    }
    return RepositorioProdutos.INSTANCE;
  }

  public async getById(id: string): Promise<Produto | null> {
    return await this.fireOrm.whereEqualTo("id", id).findOne();
  }

  public async getByCategoria(categoria: string): Promise<Produto[]> {
    return await this.fireOrm.whereEqualTo("categoria", categoria).find();
  }

  public async getSugestoesMenorPreco(produto: Produto): Promise<Produto[]> {
    return await this.fireOrm
      .whereEqualTo("categoria", produto.categoria)
      .whereLessThan("valor", produto.valor)
      .find();
  }

  public async getAll(): Promise<Produto[]> {
    return await this.fireOrm.find();
  }
}

export default RepositorioProdutos;
