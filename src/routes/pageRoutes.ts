import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/home", (req: Request , res: Response) => {
	res.render("pages/home");
});

export default routes;