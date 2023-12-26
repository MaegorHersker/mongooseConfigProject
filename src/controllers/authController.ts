import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as authValidator from "../validators/authValidator";
import * as userService from "../services/userService";
import * as userValidator from "../validators/userValidator";

export const login_Action = async (req: Request , res: Response) => {
	try {
		const { error, value } = authValidator.loginValidator.validate(req.body);

		const {userEmail , password} = value;
		const emailExits = userService.findUserByEmail_Service(userEmail);
		console.log(emailExits);
		if (error || !emailExits) {
			console.log("ate");
			res.json({ status: false, message: error?.message ? error.message : "Este email nao existe" });
			return;
		}

		const userLogin = await authService.login_Service(userEmail , password);

		res.json(userLogin);
	} catch(error) {
		res.json({status: false , message: "Algo deu errado... "+error});
	}
};