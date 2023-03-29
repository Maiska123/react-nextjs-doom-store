import localFont from "next/font/local";

import styles from "@/styles/Home.module.scss";

const inter = localFont({ src: "./inter.woff2", preload: true });

interface Loading {
  loadingState: boolean;
}

export default function LoadingIndicator(loadingState: Loading) {
  return (
    <>
      <div className={styles.center}>
        {loadingState.loadingState ? (
          <div className={styles.className}>
            <h1>{"Loading...".toLocaleUpperCase()}</h1>
          </div>
        ) : (
          <div className={styles.className}>
            <h1>{"Loaded".toLocaleUpperCase()}</h1>
          </div>
        )}
      </div>
    </>
  );
}
