import Joi from "joi";

export const loginValidator = Joi.object({
	userEmail: Joi.string().email().required().error(new Error("Digite um email que seja válido")),
	password: Joi.string().min(3).max(30).required().error(new Error("Digite uma senha que contenha de 3 a 30 caracteres")),
});
