import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { MouseEvent, useEffect, useState } from "react";
import LoadingIndicator from "./loadingIndicator";
import Modal from "react-modal";
import DarkModeToggle from "./useDarkMode";
import DarkModeStatus from "./darkModeStatus";
import { link } from "fs";

const inter = Inter({ subsets: ["latin"] });

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0,0,0,1)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

//determines if the user has a set theme
function detectColorScheme() {
  var darkMode = true; //default to light
  // const localStorage: Storage = window.localStorage;
  //local storage is used to override OS theme settings
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("theme")) {
      if (window.localStorage.getItem("theme") == "dark") {
        darkMode = false;
      }
    } else if (!window.matchMedia) {
      //matchMedia method not supported
      return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //OS theme setting detected as dark
      darkMode = false;
    }
  }
  //dark theme preferred, set document with a `data-theme` attribute
  if (darkMode) {
    darkMode = false;
  }

  return darkMode;
}
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function Home() {
  const [links, setLinks] = useState<Array<Product>>([]);
  const [name, setName] = useState<{ name: string }>({
    name: "Loading name...",
  });
  const [selectedId, setSelectedId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [darkMode, setdarkMode] = useState(detectColorScheme());

  //increase counter
  const increase = () => {
    if ((renderedProductImages?.length ?? 0) - 1 !== counter) {
      setCounter((count) => count + 1);
    } else {
      reset();
    }
  };

  //decrease counter
  const decrease = () => {
    if (counter !== 0) {
      setCounter((count) => count - 1);
    } else {
      setCounter((renderedProductImages?.length ?? 0) - 1);
    }
  };
  //reset counter
  const reset = () => {
    setCounter(0);
  };

  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(e: MouseEvent, selectedId: number) {
    e.preventDefault();
    reset();
    setSelectedId(selectedId);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitle) subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function cartPOP() {
    console.log("r(addtocart)?.addEventListener(click,");
    var button = document.getElementById("addtocart");
    var cart = document.getElementById("cart");
    var cartTotal = cart?.getAttribute("data-totalitems");
    var newCartTotal = parseInt(cartTotal ?? "0") + 1;

    var mdl = document.getElementsByClassName(
      "ReactModal__Content--after-open"
    );
    console.log(mdl);
    mdl.item(1)?.setAttribute("overflow", "visible");

    button?.classList.add("sendtocart");
    setTimeout(function () {
      button?.classList.remove("sendtocart");
      cart?.classList.add("shake");
      cart?.classList.forEach((x) => {
        for (
          let index = 0;
          index < document.getElementsByClassName(x).length;
          index++
        ) {
          document
            .getElementsByClassName(x)
            .item(index)
            ?.setAttribute("data-totalitems", newCartTotal.toString());
        }
      });
      setTimeout(function () {
        cart?.classList.remove("shake");
      }, 500);
    }, 1000);
  }

  const renderedProduct = links.find((product) => product.id == selectedId);
  const renderedProductImages = links.find(
    (product) => product.id == selectedId
  )?.images;

  useEffect(() => {
    setLoading(true);

    const fetchName = async (params: any) => {
      const namePromise = await fetch(`/api/hello`);
      const name = await namePromise.json();
      setName(name);
    };
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data: { products: Product[] }) => {
          setLinks(data.products);
          setLoading(false);
          fetchName("any");
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          console.error("Error fetching data:", error);
        });
    }, 100);

    return () => {};
  }, []);

  if (loading) {
    return (
      <main className={styles.main}>
        <LoadingIndicator loadingState={loading} />
      </main>
    );
  }

  if (error) {
    throw new Error("Error in fetch");
  }

  return (
    <>
      <Head>
        <title>Products n stuff</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            {name?.name},&nbsp;
            <code className={[styles.code, styles.typewriter].join(" ")}>
              Welcome to hell of a shopping spree.
            </code>
          </p>
          <div>
            By <h1>Sopity Shop BOIII</h1>
          </div>
          <DarkModeToggle label="Theme" isOn={darkMode} />
          <div id="cart" className="cart" data-totalitems="0">
            <Image
              src={"/cart.png"}
              width={50}
              height={50}
              alt={"cart"}
            ></Image>
          </div>
        </div>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/doom-color.svg"
            alt="Logo"
            width={250}
            height={150}
            priority
          />
          <Image
            className={styles.logoside}
            src="/store-logo.svg"
            alt="Logo"
            width={100}
            height={75}
            priority
          />
        </div>

        <div className={styles.grid}>
          {links.map((link: Product) => (
            <a
              key={link.id}
              href="#"
              className={styles.card}
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
                {link.title.toLocaleUpperCase()} <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                {link.description}
                &nbsp;
              </p>
            </a>
          ))}
        </div>
        {renderedProduct ? (
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Description Modal"
          >
            <div className={styles.grid}>
              <Image
                src={
                  renderedProductImages
                    ? renderedProductImages[counter]
                    : "/placeholder.webp"
                }
                alt=""
                width={400}
                height={300}
              />
              <h2
                className={inter.className}
                ref={(_subtitle) => (subtitle = _subtitle)}
              >
                {renderedProduct.title}
              </h2>

              <button onClick={closeModal}></button>
              {/* <a
                    href="#"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {e.preventDefault();}}
                  > */}
              <div className="page-wrapper">
                <button id="addtocart" onClick={cartPOP}>
                  <h2 className={inter.className}>
                    <span>Add to Cart&thinsp;+</span>
                  </h2>
                  <span className="cart-item"></span>
                </button>
              </div>
              {/* </a> */}

              <div className={inter.className}>
                {renderedProduct.description}
              </div>
              <form className={styles.grid}>
                {/* <input /> */}
                <a
                  href="#"
                  className={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    decrease();
                  }}
                >
                  <h2 className={inter.className}>
                    <span>&lt;-</span>
                  </h2>
                </a>
                <a
                  href="#"
                  className={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    increase();
                  }}
                >
                  <h2 className={inter.className}>
                    <span>-&gt;</span>
                  </h2>
                </a>
                {/* <a
                    href="#"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {e.preventDefault();}}
                  >
                    <h2 className={inter.className}><span>-&gt;</span></h2>
                  </a> */}
                {/* <button></button> */}
              </form>
            </div>
          </Modal>
        ) : null}
      </main>
    </>
  );
}
