import React, { useState, Fragment } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

/**
 * Returns our Form view for editing/adding appointments
 * @param {} param0 
 */
export default function(
  { name, interviewer, onCancel, onSave, interviewers } = this.props
) {
  const [formName, setFormName] = useState(name || "");
  const [formInterviewer, setFormInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  /**
   * Resets From to empty values
   */
  const reset = function() {
    setFormName("");
    setFormInterviewer(null);
  };

  /**
   * Resets form and cancels
   */
  const cancel = function() {
    reset();
    onCancel();
  };

  /**
   * Checks for valid form entries
   */
  function validate() {
    if (formName === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    onSave(formName, formInterviewer);
  }

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
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
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
              onClick={event => validate()}
            >
              Save
            </Button>
          </section>
        </section>
      </main>
    </Fragment>
  );
}
