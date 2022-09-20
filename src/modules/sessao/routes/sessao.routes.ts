import { Router } from "express";

import SessaoController from "../controllers/sessoesController";

const sessaoRouter = Router();
const produtosController = new SessaoController();

sessaoRouter.post(
  "/:id",
  produtosController.create
);

export default sessaoRouter;
