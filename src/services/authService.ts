import { User } from "../models/User";
import bcrypt from "bcrypt";
import * as jsonReturnService from "../services/jsonReturnService";
import { generateToken } from "../middlewares/passportMiddleware";

export const login_Service = async (userEmail: string , password: string) => {
	try {
		console.log(password);
		const userLogin = await User.findOne({userEmail});
		console.log(userLogin ? await bcrypt.compare(password , userLogin.password as string) : false);
		const userFind = userLogin ? await bcrypt.compare(password , userLogin.password as string) : false;
        
		if(userFind) {
			const id = userLogin?._id;
			const token = generateToken({id});

			return jsonReturnService.jsonLoginWithToken(token , true , "Usuário encontrado" );
		} else {
			return jsonReturnService.jsonDefault(false , "Email ou senha incorretos");
		} 
	} catch(error) {
		return jsonReturnService.jsonDefault(false , "Älgo deu errado no seu login... "+error);
	}
};