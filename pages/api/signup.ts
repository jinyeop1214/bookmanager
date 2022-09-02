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
				body: { id, password, nickname },
			} = req;

			const sameIDResult = await executeQuery({
				query: `SELECT id FROM users WHERE id = ?`,
				values: [id],
			});
			const sameID = JSON.parse(JSON.stringify(sameIDResult));
			if (sameID.length !== 0) {
				res.status(200).json({ user: null, error: "ID" });
				return resolve();
			}

			await executeQuery({
				query: `INSERT INTO users(id, password, nickname) VALUES(?, ?, ?)`,
				values: [id, password, nickname],
			});

			const userResult = await executeQuery({
				query: `SELECT user_id FROM users WHERE id = ? and password = ?`,
				values: [id, password],
			});

			const user = JSON.parse(JSON.stringify(userResult));
			res.status(200).json({
				user: {
					user_id: user[0].user_id,
					id: id,
					nickname: nickname,
				},
				error: null,
			});
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}
