import passport from "passport";
import dotevn from "dotenv";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { User, UserType } from "../models/User";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotevn.config();

const notAuthorizedJson = { status: 401, message: "Nao autorizado" };
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY as string,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		const user = await User.findById(payload.id);
		if (user) return done(null, user);
		else return done(notAuthorizedJson, false);
	})
);

export const generateToken = (data: object) => {
	return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
};

export const privateRoute = (req: Request,res: Response,next: NextFunction) => {
	const authFunction = passport.authenticate("jwt",(err: any, user: UserType) => {
		if(!user) {
			res.status(401).json(notAuthorizedJson);
			return;
		}
		req.user = user;
		next();
	}
	)(req, res, next);
};

export default passport;
