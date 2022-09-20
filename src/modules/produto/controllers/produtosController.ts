import { Request, Response } from "express";
import RepositorioProdutos from "../repositories/RepositorioProdutos";

export default class ProdutosController {
  // busca produto por ID (código de barras)
  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repositorioProdutos = RepositorioProdutos.getInstance();

    const produto = await repositorioProdutos.getById(id);

    return res.status(200).json(produto);
  }
}
