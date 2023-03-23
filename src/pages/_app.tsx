import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default appWithTranslation(App, nextI18nConfig);
