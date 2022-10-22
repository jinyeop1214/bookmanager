import { Book } from "../Interfaces";
import { executeQuery } from "../schema/Database";

export const fetchMyBooks = async (uid: string) => {
	try {
		const booksResult = await executeQuery({
			query: `SELECT * FROM books WHERE user_id = ?`,
			values: [uid],
		});
		const books: Array<Book> = JSON.parse(JSON.stringify(booksResult));
		return books;
	} catch (error) {
		console.log(error);
		throw new Error("fetchMyBooks Error.");
	}
};
