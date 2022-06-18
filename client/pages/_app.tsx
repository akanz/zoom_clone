import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { useEffect } from "react";
import { checkHost } from "../features/slices/user";
import { connectWithIOserver } from "../utils/wss";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    connectWithIOserver();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
