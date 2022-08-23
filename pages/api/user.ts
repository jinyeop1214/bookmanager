import type { NextApiRequest, NextApiResponse } from "next";
import { excuteQuery } from "../../Schema/db";

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		body: { id, password, nickname },
	} = req;

	console.log(method, id, password, nickname);

	excuteQuery({
		query: `INSERT INTO users (id, password, nickname) VALUES(?, ?, ?)`,
		values: [id, password, nickname],
	})
		.then((result) => {
			console.log(result);
			res.status(200).json({ success: "true" });
		})
		.catch((Error) => {
			console.log(Error);
		});

	// try {
	// 	const result = await excuteQuery({
	// 		query: `INSERT INTO users (id, password, nickname) VALUES(?, ?, ?)`,
	// 		values: [id, password, nickname],
	// 	});
	// 	console.log(result);
	// } catch (error) {
	// 	console.log(error);
	// }

	// switch (method) {
	// 	case "GET":
	// 		// Get data from your database
	// 		res.status(200).json({ id, name: `User ${id}` });
	// 		break;
	// 	case "PUT":
	// 		// Update or create data in your database
	// 		res.status(200).json({ id, name: name || `User ${id}` });
	// 		break;
	// 	default:
	// 		res.setHeader("Allow", ["GET", "PUT"]);
	// 		res.status(405).end(`Method ${method} Not Allowed`);
	// }
}
