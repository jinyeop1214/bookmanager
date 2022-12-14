import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../schema/Database";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		method,
		query: { id },
	} = req;
	try {
		switch (method) {
			case "GET":
				//
				break;
			case "POST":
				//
				break;
			case "PUT":
				const {
					body: { bookname, start, end, theme, review },
				} = req;

				await executeQuery({
					query: `UPDATE books SET bookname = ?, start = ?, end = ?, theme = ?, review = ? WHERE book_id = ?`,
					values: [bookname, start, end, theme, review, id],
				});
				break;
			case "DELETE":
				await executeQuery({
					query: `DELETE FROM books WHERE book_id = ?`,
					values: [id],
				});
				break;
		}
		return res.status(200).json({ error: null });
	} catch (error) {
		console.log(error);
		throw new Error(`book ${id} API Error.`);
	}
}
