import { Router } from "express";

import ProdutosController from "../controllers/produtosController";

const produtosRouter = Router();
const produtosController = new ProdutosController();

produtosRouter.get(
  "/:id",
  produtosController.getById
);

export default produtosRouter;
