import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AddBookBox from "../components/body/bookbox/AddBookBox";
import BookBox from "../components/body/bookbox/BookBox";
import Header from "../components/header/Header";
import { Book, User } from "../Interfaces";
import { wrapper } from "../store";
import { getData, selectUser, useAppSelector } from "../store/reducers/user";

interface FeedProps {
	books: Array<Book>;
}

/**
 * @param param0
 * @returns
 */
const Home: NextPage<FeedProps> = ({ books }) => {
	const { isLoggedIn, uid, id, nickname } = useAppSelector(selectUser);
	const router = useRouter();
	const myBooks = books.filter((book) => book.user_id === uid);

	useEffect(() => {
		if (!isLoggedIn) router.replace(`/`);
	}, [isLoggedIn, router]);

	return (
		<>
			<Header />
			<div className="container">
				<div className="title">
					<span className="registered_book">
						내가 등록한 책: {myBooks.length}권
					</span>
				</div>
				{isLoggedIn && <AddBookBox />}
				{isLoggedIn && (
					<div className="books">
						{books.map((book, _index) => (
							<BookBox key={book.book_id} book={book} />
						))}
					</div>
				)}
			</div>
			<style jsx>{`
				.body {
					text-align: center;
					padding: 100px;
					font-family: inherit;
					letter-spacing: -0.02em;
					line-height: 280px;
					font-size: 40px;
					font-weight: bold;
					color: midnightblue;
				}
				/* .header {
					border-bottom: 1px solid darkblue;
					font-family: inherit;
					letter-spacing: -0.02em;
					font-size: 18px;
					font-weight: bold;
				} */

				.title {
					border-bottom: 1px solid darkblue;
					margin: 5px;
				}
				.container {
					margin: 100px;
					margin-top: 50px;
				}

				.books {
					margin: 0px;
					margin-left: 45px;
				}

				.registered_book {
					font-size: 18px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}
			`}</style>
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
	const response = await fetch("http://localhost:3000/api/books", {
		method: "get",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const body = await response.json();
	return { props: { books: body.books } };
};

// redux
// export const getServerSideProps: GetServerSideProps =
// 	wrapper.getServerSideProps((store) => async (_context) => {
//		console.log(store.getState());
// 		const response = await fetch("http://localhost:3000/api/books", {
// 			method: "get",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const body = await response.json();
// 		return { props: { books: body.books } };
// 	});
