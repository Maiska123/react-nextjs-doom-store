import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Product } from ".";
import styles from "@/styles/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

const EmptyListing = (props: any) => {
  const { isEmpty } = props;

  const [internalEmpty, setInternalEmpty] = useState(true);
  const [returnValue, setReturnValue] = useState(<></>);

  // Set internal `productsIn` state to the updated `draftedPlayers`
  // only when `draftedPlayers` changes.
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
            {"No Matching Products Found".toLocaleUpperCase()}{" "}
            <span>&times;</span>
          </h2>
        </div>
      ) : (
        <div className={`${styles.grid} hideit nomatch`}>
          <h2 className={inter.className}>
            {"No Matching Products Found".toLocaleUpperCase()}{" "}
            <span>&times;</span>
          </h2>
        </div>
      )
    );

    return () => {
      clearTimeout(delay);
      clearTimeout(fadeDelay);
    };
  }, [isEmpty]);

  return returnValue;
};

export default EmptyListing;
