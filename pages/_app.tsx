import "../styles/globals.css";
import type { AppProps } from "next/app";
import Seo from "../Components/Seo";
import Footer from "../Components/Footer/Footer";
import { useState } from "react";
import { User } from "../Interfaces";

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<User>({
		isloggedIn: false,
	});

	return (
		<>
			<Seo />
			<Component {...pageProps} user={user} setUser={setUser} />
			{/* <Footer /> */}
		</>
	);
}

export default MyApp;
