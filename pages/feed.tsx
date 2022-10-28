import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AddBookBox from "../components/body/bookBox/AddBookBox";
import BookBox from "../components/body/bookBox/BookBox";
import DisplayError from "../components/exceptions/DisplayError";
import Loading from "../components/exceptions/Loading";
import Header from "../components/header/Header";
import { fetchBooks } from "../functions/FetchBooks";
import { Book } from "../Interfaces";
import { selectUser, useAppSelector } from "../store/reducers/user";

const Home: NextPage = () => {
	const router = useRouter();
	const { isLoggedIn, uid, nickname } = useAppSelector(selectUser);

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

	if (!isLoading && isError) return <DisplayError />;

	return isLoggedIn ? (
		<>
			<Head>
				<title>Book Manager</title>
				<meta
					name="Main Feed Page"
					content="Main Feed Page of Book Manager App"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{data && (
				<div className="container">
					<div className="title">
						<span className="registered_book">
							<span className="info">닉네임:</span> {nickname}
						</span>
						<span className="border-line"></span>
						<span className="registered_book">
							<span className="info">내가 등록한 책:</span>{" "}
							{data.filter((book) => book.user_id === uid).length}
							권
						</span>
					</div>
					<AddBookBox />
					<div className="books">
						{data.map((book, _index) => (
							<BookBox key={book.book_id} book={book} />
						))}
					</div>
				</div>
			)}
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

				.border-line {
					border-right: 1px solid #dadde1;
					margin: 10px;
				}

				.container {
					margin: 70px 100px 100px 100px;
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

				.info {
					color: gray;
					font-size: 16px;
				}
			`}</style>
		</>
	) : null;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["books"], fetchBooks);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
