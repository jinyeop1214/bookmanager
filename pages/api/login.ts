import type { NextApiRequest, NextApiResponse } from "next";
import { excuteQuery } from "../../Schema/db";

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise<void>((resolve, reject) => {
		const {
			method,
			body: { id, password },
		} = req;

		excuteQuery({
			query: `SELECT * FROM users WHERE id = ?`,
			values: [id],
		})
			.then((result) => {
				console.log(result);
				const user = JSON.parse(JSON.stringify(result));
				if (user.length === 0) {
					console.log("No ID");
					res.status(200).json({ user: null, error: "ID" });
					resolve();
				} else {
					if (user[0].password !== password) {
						console.log("Wrong Password");
						res.status(200).json({ user: null, error: "Password" });
						resolve();
					} else {
						console.log("Login Success");
						const loggedInUser = {
							user_id: user[0].user_id,
							id: user[0].id,
							nickname: user[0].nickname,
						};
						res.status(200).json({
							user: loggedInUser,
							error: null,
						});
						resolve();
					}
				}
			})
			.catch((Error) => {
				console.log(Error);
				reject();
			});
	});
}
