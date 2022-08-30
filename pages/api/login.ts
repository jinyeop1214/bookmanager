import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../schema/Database";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise<void>(async (resolve, reject) => {
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
			if (user.length === 0) {
				console.log("No ID");
				res.status(200).json({ user: null, error: "ID" });
				return resolve();
			}
			if (user[0].password !== password) {
				console.log("Wrong Password");
				res.status(200).json({ user: null, error: "Password" });
				return resolve();
			}
			const loggedInUser = {
				user_id: user[0].user_id,
				id: user[0].id,
				nickname: user[0].nickname,
			};
			res.status(200).json({
				user: loggedInUser,
				error: null,
			});
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});
}
