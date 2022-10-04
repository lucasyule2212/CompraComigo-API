import { Router } from "express";
import produtosRouter from "../../modules/produto/routes/produtos.routes";

const routes = Router();

routes.use("/produtos", produtosRouter);


export default routes;
