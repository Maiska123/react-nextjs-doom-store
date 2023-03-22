import React, { ChangeEvent, ChangeEventHandler } from "react";
import useDarkMode from "@fisch0920/use-dark-mode";
import styles from "@/styles/Home.module.css";
import DarkModeStatus from "./darkModeStatus";

const DarkModeToggle = (props: { label: string; isOn: boolean }) => {
  const darkMode = useDarkMode(props.isOn);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    darkMode.toggle();
    darkMode.value
      ? document.documentElement.setAttribute("data-theme", "")
      : document.documentElement.setAttribute("data-theme", "dark");
  }

  return (
    <div className="container">
      {props.label}
      {"    "}
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className="checkbox"
          checked={darkMode.value}
          onChange={handleCheckboxChange.bind(this)}
          name={props.label}
          id={props.label}
        />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
      <code>
        <DarkModeStatus darkmode={darkMode.value} />
      </code>
    </div>
  );
};

export default DarkModeToggle;
