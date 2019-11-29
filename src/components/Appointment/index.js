import React, { Fragment } from "react";

import "./index.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";

export default function({id,time, interview, student, interviewers, bookInterview, cancelInterview} = this.props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  //Object that controls the modes
  const { mode, transition, back } = useVisualMode(
    interview == null ? EMPTY : SHOW
  );

  /**
   * Creates interview object
   * @param {*} name 
   * @param {*} interviewer 
   */
  const save = (name, interviewer) =>{
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    debugger
    transition(SAVING);
    bookInterview(id, interview).then(()=>transition(SHOW));
  }

  /**
   * Removed interview from slot
   */
  const remove = () =>{
    if(mode === SHOW){
      transition(CONFIRM)
    }
    else {
      transition(DELETING)
      cancelInterview(id).then(()=>transition(EMPTY));
    }
  }

  const edit = () => {
    transition(EDIT);
  }

  return (
    <Fragment>
      <Header time={time}></Header>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && (<Empty onAdd={transition}/>)}
      {mode === SHOW && (
        <Show student={student} interviewer={interview} onDelete={remove} onEdit={edit}/>)}

      {mode === CREATE && 
      <Form 
      interviewers={interviewers} 
      onCancel={back}
      onSave={save}/>}

      {mode === SAVING && 
      <Status message="Saving"/>}

      {mode === DELETING &&
      <Status message="Deleting"/>}

      {mode === CONFIRM &&
      <Confirm
      message="Are you sure you want to cancel this appointment"
      onCancel={back}
      onConfirm={remove}/>}

      {mode === EDIT && 
      <Form
      name={student}
      interviewer={interview}
      onCancel={back}
      onSave={save}
      interviewers={interviewers}
      />
      }

    </Fragment>
  );
}
