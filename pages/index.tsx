import type { GetServerSideProps, NextPage } from "next";
import Header from "../components/header/Header";
import { User } from "../Interfaces";
import { wrapper } from "../store";

type HomeProps = User;

const Home: NextPage<HomeProps> = ({ isLoggedIn, id, nickname }) => {
	console.log("131313", isLoggedIn, id, nickname);
	return (
		<h2>Home</h2>
		// <>
		// 	<Header user={user} setUser={setUser} />
		// 	{user.isLoggedIn ? (
		// 		<div className="container">
		// 			<div className="header">
		// 				<div className="title">
		// 					{/* {user.nickname} | Registered books : {books.length} */}
		// 					{user.nickname} | Registered books: 0
		// 				</div>
		// 			</div>
		// 			{/* <AddBookBox />
		// 			<div className="books">
		// 				{books.map((book, ind) => (
		// 					<BookBox key={ind} book={book} />
		// 				))}
		// 			</div> */}
		// 		</div>
		// 	) : (
		// 		<div className="body">Read books, and leave your memory.</div>
		// 	)}
		// 	<style jsx>{`
		// 		.body {
		// 			text-align: center;
		// 			padding: 100px;
		// 			font-family: "Poppins";
		// 			letter-spacing: -0.02em;
		// 			line-height: 280px;
		// 			font-size: 40px;
		// 			font-weight: bold;
		// 			color: midnightblue;
		// 		}
		// 		.header {
		// 			border-bottom: 1px solid darkblue;
		// 			font-family: "Poppins";
		// 			letter-spacing: -0.02em;
		// 			font-size: 18px;
		// 			font-weight: bold;
		// 		}

		// 		.title {
		// 			margin: 5px;
		// 		}
		// 		.container {
		// 			margin: 100px;
		// 			margin-top: 50px;
		// 		}

		// 		.books {
		// 			margin: 0px;
		// 			margin-left: 45px;
		// 		}
		// 	`}</style>
		// </>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const user = store.getState().userSlice;
		console.log("user", user);
		return { props: user };
	});
