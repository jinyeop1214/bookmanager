import type { GetServerSideProps, NextPage } from "next";
import Header from "../components/header/Header";
import { User } from "../Interfaces";
import { wrapper } from "../store";
import { getData } from "../store/reducers/user";

type HomeProps = User;

const Home: NextPage<HomeProps> = ({ isLoggedIn, id, nickname }) => {
	console.log("HOME", isLoggedIn, id, nickname);
	return (
		<>
			<Header />
			{isLoggedIn ? (
				<div className="container">
					<div className="header">
						<div className="title">
							{/* {nickname} | Registered books : {books.length} */}
							{nickname} | Registered books: 0
						</div>
					</div>
					{/* <AddBookBox />
					<div className="books">
						{books.map((book, ind) => (
							<BookBox key={ind} book={book} />
						))}
					</div> */}
				</div>
			) : (
				<div className="body">Read books, and leave your memory.</div>
			)}
			<style jsx>{`
				.body {
					text-align: center;
					padding: 100px;
					font-family: "Poppins";
					letter-spacing: -0.02em;
					line-height: 280px;
					font-size: 40px;
					font-weight: bold;
					color: midnightblue;
				}
				.header {
					border-bottom: 1px solid darkblue;
					font-family: "Poppins";
					letter-spacing: -0.02em;
					font-size: 18px;
					font-weight: bold;
				}

				.title {
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
			`}</style>
		</>
	);
};

export default Home;

/**
 * 로그인된 상태면 -> 전체 게시글 가져오기
 * 아니면 -> Nothing.
 * getServerSideProps에서는 server redux store를 보기때문에 로그인해서 redux state를 바꿔줘도 client store에 바뀐거기때문에 못보나 본대?
 * 여기서 못하면 결국 CSR로 book 가져와야되는데.
 */
export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (_context) => {
		console.log("STORE START");
		const a = store.dispatch(getData());
		console.log(a);
		const b = store.getState();
		console.log(b);
		console.log("STORE END");
		const user = store.getState().userSlice;
		console.log("USER", user);

		if (user.isLoggedIn) {
			//all books data fetching.
			return { props: user };
		} else {
			return { props: user };
		}
	});
