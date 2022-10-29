import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { fetchMyBooks } from "../../functions/FetchMyBooks";
import { selectUser, useAppSelector } from "../../store/reducers/user";
import { Book } from "../../Interfaces";
import { useRouter } from "next/router";
import DisplayError from "../../components/exceptions/DisplayError";
import Head from "next/head";
import Header from "../../components/header/Header";
import BookBox from "../../components/body/bookBox/BookBox";
import UserInfoBox from "../../components/body/userBox/UserInfoBox";

interface MyPageProps {
	uidParam: number;
}

const Mypage: NextPage<MyPageProps> = ({ uidParam }) => {
	const router = useRouter();
	const { uid, isLoggedIn, nickname } = useAppSelector(selectUser);

	useEffect(() => {
		if (!isLoggedIn || uid != uidParam) router.replace(`/`);
	}, [isLoggedIn, router, uid, uidParam]);

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
				<title>Book Manager - {nickname}&apos;s page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{data && (
				<div className="container">
					<UserInfoBox booksLen={data.length} />
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
					border-bottom: 1px solid rgba(0, 0, 139, 0.4);
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

export default Mypage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const uid = context.params?.uid as string;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
				refetchOnWindowFocus: false,
				cacheTime: 1000 * 60 * 60,
			},
		},
	});
	await queryClient.prefetchQuery(["mybooks", `${uid}`], () =>
		fetchMyBooks(uid)
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			uidParam: parseInt(uid),
		},
	};
};
