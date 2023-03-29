import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Product } from ".";
import styles from "@/styles/Home.module.scss";
import { useTranslation } from "react-i18next";

const inter = localFont({ src: "./inter.woff2", preload: true });

const EmptyListing = (props: any) => {
  const { isEmpty } = props;
  const { t, ready } = useTranslation("babylontoolbar");
  const [internalEmpty, setInternalEmpty] = useState(true);
  const [returnValue, setReturnValue] = useState(<></>);

  useEffect(() => {
    const fadeDelay = setTimeout(() => {
      let array: Product[] = [];
    }, 50);

    const delay = setTimeout(() => {
      // TODO
    }, 1500);

    setReturnValue(
      isEmpty ? (
        <div className={`${styles.grid} showit nomatch`}>
          <h2 className={inter.className}>
            {ready
              ? t("nomatch")
              : "No Matching Products Found".toLocaleUpperCase()}{" "}
            <span>&times;</span>
          </h2>
        </div>
      ) : (
        <div className={`${styles.grid} hideit nomatch`}>
          <h2 className={inter.className}>
            {ready
              ? t("nomatch")
              : "No Matching Products Found".toLocaleUpperCase()}{" "}
            <span>&times;</span>
          </h2>
        </div>
      )
    );

    return () => {
      clearTimeout(delay);
      clearTimeout(fadeDelay);
    };
  }, [isEmpty, ready, t]);

  return returnValue;
};

export default EmptyListing;
