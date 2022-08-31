import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../schema/Database";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const {
				query: { id },
				method,
			} = req;

			console.log(id, method);

			switch (method) {
				case "GET":
					// Get data from your database
					// res.status(200).json({ id, name: `User ${id}` });
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
					// Update or create data in your database
					// res.status(200).json({ id, name: name || `User ${id}` });
					break;
				case "DELETE":
					await executeQuery({
						query: `DELETE FROM books WHERE book_id = ?`,
						values: [id],
					});
					break;
				// default:
				//     res.setHeader("Allow", ["GET", "PUT"]);
				//     res.status(405).end(`Method ${method} Not Allowed`);
			}

			res.status(200).json({ error: null });
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}