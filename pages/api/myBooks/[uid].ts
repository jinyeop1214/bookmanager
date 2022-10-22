import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMyBooks } from "../../../functions/FetchMyBooks";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const {
			method,
			query: { uid },
		} = req;
		const books = await fetchMyBooks(uid as string);
		return res.status(200).json({ books });
	} catch (error) {
		console.log(error);
		throw new Error("Fetching MyBooks API returned Error.");
	}
}
