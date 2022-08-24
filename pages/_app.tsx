import "../styles/globals.css";
import type { AppProps } from "next/app";
import Seo from "../Components/Seo";
import Footer from "../Components/Footer/Footer";
import { useState } from "react";
import { User } from "../Interfaces";
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<User>({
		isLoggedIn: false,
	});

	console.log(user);

	return (
		<>
			<Layout>
				<Component {...pageProps} user={user} setUser={setUser} />
				{/* <Footer /> */}
			</Layout>
		</>
	);
}

export default MyApp;
