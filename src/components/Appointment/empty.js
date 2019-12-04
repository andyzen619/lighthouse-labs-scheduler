import React from "react";


/**
 * Returns empty JSX view for appointment
 * @param {} props 
 */ 
export default function(props) {

  const CREATE = "CREATE";

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={()=>props.onAdd(CREATE)}
      />
    </main>
  )
}