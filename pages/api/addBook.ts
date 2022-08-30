import { resolveSoa } from "dns";
import type { NextApiRequest, NextApiResponse } from "next";
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
	return new Promise<void>(async (resolve, reject) => {
		try {
			const {
				method,
				body: { bookname, start, end, theme, review, user_id },
			} = req;

			await executeQuery({
				query: `INSERT INTO books(bookname, start, end, theme, review, user_id) VALUES(?, ?, ?, ?, ?, ?)`,
				values: [bookname, start, end, theme, review, user_id],
			});

			res.status(200).json({ error: null });
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}
