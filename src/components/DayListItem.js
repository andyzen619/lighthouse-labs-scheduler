import React from "react";

export default function(props) {
  return (
    <li onClick={() => {
      props.setDay(props.name);
    }}>
      <h2 className = "text--regular">{props.name}</h2>
      <h3 className = "text--light">{props.spots} spots remaining</h3>
    </li>
  )
}