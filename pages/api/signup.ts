import type { NextApiRequest, NextApiResponse } from "next";
import { excuteQuery } from "../../Schema/db";

/**
 * TODO: 유일한 id 인지 검사해야함.
 * @param req
 * @param res
 * @returns
 */
export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise<void>((resolve, reject) => {
		const {
			method,
			body: { id, password, nickname },
		} = req;

		excuteQuery({
			query: `INSERT INTO users(id, password, nickname) VALUES(?, ?, ?)`,
			values: [id, password, nickname],
		})
			.then((result) => {
				console.log(result);
				res.status(200).json({ success: "true" });
				resolve();
			})
			.catch((Error) => {
				console.log(Error);
				reject();
			});
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
