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
import Loading from "../components/exceptions/Loading";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60,
						refetchOnWindowFocus: false,
						cacheTime: 1000 * 60 * 60,
					},
				},
			})
	);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<Component {...pageProps} />
					</Hydrate>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
