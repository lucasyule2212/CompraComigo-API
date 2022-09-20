import { PartialWithRequiredBy } from "fireorm";
import Sessao from "./schemas/sessao";

export default interface IRepositorioSessoes {
  criar(sessao: Sessao): Promise<Sessao>;
  atualizar(sessao: Sessao): Promise<PartialWithRequiredBy<Sessao, "id">>;
  deletar(id: string): Promise<void>;
}
