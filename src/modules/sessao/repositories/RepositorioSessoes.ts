import { getRepository, IRepository, PartialWithRequiredBy } from "fireorm";
import IRepositorioSessoes from "./IRepositorioSessoes";
import Sessao from "./schemas/sessao";

class RepositorioSessoes implements IRepositorioSessoes {
  private static INSTANCE: RepositorioSessoes;
  private fireOrm: IRepository<Sessao>;

  private constructor() {
    this.fireOrm = getRepository(Sessao);
  }

  public static getInstance(): RepositorioSessoes {
    if (!RepositorioSessoes.INSTANCE) {
      RepositorioSessoes.INSTANCE = new RepositorioSessoes();
    }
    return RepositorioSessoes.INSTANCE;
  }

  public async criar(sessao: Sessao): Promise<Sessao> {
    return await this.fireOrm.create(sessao);
  }

  public async atualizar(
    sessao: Sessao
  ): Promise<PartialWithRequiredBy<Sessao, "id">> {
    return await this.fireOrm.update(sessao);
  }

  public async deletar(id: string): Promise<void> {
    await this.fireOrm.delete(id);
  }
}

export default RepositorioSessoes;
