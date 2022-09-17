import { Book } from "../Interfaces";
import { executeQuery } from "../schema/Database";

export const fetchBooks = async () => {
	try {
		const booksResult = await executeQuery({
			query: `SELECT * FROM books`,
			values: [],
		});
		const books: Array<Book> = JSON.parse(JSON.stringify(booksResult));
		// console.log(books);
		return books;
	} catch (error) {
		console.log(error);
		throw new Error("fetchBooks Error.");
	}
};
