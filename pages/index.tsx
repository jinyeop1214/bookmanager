import type { NextPage } from "next";
import Header from "../Components/Header/Header";

const Home: NextPage = () => {
	return (
		<>
			<Header />
			<div className="homeBody">Read books, and leave your memory.</div>
			<style jsx>{`
				.homeBody {
					text-align: center;
					padding: 100px;
					font-family: "Poppins";
					letter-spacing: -0.02em;
					line-height: 280px;
					font-size: 40px;
					font-weight: bold;
					color: midnightblue;
				}
			`}</style>
		</>
	);
};

export default Home;
