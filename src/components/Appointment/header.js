import React from "react";

export default function(props) {

  /**
   * Returns header view of appointment
   */
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  )

}