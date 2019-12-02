import React, { useState, Fragment } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function(
  { name, interviewer, onCancel, onSave, interviewers } = this.props
) {
  const [formName, setFormName] = useState(name || "");
  const [formInterviewer, setFormInterviewer] = useState(interviewer || null);

  const reset = function() {
    setFormName("");
    setFormInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  };

  return (
    <Fragment>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              onChange={event => setFormName(event.target.value)}
              value={formName}
            />
          </form>
          {formInterviewer ? <InterviewerList
            interviewers={interviewers}
            value={formInterviewer.id}
            onChange={setFormInterviewer}
          />
          :
          <InterviewerList
            interviewers={interviewers}
            value={formInterviewer}
            onChange={setFormInterviewer}
          />
          }
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={event => cancel()}>
              Cancel
            </Button>
            <Button
              confirm
              onClick={event => onSave(formName, formInterviewer)}
            >
              Save
            </Button>
          </section>
        </section>
      </main>
    </Fragment>
  );
}