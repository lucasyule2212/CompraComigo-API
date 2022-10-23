import { Router } from "express";

import ProdutosController from "../controllers/produtosController";

const produtosRouter = Router();
const produtosController = new ProdutosController();

produtosRouter.get("/:id", produtosController.getById);

produtosRouter.get("/sugestoes/:id", produtosController.getSugestoes);

produtosRouter.post("/carrinho-economico", produtosController.getCarrinhoEconomico);

export default produtosRouter;
