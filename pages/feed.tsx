import {
	dehydrate,
	QueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
	const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
	const {
		data,
		isLoading,
		isError,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		["books"],
		async ({ pageParam = 0 }) => {
			const response = await fetch(`/api/books?cursor=${pageParam}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) throw new Error("feed useQuery error.");
			const body: { books: Book[]; nextId: number | null } =
				await response.json();
			return body;
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
			staleTime: Infinity,
		}
	);

	useEffect(() => {
		if (!isLoggedIn) router.replace(`/`);
		if (inView) fetchNextPage();
	}, [isLoggedIn, router, inView, fetchNextPage]);

	if (!isLoading && isError) return <DisplayError />;

	return isLoggedIn ? (
		<>
			<Loading loading={isLoading || isFetchingNextPage} />
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
						<span className="info">닉네임:</span> {nickname}
					</span>
				</div>

				<AddBookBox />

				<div className="books">
					{data &&
						data.pages.map((page, outerIdx) =>
							page.books.map((book, innerIdx) => {
								return outerIdx === data.pages.length - 1 &&
									innerIdx === page.books.length - 1 ? (
									<BookBox
										key={book.book_id}
										book={book}
										ref={ref}
									/>
								) : (
									<BookBox key={book.book_id} book={book} />
								);
							})
						)}
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
					border-bottom: 1px solid rgba(0, 0, 139, 0.4);
					margin: 5px;
				}

				.container {
					margin: 70px 100px 100px 100px;
				}

				.books {
					margin: 0px 0px 0px 45px;
				}

				.registered_book {
					font-size: 20px;
					font-family: inherit;
					letter-spacing: -0.02em;
				}

				.info {
					color: gray;
					font-size: 18px;
				}
			`}</style>
		</>
	) : null;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
				refetchOnWindowFocus: false,
				cacheTime: 1000 * 60 * 60,
			},
		},
	});
	await queryClient.prefetchInfiniteQuery(["books"], () => fetchBooks(0), {
		getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
	});

	queryClient.setQueryData(["books"], (data: any) => ({
		...data,
		pageParams: [null],
	}));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
