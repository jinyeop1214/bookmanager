import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../schema/Database";
import bcrypt from "bcrypt";

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
			body: { id, password, nickname },
		} = req;
		const saltRounds = 10;

		const sameIDResult = await executeQuery({
			query: `SELECT id FROM users WHERE id = ?`,
			values: [id],
		});
		const sameID = JSON.parse(JSON.stringify(sameIDResult));
		if (sameID.length !== 0)
			return res.status(200).json({ user: null, error: "ID" });

		const hash = await bcrypt.hash(password, saltRounds);
		if (!hash) return res.status(200).json({ user: null, error: "HASH" });

		await executeQuery({
			query: `INSERT INTO users(id, password, nickname) VALUES(?, ?, ?)`,
			values: [id, hash, nickname],
		});

		const userResult = await executeQuery({
			query: `SELECT user_id FROM users WHERE id = ? and password = ?`,
			values: [id, hash],
		});

		const user = JSON.parse(JSON.stringify(userResult));
		return res.status(200).json({
			user: {
				user_id: user[0].user_id,
				id: id,
				nickname: nickname,
			},
			error: null,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Sign Up API Error.");
	}
}
