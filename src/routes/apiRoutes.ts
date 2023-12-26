import { Router } from "express";

import * as userController from "../controllers/userController";
import * as imageService from "../services/imageService";
import * as authController from "../controllers/authController";
import { privateRoute } from "../middlewares/passportMiddleware";

const routes = Router();

routes.get("/user", userController.userList_Action);
routes.get("/user/:id", userController.userFindById_Action);
routes.get("/user/search/:query" , userController.userListSearchByNameOrEmail_Action);
routes.get("/user/search/:query/:pageNumber/:perlPage", userController.userListPaginationSearchByNameOrEmail_Action);

routes.post(
	"/user",
	privateRoute,
	imageService.upload_Service.fields([
		{ name: "icon", maxCount: 1 },
		{ name: "banner", maxCount: 1 },
	]),
	userController.createUser_Action
);
routes.post("/user/login", authController.login_Action);

routes.put(
	"/user/:id",
	privateRoute,
	imageService.upload_Service.fields([
		{ name: "icon", maxCount: 1 },
		{ name: "banner", maxCount: 1 },
	]),
	userController.updateUserById_Action
);

routes.delete("/user/:id", privateRoute , userController.userDelete_Action);

export default routes;