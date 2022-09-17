import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBooks } from "../../functions/FetchBooks";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const books = await fetchBooks();
		return res.status(200).json({ books });
	} catch (error) {
		console.log(error);
		throw new Error("Fetching books API returned Error.");
	}
}
