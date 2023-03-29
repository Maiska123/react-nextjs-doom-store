import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Product } from ".";
import styles from "@/styles/Home.module.scss";

const inter = localFont({ src: "./inter.woff2", preload: true });

const ProductListing = (props: any) => {
  const { products, openModal } = props;

  const [productsIn, setProductsIn] = useState([]);
  const [productsWithMagic, setProductsWithMagic] = useState([] as Product[]);

  useEffect(() => {
    setProductsWithMagic([]);

    const fadeDelay = setTimeout(() => {
      let array: Product[] = [];
      productsIn.forEach((item: Product) => {
        if (!(products as Product[]).includes(item)) {
          array.push(item);
        }
        setProductsWithMagic(array);
      });
    }, 500);

    const delay = setTimeout(() => {
      setProductsIn(products);
    }, 1500);
    return () => {
      clearTimeout(delay);
      clearTimeout(fadeDelay);
    };
  }, [products, productsIn]);

  return productsWithMagic.length == productsIn.length ? (
    <></>
  ) : (
    <div className={`${styles.grid}`}>
      {productsIn.map((link: Product) => (
        <div
          key={link.id}
          className={`${
            !productsWithMagic.includes(link) ? "showit" : "hideit"
          }`}
        >
          <a
            className={`gridboi ${styles.card}`}
            id="listing"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              openModal(e, link.id);
            }}
          >
            <div className={styles.thirteen}>
              <Image
                src={`${new URL(link.thumbnail)}`}
                alt="13"
                width={50}
                height={43}
                priority
              />
            </div>
            <h2 className={inter.className}>
              {link.title.toLocaleUpperCase()}{" "}
              <span className={`gridboi`}>
                <span>-&gt;</span>
              </span>
            </h2>
            <p className={inter.className}>
              {link.description}
              &nbsp;
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
