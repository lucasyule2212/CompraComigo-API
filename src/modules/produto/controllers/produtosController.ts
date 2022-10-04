import { Request, Response } from "express";
import ItemCarrinho from "modules/produto/repositories/schemas/itemCarrinho";
import RepositorioProdutos from "../repositories/RepositorioProdutos";

export default class ProdutosController {
  // busca produto por ID (código de barras)
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repositorioProdutos = RepositorioProdutos.getInstance();

      const produto = await repositorioProdutos.getById(id);

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      const parseToItemCarrinho: ItemCarrinho = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.valor,
        quantidade: 1,
        categoria: produto.categoria,
        image: produto.image_url,
        priorizado: false,
        valorTotal: produto.valor,
      };

      return res.status(200).json(parseToItemCarrinho);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar produto" });
    }
  }

  public async getSugestoes(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repositorioProdutos = RepositorioProdutos.getInstance();

      const produto = await repositorioProdutos.getById(id);

      if (!produto) {
        throw new Error("Produto não encontrado!");
      }
      const sugestoes = await repositorioProdutos.getSugestoesMenorPreco(
        produto
      );
      console.log(sugestoes);

      return res.status(200).json(sugestoes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar sugestões" });
    }
  }
}
