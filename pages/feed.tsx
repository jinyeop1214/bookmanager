import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AddBookBox from "../components/body/bookbox/AddBookBox";
import BookBox from "../components/body/bookbox/BookBox";
import DisplayError from "../components/exceptions/DisplayError";
import Loading from "../components/exceptions/Loading";
import Header from "../components/header/Header";
import { fetchBooks } from "../functions/FetchBooks";
import { Book } from "../Interfaces";
import { selectUser, useAppSelector } from "../store/reducers/user";

// interface FeedProps {
// 	books: Array<Book>;
// }

/**
 * @param param0
 * @returns
 * // mysql 시간대 안맞는 문제 유.
 * //자동 refetching 시간을 늘릴 필요 유.
 */
const Home: NextPage = () => {
	const router = useRouter();
	const { isLoggedIn, uid, id, nickname } = useAppSelector(selectUser);

	useEffect(() => {
		if (!isLoggedIn) router.replace(`/`);
	}, [isLoggedIn, router]);

	const { data, isLoading, isError, isFetching } = useQuery(
		["books"],
		async () => {
			const response = await fetch("/api/books", {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("feed useQuery error.");
			const body: { books: Book[] | undefined } = await response.json();
			return body.books;
		}
	);

	console.log("isFetching", isFetching);

	if (!isLoading && isError) return <DisplayError />;

	console.log(data);

	return isLoggedIn && data ? (
		<>
			<Loading loading={isLoading} />
			<Head>
				<title>Book Manager</title>
				<meta
					name="Main Feed Page"
					content="Main Feed Page of Book Manager App"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<div className="container">
				<div className="title">
					<span className="registered_book">
						내가 등록한 책:{" "}
						{data.filter((book) => book.user_id === uid).length}권
					</span>
				</div>
				<AddBookBox />
				<div className="books">
					{data.map((book, _index) => (
						<BookBox key={book.book_id} book={book} />
					))}
				</div>
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
	) : null;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["books"], fetchBooks);

	// const books = await fetchBooks();
	// console.log(123, books);
	// return { props: { books } };
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
