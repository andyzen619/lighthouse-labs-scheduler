import React from "react";
import cs from "classnames";

import "components/InterviewerListItem.scss"

export default function(props) {

  const interviewerClass = cs(
    "interviewers__item",{
    "interviewers__item--selected": props.selected
    }
  );

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}  
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  ); 
}   