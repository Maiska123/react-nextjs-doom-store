import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.scss";
import { MouseEvent, useEffect, useState } from "react";
import LoadingIndicator from "./loadingIndicator";
import Modal from "react-modal";
import DarkModeToggle from "./useDarkMode";
import BabylonSearchToolBar from "./searchToolbar";
import ProductListing from "./productListing";
import EmptyListing from "./emptyListingInfo";
import { useTranslation, Trans } from "react-i18next";

const lngs: { [key: string]: { nativeName: string } } = {
  en: { nativeName: "English" },
  fi: { nativeName: "Finnish" },
};

const inter = localFont({ src: "./inter.woff2", preload: true });

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

var customStyles: { [any: string]: any } | null = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0,0,0,0.8)",
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

//determines if the user has a set theme
function detectColorScheme() {
  var notDarkMode = true; //default to light

  //local storage is used to override OS theme settings
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("theme")) {
      if (window.localStorage.getItem("theme") == "dark") {
        notDarkMode = false;
      }
    } else if (!window.matchMedia) {
      //matchMedia method not supported
      return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //OS theme setting detected as dark
      notDarkMode = false;
    }
  }
  if (notDarkMode) {
    // this funny dunno why there, i should really get some sleep
    notDarkMode = false;
  }

  return notDarkMode;
}
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function Home() {
  const { t, i18n, ready } = useTranslation("common");

  const [links, setLinks] = useState<Array<Product>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [name, setName] = useState<{ name: string }>({
    name: t("loading-name"),
  });
  const [selectedId, setSelectedId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [filterEmpty, setFilterEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [darkMode, setdarkMode] = useState(detectColorScheme());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState({ query: "" });

  let subtitle: HTMLHeadingElement | null;

  const renderedProduct = links.find((product) => product.id == selectedId);
  const renderedProductImages = links.find(
    (product) => product.id == selectedId
  )?.images;

  function setSearchList(queryString: { query: "" }) {
    var linkss = links.filter((product) => {
      return product.title
        .toLowerCase()
        .match("" + queryString.query.toLowerCase() + ".*?.*")?.length ?? 0 > 0
        ? true
        : false;
    });
    queryString.query.length > 1
      ? productsBeingFiltered(linkss)
      : setProductsArray(links);
    setSearch({ query: queryString.query });
  }

  function setProductsArray(ProductArray: Product[]) {
    setFilterEmpty(false);
    setProducts(ProductArray);
  }

  function productsBeingFiltered(filteredProductArray: Product[]) {
    setFilterEmpty(false);

    if (filteredProductArray.length == 0) {
      setFilterEmpty(true);
    }
    setProducts(filteredProductArray);
  }

  function setCustomStyles() {
    customStyles = null;
    var color: string =
      document.documentElement.getAttribute("data-theme") == "dark"
        ? "rgba(0,0,0,0.8)"
        : "rgba(255,255,255,0.86)";

    customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: color,
        overflow: "visible",
        border: "outset",
        outline: "auto",
        animation: "6s rotate linear infinite",
      },
      overlay: {
        backgroundColor: color,
      },
    };
    return customStyles;
  }

  const increase = () => {
    if ((renderedProductImages?.length ?? 0) - 1 !== counter) {
      setCounter((count) => count + 1);
    } else {
      reset();
    }
  };

  const decrease = () => {
    if (counter !== 0) {
      setCounter((count) => count - 1);
    } else {
      setCounter((renderedProductImages?.length ?? 0) - 1);
    }
  };

  const reset = () => {
    setCounter(0);
  };

  function openModal(e: MouseEvent, selectedId: number) {
    e.preventDefault();
    reset();
    setSelectedId(selectedId);
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function cartPOP() {
    var button = document.getElementById("addtocart");
    var cart = document.getElementById("cart");
    var cartTotal = cart?.getAttribute("data-totalitems");
    var newCartTotal = parseInt(cartTotal ?? "0") + 1;

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
    }, 900);
  }

  /*
   * useEffect
   */
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
          setProducts(data.products);
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
  }, [ready]);

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

  function shownProducts(): Product[] {
    const productsToDisplay = links.filter((link: Product) => {
      return products.includes(link) ? true : false;
    });

    return productsToDisplay;
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
              {ready ? t("welcome") : "Welcome!"}
            </code>
          </p>
          <div>
            {ready ? t("provided") : "By"}
            <h1>Sopity Shop BOIII</h1>
          </div>

          {/*
           * Language selector
           */}
          <div className="App">
            <div>
              {Object.keys(lngs).map((lng) => (
                <button
                  key={lng}
                  style={{
                    filter:
                      i18n.resolvedLanguage === lng
                        ? "grayscale(90%)"
                        : "grayscale(0%)",
                    background: `url(/${lng == "en" ? "gb" : "fi"}.svg)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "48px",
                    width: "48px",
                    borderStyle: "none",
                  }}
                  type="submit"
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  {/* {lngs[lng].nativeName} {lng} */}
                </button>
              ))}
            </div>
            <p>
              <Trans i18nKey="description.part1">
                <strong title={ready ? t("nameTitle") ?? "" : ""}>
                  {t("part1")}
                </strong>

                {t("description.part1")}
              </Trans>
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("description.part2")}
            </a>
          </div>

          {/*
           * Dark mode toggle
           */}
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

        {/*
         * Logo in the center
         */}
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

        {/*
         * Search bar
         */}
        <BabylonSearchToolBar isDarkMode={darkMode} addSearch={setSearchList} />

        {/*
         * Tells the user that there are no products matching the search
         */}
        <EmptyListing isEmpty={filterEmpty} />

        {/*
         * Product listing
         */}
        <ProductListing products={shownProducts()} openModal={openModal} />

        {/*
         * Modal for product description
         */}
        {renderedProduct ? (
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={setCustomStyles()}
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

              <button onClick={closeModal}>
                {" "}
                <h2 className={inter.className}>&times;</h2>
              </button>
              <div className="page-wrapper">
                <button id="addtocart" onClick={cartPOP}>
                  <h2 className={inter.className}>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Add to Cart&thinsp;+
                    </span>
                  </h2>
                  <span className="cart-item"></span>
                </button>
              </div>

              <div className={inter.className}>
                {renderedProduct.description}
              </div>
              <form className={styles.grid}>
                {(renderedProductImages?.length ?? 1) > 1 ? (
                  <>
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
                  </>
                ) : null}
              </form>
            </div>
          </Modal>
        ) : null}
      </main>
    </>
  );
}
