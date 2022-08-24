import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { User } from "../Interfaces";
import Layout from "../components/Layout";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
	// const [user, setUser] = useState<User>({
	// 	isLoggedIn: false,
	// 	id: null,
	// 	nickname: null,
	// });

	// console.log(user);

	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default wrapper.withRedux(MyApp);
