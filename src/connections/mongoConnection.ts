import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongooseConnection = async () => {
	try { 
		console.log("Loading...");
		await connect(process.env.MONGO_URL as string);
		console.log("Connection sucessfull!");
	} catch(error) {
		console.log("Algo deu errado... "+error);
	}
};

export default mongooseConnection;