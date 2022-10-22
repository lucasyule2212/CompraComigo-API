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
  public async getCarrinhoEconomico(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { carrinho, orcamento } = req.body;

      const repositorioProdutos = RepositorioProdutos.getInstance();

      // filter items that are not prioritized
      const carrinhoFiltrado = carrinho.itens.filter(
        (item: ItemCarrinho) => item.priorizado === false
      );

      // for each item, get the suggestions and add to the array
      const carrinhoEconomico = await Promise.all(
        carrinhoFiltrado.map(async (item: ItemCarrinho) => {
          const produto = await repositorioProdutos.getById(item.id);
          if (!produto) {
            throw new Error("Produto não encontrado!");
          }
          const sugestoes = await repositorioProdutos.getSugestoesMenorPreco(
            produto
          );
          return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.valor,
            valorTotal: produto.valor * item.quantidade,
            quantidade: item.quantidade,
            image: produto.image_url,
            categoria: produto.categoria,
            priorizado: false,
            opcoes: sugestoes,
          };
        })
      );

      // return the sum of the cheapest suggestion for each item
      const valorTotalCarrinhoEconomico = carrinhoEconomico.reduce(
        (total: number, item: any) =>
          total + item.opcoes[0].valor * item.quantidade,
        0
      );

      // return the sum of the items that are not prioritized
      const valorTotalCarrinho = carrinhoFiltrado.reduce(
        (total: number, item: ItemCarrinho) => total + item.valorTotal,
        0
      );

      // diferença de valor entre o carrinho atual e o carrinho econômico
      // valor reflete o quanto o cliente economizaria se comprasse os itens sugeridos
      const diferencaEconomia =
        valorTotalCarrinho - valorTotalCarrinhoEconomico;

      // se a diferença de economia for maior que o orçamento, retorna o carrinho atual e a diferença de economia como -1
        console.log(diferencaEconomia, orcamento);
        
      if (diferencaEconomia > orcamento) {
        return res.status(200).json({
          carrinhoEconomico: carrinho,
          valorTotalEconomia: -1,
        });
      }

      return res
        .status(200)
        .json({ valorTotalEconomia: diferencaEconomia, carrinhoEconomico });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar carrinho" });
    }
  }
}
