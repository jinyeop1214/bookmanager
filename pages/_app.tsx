import "../styles/globals.css";
import type { AppProps } from "next/app";
import Seo from "../Components/Seo";
import Footer from "../Components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Seo />
			<Component {...pageProps} />
			{/* <Footer /> */}
		</>
	);
}

export default MyApp;
