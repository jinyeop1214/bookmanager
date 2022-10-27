import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { fetchMyBooks } from "../../functions/FetchMyBooks";
import { selectUser, useAppSelector } from "../../store/reducers/user";
import { Book } from "../../Interfaces";
import { useRouter } from "next/router";
import DisplayError from "../../components/exceptions/DisplayError";
import Loading from "../../components/exceptions/Loading";
import Head from "next/head";
import Header from "../../components/header/Header";
import BookBox from "../../components/body/bookBox/BookBox";
import UserInfo from "../../components/body/user/UserInfo";

const mypage: NextPage = () => {
	const router = useRouter();
	const { uid, isLoggedIn, nickname } = useAppSelector(selectUser);

	useEffect(() => {
		if (!isLoggedIn) router.replace(`/`);
	}, [isLoggedIn, router]);

	const { data, isLoading, isError, isFetching } = useQuery(
		["mybooks", `${uid}`],
		async () => {
			const response = await fetch(`/api/myBooks/${uid}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("mypage useQuery error.");
			const body: { books: Book[] } = await response.json();
			return body.books;
		}
	);

	if (!isLoading && isError) return <DisplayError />;

	return isLoggedIn ? (
		<>
			<Head>
				<title>Book Manager - {nickname}'s page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{data && (
				<div className="container">
					<UserInfo books={data.length} />
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
				.container {
					margin: 100px;
					margin-top: 50px;
				}

				.books {
					margin: 0px;
					margin-left: 25px;
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

export default mypage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const uid = context.params?.uid as string;
	// if typeof uid != string 에러처리. how?

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["mybooks", `${uid}`], () =>
		fetchMyBooks(uid)
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
