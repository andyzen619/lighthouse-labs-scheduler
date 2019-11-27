import React, { Fragment } from "react";

import "./index.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";

export default function(props) {
  return (
    <Fragment>
      <Header time={props.time}></Header>
      {props.interview === null ? (
        <Empty id={props.id}></Empty>
      ) : (
        <Show
          student={props.student}
          interviewer={props.interview}
        ></Show>
      )}
    </Fragment>
  );
}
