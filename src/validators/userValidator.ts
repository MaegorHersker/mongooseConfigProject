import Joi from "joi";

export const userAddValidator = Joi.object({
	userName: Joi.string().min(3).max(30).required().error(new Error("Nome precisa ter no mínimo 3 caracteres e no máximo 30 caracteres.")),
	userEmail: Joi.string().email().required().error(new Error("Digite um email que seja válido")),
	password: Joi.string().min(3).max(30).required().error(new Error("Digite uma senha que contenha de 3 a 30 caracteres")),
	repeatPassword: Joi.ref("password"),
	birthDate: Joi.date().iso().max("now").min("1930-01-01").required().error(new Error("Digite uma data que esteja entre o ano 1930 e o atual.")),
	tel: Joi.number().min(10000000).max(100000000000000).required().error(new Error("Digite um telefone que seja válido")),
});

export const userEditValidator = Joi.object({
	userName: Joi.string().min(3).max(30).error(new Error("Nome precisa ter no mínimo 3 caracteres e no máximo 30 caracteres.")),
	userEmail: Joi.string().email().error(new Error("Digite um email que seja válido")),
	password: Joi.string().min(3).max(30).error(new Error("Digite uma senha que contenha de 3 a 30 caracteres")),
	repeatPassword: Joi.ref("password"),
	birthDate: Joi.date().iso().max("now").min("1930-01-01").error(new Error("Digite uma data que esteja entre o ano 1930 e o atual.")),
	tel: Joi.number().min(10000000).max(100000000000000).error(new Error("Digite um telefone que seja válido")),
});