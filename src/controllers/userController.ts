import { Request, Response } from "express";
import * as userValidator from "../validators/userValidator";
import * as userService from "../services/userService";
import { UserType } from "../models/User";
import * as typesProject from "../types/types";

export const createUser_Action = async (req: Request, res: Response) => {
	try {
		const { error, value } = userValidator.userAddValidator.validate(req.body);

		if (error) {
			res.json({ status: false, message: error.message });
			return;
		}
    
		const emailUserExists = await userService.findUserByEmail_Service(value.userEmail);

		if (emailUserExists) {
			res.json({status: false,message: "Infelizmente este email já existe."});
			return;
		}

		const userAdd = await userService.createUserObject_Service(req,value);

		if ((userAdd as typesProject.jsonDefault).status === undefined) {
			const userCreated = await userService.createUser_Service(userAdd as UserType);
			res.json(userCreated);
			return;
		} else {
			res.json(userAdd);
			return;
		}
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};
      
export const updateUserById_Action = async (req: Request, res: Response) => {
	try {
		const { error, value } = userValidator.userEditValidator.validate(req.body);
		const { id } = req.params;
		if (error) {
			res.json({ status: false, message: error.message });
			return;
		}

		if (value.userEmail) {
			const emailUserExists = await userService.findUserByEmail_Service(value.userEmail);

			if (emailUserExists) {
				if (id !== emailUserExists._id.toString()) {
					res.json({status: false,message: "Infelizmente este email já existe."});
					return;
				}
			}
		}

		const userEdited = await userService.createUserObject_Service(req,value);

		if ((userEdited as typesProject.jsonDefault).status === undefined) {
			const userUpdated = await userService.updateUserById_Service(id,userEdited as UserType);
			res.json(userUpdated);
			return;
		} else {
			res.json(userEdited as typesProject.jsonDefault);
			return;
		}
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userFindById_Action = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userFind = await userService.userFindById_Service(id);
		res.json(userFind);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userList_Action = async (req: Request, res: Response) => {
	try {
		const userList = await userService.userList_Service();
		res.json(userList);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userListPagination_Action = async (req: Request,res: Response) => {
	try {
		const { pageNumber, perlPage } = req.params;
		const userListPagination = await userService.userListPagination_Service(parseInt(pageNumber),parseInt(perlPage));
		res.json(userListPagination);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userListSearchByNameOrEmail_Action = async (req: Request,res: Response) => {
	try {
		const { query } = req.params;
		const userFindByNameOrEmail =
    await userService.userListSearchByNameOrEmail_Service(query);
		res.json(userFindByNameOrEmail);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userListPaginationSearchByNameOrEmail_Action = async (req: Request,res: Response) => {
	try {
		const { query, pageNumber, perlPage } = req.params;
		const userFindByNameOrEmailWithPagination =
      await userService.userListPaginationSearchByNameOrEmail_Service(
      	query,
      	parseInt(pageNumber),
      	parseInt(perlPage)
      );
		res.json(userFindByNameOrEmailWithPagination);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};

export const userDelete_Action = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userDelete = await userService.userDelete_Service(id);
		res.json(userDelete);
		return;
	} catch (error) {
		res.json({ status: false, message: "Algo deu errado... " + error });
		return;
	}
};