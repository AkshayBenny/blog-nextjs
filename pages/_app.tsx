import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'mobx-react'
import { useStore } from '../store'
export default function App({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialState)
	return (
		<Provider store={store}>
			<Component {...pageProps} />{' '}
		</Provider>
	)
}
