import React, { Component } from "react";

const Toggle = (props:{ checked: boolean, onChange: () => void }) => (

    <span className="toggle-control">
        <input
        className="dmcheck"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id="dmcheck"
        />
        <label htmlFor="dmcheck" />
    </span>
    );

export default Toggle;
      