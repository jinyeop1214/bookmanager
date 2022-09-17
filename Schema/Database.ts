import mysql from "serverless-mysql";

const db = mysql({
	config: {
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
	},
});

interface executeQueryProps {
	query: string;
	values: Array<any>;
}

export const executeQuery = async ({ query, values }: executeQueryProps) => {
	try {
		const result = await db.query(query, values);
		await db.end();
		return result;
	} catch (error) {
		console.log("!!!!!!!!!!!!");
		console.log(error);
		return { error };
	}
};
