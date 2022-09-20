import { Request, Response } from "express";
import RepositorioSessoes from "../repositories/RepositorioSessoes";
import Sessao from "../repositories/schemas/sessao";

export default class SessoesController {
  // cria sessão
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repositorioSessoes = RepositorioSessoes.getInstance();

    const sessao: Sessao = {
      id,
      carrinho: { itens: [], valorTotal: 0 },
    };

    const sessaoCriada = await repositorioSessoes.criar(sessao);

    return res.status(200).json(sessaoCriada);
  }

  // deletar sessão
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repositorioSessoes = RepositorioSessoes.getInstance();

    await repositorioSessoes.deletar(id);

    return res.status(200).json({ message: "Sessão deletada com sucesso" });
  }
}
