import { Book } from "../Interfaces";
import { executeQuery } from "../schema/Database";

export const fetchBooks = async () => {
	try {
		// const booksResult = await db.query(`SELECT * FROM books`);
		const booksResult = await executeQuery({
			query: `SELECT * FROM books`,
			values: [],
		});
		const books: Array<Book> = JSON.parse(JSON.stringify(booksResult));
		// await db.end();
		return books;
	} catch (error) {
		console.log("ASDSAD");
		console.log(error);
		// throw new Error("fetchBooks 오류.");
	}
};

// last version
// export const fetchBooks = async () => {
// 	return new Promise<Array<Book>>(async (resolve, reject) => {
// 		try {
// 			const booksResult = await executeQuery({
// 				query: `SELECT * FROM books`,
// 				values: [],
// 			});
// 			const books: Array<Book> = JSON.parse(JSON.stringify(booksResult));
// 			return resolve(books);
// 		} catch (error) {
// 			console.log(error);
// 			return reject();
// 		}
// 	});
// };
