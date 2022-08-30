import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../schema/Database";

/**
 * //다시 쿼리해서 user_id 리턴해야함.
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
				res.status(200).json({ success: false, error: "ID" });
				return resolve();
			}
			const signUpResult = await executeQuery({
				query: `INSERT INTO users(id, password, nickname) VALUES(?, ?, ?)`,
				values: [id, password, nickname],
			});

			res.status(200).json({ success: "true", error: null });
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}
