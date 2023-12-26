import * as typesProject from "../types/types";
import { UserType } from "../models/User";
export const jsonDefault = (status: boolean , message: string) : typesProject.jsonDefault => {
	return {status , message};
};

export const jsonPlusWithValueReturn = (resultValue: [] | {} | UserType | UserType[] , status: boolean , message: string) : typesProject.jsonPlusWithValueReturn => {
	return {resultValue , status , message};
};

export const jsonLoginWithToken = (token:string , status: boolean , message: string) : typesProject.jsonLoginWithToken => {
	return {token , status , message};
};