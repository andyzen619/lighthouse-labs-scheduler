import React, { Fragment } from "react";

import "./index.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //Object that controls the modes
  const { mode, transition, back } = useVisualMode(
    props.interview == null ? EMPTY : SHOW
  );
  debugger
  return (
    <Fragment>
      <Header time={props.time}></Header>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && (<Empty onAdd={transition}/>)}
      {mode === SHOW && (
        <Show student={props.student} interviewer={props.interview}/>
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back}></Form>}
    </Fragment>
  );
}
