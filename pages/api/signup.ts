import type { NextApiRequest, NextApiResponse } from "next";
import { excuteQuery } from "../../Schema/db";

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

			const sameIDResult = await excuteQuery({
				query: `SELECT id FROM users WHERE id = ?`,
				values: [id],
			});
			const sameID = JSON.parse(JSON.stringify(sameIDResult));
			console.log(sameID);
			if (sameID.length !== 0) {
				console.log(123123);
				res.status(200).json({ success: false, error: "ID" });
				return resolve();
			}
			console.log(456456);
			const signUpResult = await excuteQuery({
				query: `INSERT INTO users(id, password, nickname) VALUES(?, ?, ?)`,
				values: [id, password, nickname],
			});
			console.log(signUpResult);
			res.status(200).json({ success: "true", error: null });
			return resolve();
		} catch (error) {
			console.log(error);
			return reject();
		}
	});

	// excuteQuery({
	// 	query: `INSERT INTO users (id, password, nickname) VALUES(?, ?, ?)`,
	// 	values: [id, password, nickname],
	// })
	// 	.then((result) => {
	// 		console.log(result);
	// 		res.status(200).json({ success: "true" });
	// 	})
	// 	.catch((Error) => {
	// 		console.log(Error);
	// 	});

	// try {
	// 	const result = await excuteQuery({
	// 		query: `INSERT INTO users (id, password, nickname) VALUES(?, ?, ?)`,
	// 		values: [id, password, nickname],
	// 	});
	// 	console.log(result);
	// } catch (error) {
	// 	console.log(error);
	// }
}
