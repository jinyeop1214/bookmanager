// import { QueryCache } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { fetchMyBooks } from "../../functions/FetchMyBooks";
import { selectUser, useAppSelector } from "../../store/reducers/user";
import { Book } from "../../Interfaces";
import { useRouter } from "next/router";
import DisplayError from "../../components/exceptions/DisplayError";
import Loading from "../../components/exceptions/Loading";
import { DateFormat } from "../../functions/DateFormat";

const mypage: NextPage = () => {
	const router = useRouter();
	const { uid, isLoggedIn, id, nickname } = useAppSelector(selectUser);

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
			const body: { books: Book[] | undefined } = await response.json();
			return body.books;
		}
	);

	if (!isLoading && isError) return <DisplayError />;

	console.log("isLoading, isFetching, data", isLoading, isFetching, data);

	return isLoggedIn && data ? (
		<>
			<Loading loading={isLoading} />
			{data.map((book) => {
				const { from, to } = DateFormat(book.start, book.end);
				return (
					<div key={book.book_id}>
						<div>
							<div>{book.book_id}</div>
							<div>{book.bookname}</div>
							<div>{from}</div>
							<div>{to}</div>
							<div>{book.review}</div>
							<div>{book.theme}</div>
							<div>{book.user_id}</div>
						</div>
						<br />
					</div>
				);
			})}
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
