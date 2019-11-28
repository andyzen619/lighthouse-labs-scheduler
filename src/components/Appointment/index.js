import React, { Fragment } from "react";

import "./index.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

export default function({time, interview, student, interviewers} = this.props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //Object that controls the modes
  const { mode, transition, back } = useVisualMode(
    interview == null ? EMPTY : SHOW
  );
  return (
    <Fragment>
      <Header time={time}></Header>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && (<Empty onAdd={transition}/>)}
      {mode === SHOW && (
        <Show student={student} interviewer={interview}/>
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back}></Form>}
    </Fragment>
  );
}
