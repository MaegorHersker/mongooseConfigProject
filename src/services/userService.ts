import { User, UserType } from "../models/User";
import bcrypt from "bcrypt";
import * as imageService from "./imageService";
import { Request } from "express";
import * as typesProject from "../types/types";
import { unlink } from "fs";
import mongoose from "mongoose";
import * as jsonReturnService from "./jsonReturnService";
import { dateFormatter } from "../functions/dateFunction";


export const createUser_Service = async (data: UserType): Promise<typesProject.jsonDefault> => {
	try {
		await User.create(data);
		return  jsonReturnService.jsonDefault(true , "Usuário criado com sucesso!");
	} catch (error) {
		return  jsonReturnService.jsonDefault(false , "Algo deu errado na criação de seu usuário... " + error);
	}
};

export const updateUserById_Service = async (id: string, data: UserType): Promise<typesProject.jsonDefault> => {
	try {
		const userEdit = (await User.findById(id)) as null | UserType;
		let status: boolean;
		let message: string;

		if (userEdit) {
			if ((userEdit as UserType).icon !== "icon.jpg") {
				const iconExists = await imageService.imageExists_Service(
					"./public/assets/images/client/" + userEdit?.icon
				);
				if (iconExists) unlink("./public/assets/images/client/" + userEdit?.icon, () => {});
			}

			if ((userEdit as UserType).banner !== "banner.jpg") {
				const bannerExists = await imageService.imageExists_Service(
					"./public/assets/images/client/" + userEdit?.banner
				);
				if (bannerExists)
					unlink("./public/assets/images/client/" + userEdit?.banner, () => {});
			}
			await User.updateOne({ _id: id }, data);

			status = true;
			message = "Usuário editado com sucesso";
		} else {
			status = false;
			message = "Infelizmente este usuário não existe";
		}

		return  jsonReturnService.jsonDefault(status , message);

	} catch (error) {
		return jsonReturnService.jsonDefault(false ,  "Algo deu errado na edição de seu usuário... " + error);
	}
};

export const userFindById_Service = async (id: string): Promise<typesProject.jsonPlusWithValueReturn> => {
	try {
		const isValidObjectId = mongoose.isValidObjectId(id);
		let message: string;
		let status: boolean;
		let resultValue: [] | {} | UserType | UserType[]; 

		if(isValidObjectId) {

			const userFind = await User.findById(id);
			if(userFind) {
				message = "Requisicao da lista realizada com sucesso!";
				status = true;
				resultValue = userFind;
			} else { 
				message = "Usuário não encontrado.";
				status = false;
				resultValue = {};
			}
		} else {
			message = "ID inválido";
			status = false;
			resultValue = {};
		}

		return jsonReturnService.jsonPlusWithValueReturn(resultValue, status, message);
	} catch (error) {
		return jsonReturnService.jsonPlusWithValueReturn({}, false,"Algo deu errado na requisicao desta lista de usuários... " + error);
	}
};

export const userList_Service = async (): Promise<typesProject.jsonPlusWithValueReturn> => {
	try {
		const userList = await User.find().sort({ _id: "desc" });
		return jsonReturnService.jsonPlusWithValueReturn(userList,true , "Requisicao da lista realizada com sucesso");
	} catch (error) {
		return jsonReturnService.jsonPlusWithValueReturn([],false,"Algo deu errado na requisicao da lista de usuários... " + error);
	}
};

export const userListPagination_Service = async (pageNumber: number, perlPage: number): Promise<typesProject.jsonPlusWithValueReturn> => {
	try {
		let message: string;
		let status: boolean;
		const userListPagination = await User.find()
			.sort({ _id: "desc" })
			.skip((pageNumber - 1) * perlPage)
			.limit(perlPage);

		if (userListPagination.length > 0) {
			message = "Requisição da lista realizada com sucesso!";
			status = true;
		} else {
			message = "Item não encontrado.";
			status = false;
		}

		return jsonReturnService.jsonPlusWithValueReturn(userListPagination , status , message);
	} catch (error) {
		return jsonReturnService.jsonPlusWithValueReturn([], false,"Algo deu errado na requisicao desta lista de usuários... " + error);
	}
};

export const userListSearchByNameOrEmail_Service = async (query: string): Promise<typesProject.jsonPlusWithValueReturn> => {
	try {
		const regex = new RegExp(query, "i");
		let message: string;
		let status: boolean;

		const userFindByNameOrEmail = await User.find({
			$or: [{ userName: { $regex: regex } }, { userEmail: { $regex: regex } }],
		}).sort({ userName: "asc", userEmail: "asc" });


		if (userFindByNameOrEmail.length > 0) {
			message = "Requisição da lista realizada com sucesso!";
			status = true;
		} else {
			message = "Item não encontrado.";
			status = false;
		}

		return jsonReturnService.jsonPlusWithValueReturn(userFindByNameOrEmail, status , message);
	} catch (error) {
		return jsonReturnService.jsonPlusWithValueReturn([],false,"Algo deu errado na requisicao desta lista de usuários... " + error);
	}
};

export const userListPaginationSearchByNameOrEmail_Service = async (query: string,pageNumber: number,perlPage: number): Promise<typesProject.jsonPlusWithValueReturn> => {
	try {
		const regex = new RegExp(query, "i");
		let message: string;
		let status: boolean;

		const userFindByNameOrEmailWithPagination = await User.find({
			$or: [{ userName: { $regex: regex } }, { userEmail: { $regex: regex } }],
		})
			.sort({ userName: "asc", userEmail: "asc" })
			.skip((pageNumber - 1) * perlPage)
			.limit(perlPage);

		if (userFindByNameOrEmailWithPagination.length > 0) {
			message = "Requisição da lista realizada com sucesso!";
			status = true;
		} else {
			message = "Item não encontrado.";
			status = false;
		}
		return jsonReturnService.jsonPlusWithValueReturn(userFindByNameOrEmailWithPagination , status , message);
	} catch (error) {
		return jsonReturnService.jsonPlusWithValueReturn([],false,"Algo deu errado na requisicao desta lista de usuários... " + error);
	}
};

export const userDelete_Service = async (id: string): Promise<typesProject.jsonDefault> => {
	try {
		const isValidObjectId = mongoose.isValidObjectId(id);
		let message: string;
		let status: boolean;
    
		if(isValidObjectId) {
			const userDelete = await User.findById(id);
			if (userDelete) {
				await User.deleteOne({ _id: id });
				message = "Usuário deletado com sucesso!";
				status = true;
			} else {
				message = "Infelizmente este usuário nao existe" ;
				status = false;
			}
		} else {
			message = "ID inválido";
			status = false;
		}
		return jsonReturnService.jsonDefault(status, message);

	} catch (error) {
		return jsonReturnService.jsonDefault(false,"Algo deu errado nesta tentativa de deleção de usuário... " + error);
	}
};

export const createUserObject_Service = async (request: Request, value: UserType): Promise<Object | typesProject.jsonDefault> => {
	try {
		const uploadImg = await imageService.uploadImage_Service(request);
		const userObject: any = {};
		if (value.userName) userObject["userName"] = value.userName;
		if (value.userEmail) userObject["userEmail"] = value.userEmail;
		if (value.password) userObject["password"] = bcrypt.hashSync(value.password, 12);
		if (value.birthDate) userObject["birthDate"] = dateFormatter(value.birthDate);
		if (value.tel) userObject["tel"] = value.tel;

		if (uploadImg && typeof uploadImg === "object") {
			if (uploadImg["icon"]) userObject["icon"] = uploadImg["icon"];
			if (uploadImg["banner"]) userObject["banner"] = uploadImg["banner"];
		}

		return userObject;
	} catch (error) {
		return {
			status: false,
			message: "Algo deu errado na criação de seu usuário... " + error,
		};
	}
};

export const findUserByEmail_Service = async (userEmail: string): Promise<boolean | any> => {
	const userRequest = await User.findOne({ userEmail });

	if (userRequest) return userRequest;
	else return false;
};
