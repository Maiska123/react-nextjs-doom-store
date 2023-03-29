import { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import useDarkMode from "@fisch0920/use-dark-mode";

const BabylonSearchToolBar = (props: {
  isDarkMode: boolean;
  addSearch: Function;
}) => {
  const darkMode = useDarkMode(props.isDarkMode);
  const [search, setSearch] = useState<any>({ query: "" });
  const [darkening, setDarkening] = useState(props.isDarkMode);

  const query = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({ [e.target?.name]: e.target?.value });
    props.addSearch({ query: e.target?.value });
  };

  function setStyling() {
    const styling = {
      backgroundColor: darkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
    };
    return styling;
  }
  function focusOnMe() {
    document.getElementById("query")?.focus();
  }
  useEffect(() => {
    setDarkening(darkMode.value);
    return () => {};
  }, [darkMode.value]);

  return (
    <form
      className={styles.form}
      role="search"
      id="searchForm"
      style={setStyling()}
      onSubmit={(e) => e.preventDefault()}
      onSubmitCapture={(e) => e.preventDefault()}
    >
      <input
        className={styles.input}
        type="search"
        value={search.query}
        id="query"
        name="query"
        placeholder="Search..."
        aria-label="Search through site content"
        onInput={query}
      />
      <button onClick={focusOnMe}>
        <svg viewBox="0 0 1024 1024" className={styles.oculäär}>
          <path
            className="path1"
            d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default BabylonSearchToolBar;
