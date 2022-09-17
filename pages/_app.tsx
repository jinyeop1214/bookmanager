import "../styles/globals.css";
import type { AppProps } from "next/app";
import { persistor, store, wrapper } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Provider store={store}>
					<PersistGate persistor={persistor} loading={null}>
						<Component {...pageProps} />
					</PersistGate>
				</Provider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default wrapper.withRedux(MyApp);
