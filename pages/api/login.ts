import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../schema/Database";
import bcrypt from "bcrypt";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const {
			method,
			body: { id, password },
		} = req;
		const logInResult = await executeQuery({
			query: `SELECT * FROM users WHERE id = ?`,
			values: [id],
		});
		const user = JSON.parse(JSON.stringify(logInResult));
		if (user.length === 0)
			return res.status(200).json({ user: null, error: "ID" });

		const match = await bcrypt.compare(password, user[0].password);
		if (!match)
			return res.status(200).json({ user: null, error: "Password" });

		const loggedInUser = {
			user_id: user[0].user_id,
			id: user[0].id,
			nickname: user[0].nickname,
		};
		return res.status(200).json({
			user: loggedInUser,
			error: null,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Log In API Error.");
	}
}
