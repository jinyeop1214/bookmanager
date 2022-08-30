import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../schema/Database";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const { method } = req;

			const booksResult = await executeQuery({
				query: `SELECT * FROM books`,
				values: [],
			});
			const books = JSON.parse(JSON.stringify(booksResult));

			res.status(200).json({ books });
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}
