import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBooks } from "../../functions/FetchBooks";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const cursor = !isNaN(Number(req.query.cursor))
			? Number(req.query.cursor)
			: 0;

		const { books, nextId } = await fetchBooks(cursor);
		return res.status(200).json({ books, nextId });
	} catch (error) {
		console.log(error);
		throw new Error("Fetching books API returned Error.");
	}
}
