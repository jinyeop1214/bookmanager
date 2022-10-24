import type { NextApiRequest, NextApiResponse } from "next";
import { UserPayload } from "../../../Interfaces";
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
				const userResult = await executeQuery({
					query: `SELECT user_id as uid, id, nickname FROM users WHERE user_id = ?`,
					values: [id],
				});
				const user: UserPayload = JSON.parse(
					JSON.stringify(userResult)
				)[0];
				return res.status(200).json({ user });
			case "POST":
				//
				break;
			case "PUT":
				const {
					body: { nickname },
				} = req;

				await executeQuery({
					query: `UPDATE users SET nickname = ? WHERE user_id = ?`,
					values: [nickname, id],
				});
				break;
			case "DELETE":
				//
				break;
		}
		return res.status(200).json({});
	} catch (error) {
		console.log(error);
		throw new Error(`book ${id} API Error.`);
	}
}
