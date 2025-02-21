/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import crypto from "node:crypto";
import axios from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const generateSHA1 = (data: any) => {
	const hash = crypto.createHash("sha1");
	hash.update(data);
	return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImageFromCloudinary = async (publicId: string) => {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
	const timestamp = new Date().getTime();
	const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? '';
	const apiSecret = process.env.CLOUDINARY_API_SECRET ?? '';
	const signature = generateSHA1(generateSignature(publicId, apiSecret));
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

	const formData = new FormData();
	formData.append("public_id", publicId);
	formData.append("signature", signature);
	formData.append("api_key", apiKey);
	formData.append("timestamp", JSON.stringify(timestamp));

	try {
		return await axios.post(url, formData);
	} catch (error) {
		console.log("cloudinary error", error);
		throw error;
	}
};
