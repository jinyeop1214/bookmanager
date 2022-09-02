import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { persistor, store, wrapper } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
