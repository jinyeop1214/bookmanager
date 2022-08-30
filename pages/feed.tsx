import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BookBox from "../components/BookBox";
import Header from "../components/header/Header";
import { Book, User } from "../Interfaces";
import { wrapper } from "../store";
import { getData, selectUser, useAppSelector } from "../store/reducers/user";

interface FeedProps {
	books: Array<Book>;
}

/**
 * 내가 등록한 책: {books.length} -> 현재는 전체 책 갯수. 자기 책 갯수로 바꿔야함. ssr에서 필터해서 갯수만 주자. 자기거필터는 map 함수에서 렌더링 안되게 거르기.을 ssr에서못하는구나
 * @param param0
 * @returns
 */
const Feed: NextPage<FeedProps> = ({ books }) => {
	const { isLoggedIn, uid, id, nickname } = useAppSelector(selectUser); // const user = useSelector((state: AppState) => state.userSlice);
	const router = useRouter();
	const myBooks = books.filter((book) => book.user_id === uid);

	useEffect(() => {
		if (!isLoggedIn) router.replace(`/`);
	}, [isLoggedIn]);

	return (
		<>
			<Header />
			<div className="container">
				<div className="title">
					<span className="registered_book">
						내가 등록한 책: {myBooks.length}권
					</span>
				</div>
				{/* {isLoggedIn && <AddBookBox />} */}
				<div className="books">
					{books.map((book, _index) => (
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

export default Feed;

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
