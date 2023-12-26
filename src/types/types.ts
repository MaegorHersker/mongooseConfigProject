import { UserType } from "../models/User";

export type jsonDefault = {status: boolean , message: string};
export type jsonPlusWithValueReturn = {resultValue: [] | {} | UserType | UserType[] , status:boolean , message: string};
export type jsonLoginWithToken = {token: string , status:boolean , message: string};
