import { Request } from "express";
import sharp from "sharp";
import { unlink } from "fs/promises";
import multer from "multer";
import fs from "fs";

const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./tmp");
	},
	filename: (req, file, cb) => {
		const randomName = Math.floor(Math.random() * 99999);
		cb(null, randomName + Date.now() + "");
	},
});

export const upload_Service = multer({
	storage: storageConfig,
	fileFilter: (req, file, cb) => {
		const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
		cb(null, allowed.includes(file.mimetype));
	},
});

export const uploadImage_Service = async (req: Request) => {
	const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  type dataType = {
    [key: string]: string;
  };
  const dataReturn: dataType = {};
  if (files) {
  	for (const chave in files) {
  		const filename: string = files[chave][0].filename + ".jpg";
  		dataReturn[`${files[chave][0].fieldname}`] = filename;
  		await sharp(files[chave][0].path)
  			.resize(null, 300, { fit: sharp.fit.cover })
  			.toFormat("jpeg")
  			.toFile("./public/assets/images/client/" + filename);
  		await unlink(files[chave][0].path);
  	}

  	return dataReturn;
  } else {
  	return false;
  }
};

export const imageExists_Service = async (file: string): Promise<boolean> => {
	try {
		await fs.promises.access(file, fs.constants.F_OK);
		return true;
	} catch (error) {
		return false;
	}
};
