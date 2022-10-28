import { Book } from "../Interfaces";
import { executeQuery } from "../schema/Database";

const SIZE = 10;

export const fetchBooks = async (cursor: number) => {
	try {
		const booksResult = await executeQuery({
			query: `SELECT * FROM books LIMIT ?, ?`,
			values: [cursor, SIZE],
		});
		const books: Array<Book> = JSON.parse(JSON.stringify(booksResult));

		let nextId: number | null = cursor + 10;
		if (books.length < SIZE) nextId = null;

		return { books, nextId };
	} catch (error) {
		console.log(error);
		throw new Error("fetchBooks Error.");
	}
};
