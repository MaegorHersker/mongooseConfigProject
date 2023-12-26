import { model, Schema } from "mongoose";

export interface UserType {
  userName: string;
  userEmail: string;
  password: string;
  birthDate: string;
  tel: number;
  icon: string;
  banner: string;
}

const UserSchema = new Schema<UserType>({
	userName: { type: String, required: true },
	userEmail: { type: String, required: true },
	password: { type: String, required: true },
	birthDate: { type: String, required: true },
	tel: { type: Number, required: true },
	icon: { type: String, required: true , default: "icon.jpg" },
	banner: { type: String, required: true , default:"banner.jpg"},
});

const modelName = "user";
export const User = model<UserType>(modelName, UserSchema);
