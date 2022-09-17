import type { NextApiRequest, NextApiResponse } from "next";
import { Book } from "../../Interfaces";
import { executeQuery } from "../../schema/Database";

/**
 * @param req
 * @param res
 * @returns
 */
export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const {
			method,
			body: { bookname, start, end, theme, review, user_id },
		} = req;

		const addResult = await executeQuery({
			query: `INSERT INTO books(bookname, start, end, theme, review, user_id) VALUES(?, ?, ?, ?, ?, ?)`,
			values: [bookname, start, end, theme, review, user_id],
		});
		const addedBook = JSON.parse(JSON.stringify(addResult));

		const book: Book = {
			book_id: addedBook.insertId,
			bookname,
			start,
			end,
			theme,
			review,
			user_id,
		};

		return res.status(200).json({ book, error: null });
	} catch (error) {
		console.log(error);
	}
}
