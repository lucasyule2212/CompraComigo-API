import { Router } from "express";
import produtosRouter from "../../modules/produto/routes/produtos.routes";
import sessaoRouter from "../../modules/sessao/routes/sessao.routes";

const routes = Router();

routes.use("/produtos", produtosRouter);
routes.use("/sessao", sessaoRouter);

export default routes;
